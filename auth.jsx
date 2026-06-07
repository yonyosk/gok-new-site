// GOK site — auth layer: registration (name / phone / email + mailing consent),
// persisted to localStorage. Registration unlocks the full ZeKasher database.
const { useState: useAuthState, useEffect: useAuthEffect, useRef: useAuthRef } = React;

const AuthCtx = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useAuthState(() => {
    try { return JSON.parse(localStorage.getItem("gok-user") || "null"); }
    catch (e) { return null; }
  });
  const [authOpen, setAuthOpen] = useAuthState(false);

  const register = (data) => {
    const u = { ...data, since: Date.now() };
    localStorage.setItem("gok-user", JSON.stringify(u));
    setUser(u);
    return u;
  };
  const logout = () => { localStorage.removeItem("gok-user"); setUser(null); };
  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  return (
    <AuthCtx.Provider value={{ user, register, logout, authOpen, openAuth, closeAuth }}>
      {children}
    </AuthCtx.Provider>
  );
}
const useAuth = () => React.useContext(AuthCtx);

// ── account control in the header ───────────────────────────────────
function AccountButton({ compact }) {
  const { t, lang } = useLang();
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
      <button className={"acct-register" + (compact ? " compact" : "")} onClick={openAuth}>
        {Icons.user}<span>{a.register}</span>
      </button>
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

// ── registration modal ──────────────────────────────────────────────
function AuthModal() {
  const { t, lang } = useLang();
  const { authOpen, closeAuth, register, user } = useAuth();
  const a = t.auth;
  const [vals, setVals] = useAuthState({ name: "", phone: "", email: "" });
  const [consent, setConsent] = useAuthState(false);
  const [errs, setErrs] = useAuthState({});
  const [done, setDone] = useAuthState(false);

  // reset form whenever the modal re-opens
  useAuthEffect(() => {
    if (authOpen) { setVals({ name: "", phone: "", email: "" }); setConsent(false); setErrs({}); setDone(false); }
  }, [authOpen]);

  // lock body scroll while open
  useAuthEffect(() => {
    document.body.style.overflow = authOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [authOpen]);

  if (!authOpen) return null;
  const set = (k, v) => setVals((s) => ({ ...s, [k]: v }));

  const submit = () => {
    const e = {};
    if (!vals.name.trim()) e.name = a.required;
    if (!vals.phone.trim()) e.phone = a.required;
    else if (!/^[+\d][\d\s()-]{6,}$/.test(vals.phone.trim())) e.phone = a.invalidPhone;
    if (!vals.email.trim()) e.email = a.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = a.invalidEmail;
    if (!consent) e.consent = a.mustConsent;
    setErrs(e);
    if (Object.keys(e).length === 0) { register({ ...vals, consent: true }); setDone(true); }
  };

  const field = (k, label, type = "text") => (
    <div className={"field" + (errs[k] ? " err" : "")}>
      <label>{label} <span className="req">*</span></label>
      <input type={type} value={vals[k]} dir={k === "email" || k === "phone" ? "ltr" : undefined}
             onChange={(e) => set(k, e.target.value)}
             onKeyDown={(e) => { if (e.key === "Enter") submit(); }} />
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
              <h2>{a.title}</h2>
              <p>{a.sub}</p>
            </div>
            <div className="modal-body">
              {field("name", a.name)}
              {field("phone", a.phone, "tel")}
              {field("email", a.email, "email")}
              <div className={"check-field" + (consent ? " on" : "") + (errs.consent ? " err" : "")}
                   onClick={() => setConsent((c) => !c)}>
                <span className="box">{Icons.check}</span>
                <span>{a.consent}</span>
              </div>
              {errs.consent && <div className="errmsg" style={{ marginTop: -8, marginBottom: 12 }}>{errs.consent}</div>}
              <Button kind="primary" lg className="btn-block" icon={Icons.user} onClick={submit}>{a.submit}</Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { AuthProvider, useAuth, AccountButton, AuthModal });
