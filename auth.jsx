// GOK site — auth layer: registration + sign-in via live ZeKasher API.
// Tokens stored in gok-api-tokens; user profile in gok-user.
const { useState: useAuthState, useEffect: useAuthEffect, useRef: useAuthRef } = React;

const AuthCtx = React.createContext(null);

const AUTH_BASE = "https://new-app.zekasher.com/api/v1";

function decodeJwtPayload(token) {
  try { return JSON.parse(atob(token.split(".")[1])); } catch { return null; }
}

function userFromTokens(tokens, fallbackName, fallbackEmail) {
  const payload = decodeJwtPayload(tokens.access_token);
  return {
    name: payload?.display_name || fallbackName || (fallbackEmail || "").split("@")[0],
    email: payload?.email || payload?.sub || fallbackEmail || "",
    since: Date.now(),
  };
}

function AuthProvider({ children }) {
  const [user, setUser] = useAuthState(() => {
    try { return JSON.parse(localStorage.getItem("gok-user") || "null"); }
    catch { return null; }
  });
  const [authOpen, setAuthOpen] = useAuthState(false);
  const [authTab, setAuthTab] = useAuthState("register");

  const register = async ({ name, phone, email, password, consent }) => {
    const r = await fetch(`${AUTH_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, display_name: name }),
    });
    const d = await r.json();
    if (!r.ok) {
      const msg = d?.detail || "";
      if (r.status === 400 && msg.toLowerCase().includes("exist")) return { error: "emailTaken" };
      return { error: "apiError" };
    }
    localStorage.setItem("gok-api-tokens", JSON.stringify(d));
    const u = { name, phone, email, consent, since: Date.now() };
    localStorage.setItem("gok-user", JSON.stringify(u));
    setUser(u);
    return { ok: true };
  };

  const signin = async ({ email, password }) => {
    const r = await fetch(`${AUTH_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const d = await r.json();
    if (!r.ok) return { error: "invalidCredentials" };
    localStorage.setItem("gok-api-tokens", JSON.stringify(d));
    const u = userFromTokens(d, null, email);
    localStorage.setItem("gok-user", JSON.stringify(u));
    setUser(u);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem("gok-user");
    localStorage.removeItem("gok-api-tokens");
    setUser(null);
  };
  const openAuth = (tab = "register") => { setAuthTab(tab); setAuthOpen(true); };
  const closeAuth = () => setAuthOpen(false);

  return (
    <AuthCtx.Provider value={{ user, register, signin, logout, authOpen, authTab, openAuth, closeAuth }}>
      {children}
    </AuthCtx.Provider>
  );
}
const useAuth = () => React.useContext(AuthCtx);

// ── account control in the header ───────────────────────────────────
function AccountButton({ compact }) {
  const { t } = useLang();
  const { user, logout, openAuth } = useAuth();
  const [menu, setMenu] = useAuthState(false);
  const ref = useAuthRef(null);
  const a = t.auth;

  useAuthEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setMenu(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  if (!user) {
    return (
      <div className="acct-guest-row" ref={ref}>
        <button className={"acct-register" + (compact ? " compact" : "")} onClick={() => openAuth("signin")}>
          {Icons.user}<span>{a.signin}</span>
        </button>
        {!compact && (
          <button className="acct-register acct-register-outline" onClick={() => openAuth("register")}>
            <span>{a.register}</span>
          </button>
        )}
      </div>
    );
  }
  const first = (user.name || "").trim().split(/\s+/)[0] || a.account;
  return (
    <div className="acct-wrap" ref={ref}>
      <button className={"acct-chip" + (menu ? " open" : "")} onClick={() => setMenu((m) => !m)}>
        <span className="acct-avatar">{first.charAt(0)}</span>
        <span className="acct-name">{first}</span>
      </button>
      <div className={"acct-menu" + (menu ? " open" : "")}>
        <div className="acct-menu-head">
          <b>{user.name}</b>
          <span dir="ltr">{user.email}</span>
        </div>
        <button className="acct-menu-item" onClick={() => { logout(); setMenu(false); }}>
          {Icons.logout}{a.logout}
        </button>
      </div>
    </div>
  );
}

// ── modal ──────────────────────────────────────────────────────────
function AuthModal() {
  const { t, lang } = useLang();
  const { authOpen, authTab, closeAuth, register, signin } = useAuth();
  const DEMO = { email: "demo@kosher.global", password: "GOKdemo123" };
  const a = t.auth;
  const [tab, setTab] = useAuthState(authTab);
  const [vals, setVals] = useAuthState({ name: "", phone: "", email: "", password: "", confirmPassword: "" });
  const [consent, setConsent] = useAuthState(false);
  const [errs, setErrs] = useAuthState({});
  const [done, setDone] = useAuthState(false);
  const [loading, setLoading] = useAuthState(false);
  const [signinVals, setSigninVals] = useAuthState({ email: "", password: "" });
  const [signinErr, setSigninErr] = useAuthState("");

  useAuthEffect(() => {
    if (authOpen) {
      setTab(authTab);
      setVals({ name: "", phone: "", email: "", password: "", confirmPassword: "" });
      setConsent(false);
      setErrs({});
      setDone(false);
      setLoading(false);
      setSigninVals({ email: "", password: "" });
      setSigninErr("");
    }
  }, [authOpen, authTab]);

  useAuthEffect(() => {
    document.body.style.overflow = authOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [authOpen]);

  if (!authOpen) return null;

  const set = (k, v) => setVals((s) => ({ ...s, [k]: v }));
  const setSi = (k, v) => setSigninVals((s) => ({ ...s, [k]: v }));

  const submitRegister = async () => {
    const e = {};
    if (!vals.name.trim()) e.name = a.required;
    if (!vals.phone.trim()) e.phone = a.required;
    else if (!/^[+\d][\d\s()-]{6,}$/.test(vals.phone.trim())) e.phone = a.invalidPhone;
    if (!vals.email.trim()) e.email = a.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = a.invalidEmail;
    if (!vals.password) e.password = a.required;
    else if (vals.password.length < 8) e.password = a.passwordShort;
    if (vals.confirmPassword !== vals.password) e.confirmPassword = a.passwordMismatch;
    if (!consent) e.consent = a.mustConsent;
    setErrs(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    const result = await register({ ...vals, consent: true });
    setLoading(false);
    if (result.error) {
      setErrs({ _api: a[result.error] || a.apiError });
    } else {
      setDone(true);
    }
  };

  const submitSignin = async () => {
    if (!signinVals.email.trim()) { setSigninErr(a.required); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signinVals.email)) { setSigninErr(a.invalidEmail); return; }
    if (!signinVals.password) { setSigninErr(a.required); return; }

    setLoading(true);
    const result = await signin(signinVals);
    setLoading(false);
    if (result.error) { setSigninErr(a[result.error] || a.apiError); return; }
    closeAuth();
  };

  const field = (k, label, type = "text", onEnter) => (
    <div className={"field" + (errs[k] ? " err" : "")}>
      <label>{label} <span className="req">*</span></label>
      <input type={type} value={vals[k]} dir={k === "email" || k === "phone" ? "ltr" : undefined}
             autoComplete={k === "password" ? "new-password" : k === "confirmPassword" ? "new-password" : k}
             onChange={(e) => set(k, e.target.value)}
             onKeyDown={(e) => { if (e.key === "Enter") (onEnter || submitRegister)(); }} />
      {errs[k] && <div className="errmsg">{errs[k]}</div>}
    </div>
  );

  return (
    <React.Fragment>
      <div className="modal-scrim open" onClick={closeAuth} />
      <div className="modal-card" role="dialog" aria-modal="true">
        <button className="modal-close" aria-label={a.close} onClick={closeAuth}>{Icons.x}</button>

        {done ? (
          <div className="auth-done">
            <div className="ic">{Icons.check}</div>
            <h2>{a.welcomeTitle}</h2>
            <p>{a.welcomeSub}</p>
            <Button kind="primary" lg className="btn-block" onClick={closeAuth}>{t.cta.back}</Button>
          </div>
        ) : (
          <React.Fragment>
            <div className="modal-head">
              <Logo variant="darkgreen" style={{ height: 40 }} />
            </div>

            <div className="auth-tabs">
              <button className={"auth-tab" + (tab === "register" ? " on" : "")}
                      onClick={() => { setTab("register"); setErrs({}); setSigninErr(""); }}>
                {a.tabRegister}
              </button>
              <button className={"auth-tab" + (tab === "signin" ? " on" : "")}
                      onClick={() => { setTab("signin"); setErrs({}); setSigninErr(""); }}>
                {a.tabSignin}
              </button>
            </div>

            {tab === "register" ? (
              <div className="modal-body">
                <p className="auth-tab-sub">{a.sub}</p>
                {field("name", a.name)}
                {field("phone", a.phone, "tel")}
                {field("email", a.email, "email")}
                {field("password", a.password, "password")}
                {field("confirmPassword", a.confirmPassword, "password")}
                <div className={"check-field" + (consent ? " on" : "") + (errs.consent ? " err" : "")}
                     onClick={() => setConsent((c) => !c)}>
                  <span className="box">{Icons.check}</span>
                  <span>{a.consent}</span>
                </div>
                {errs.consent && <div className="errmsg" style={{ marginTop: -8, marginBottom: 12 }}>{errs.consent}</div>}
                {errs._api && <div className="errmsg" style={{ marginBottom: 12 }}>{errs._api}</div>}
                <Button kind="primary" lg className="btn-block" icon={Icons.user}
                        onClick={submitRegister} disabled={loading}>
                  {loading ? "…" : a.submit}
                </Button>
              </div>
            ) : (
              <div className="modal-body">
                <p className="auth-tab-sub">{a.signinSub}</p>
                <div className={"field" + (signinErr ? " err" : "")}>
                  <label>{a.email} <span className="req">*</span></label>
                  <input type="email" value={signinVals.email} dir="ltr" autoComplete="email"
                         onChange={(e) => { setSi("email", e.target.value); setSigninErr(""); }}
                         onKeyDown={(e) => { if (e.key === "Enter") submitSignin(); }} />
                </div>
                <div className={"field" + (signinErr ? " err" : "")}>
                  <label>{a.password} <span className="req">*</span></label>
                  <input type="password" value={signinVals.password} dir="ltr" autoComplete="current-password"
                         onChange={(e) => { setSi("password", e.target.value); setSigninErr(""); }}
                         onKeyDown={(e) => { if (e.key === "Enter") submitSignin(); }} />
                  {signinErr && <div className="errmsg">{signinErr}</div>}
                </div>
                <Button kind="primary" lg className="btn-block" icon={Icons.user}
                        onClick={submitSignin} disabled={loading}>
                  {loading ? "…" : a.signinBtn}
                </Button>
                <button className="auth-demo-btn" disabled={loading} onClick={async () => {
                  setLoading(true);
                  const result = await signin(DEMO);
                  setLoading(false);
                  if (result.error) setSigninErr(a[result.error] || a.apiError);
                  else closeAuth();
                }}>
                  {lang === "he" ? "כניסה עם חשבון הדגמה" : "Sign in as demo user"}
                </button>
                <p className="auth-switch">
                  {a.noAccount}{" "}
                  <button onClick={() => { setTab("register"); setSigninErr(""); }}>{a.tabRegister}</button>
                </p>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { AuthProvider, useAuth, AccountButton, AuthModal });
