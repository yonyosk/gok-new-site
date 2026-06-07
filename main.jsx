// GOK site — app shell: client routing, Tweaks, render.
const { useState: useAppState, useEffect: useAppEffect } = React;

// Device-preview: when embedded (?frame=…) we render only the site, no chrome,
// so CSS media queries respond to the IFRAME width (true mobile/tablet layout).
const EMBED_PARAM = new URLSearchParams(location.search).get("frame");
const IS_EMBED = EMBED_PARAM !== null;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "homeVersion": "new",
  "cardAccent": "#C8FE94",
  "zkView": "grid",
  "viewport": "pc"
}/*EDITMODE-END*/;

function Router() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [nav, setNav] = useAppState({ route: "home", params: {} });

  const onNav = (route, params = {}) => {
    setNav({ route, params });
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useAppEffect(() => {
    document.documentElement.style.setProperty("--gok-lime", t.cardAccent);
  }, [t.cardAccent]);

  useAppEffect(() => {
    const cl = document.body.classList;
    cl.toggle("vp-stage-open", !IS_EMBED && t.viewport !== "pc");
    return () => cl.remove("vp-stage-open");
  }, [t.viewport]);

  const { route, params } = nav;
  let page;
  if (route === "home") page = t.homeVersion === "classic"
    ? <ClassicHomePage onNav={onNav} />
    : <HomePage onNav={onNav} tweaks={t} />;
  else if (route === "zekasher") page = <ZeKasherPage initialQuery={params.q} initialKosher={params.kosher} zkView={t.zkView} onNav={onNav} />;
  else if (route === "about") page = <AboutPage onNav={onNav} />;
  else if (route === "guide") page = <GuidePage onNav={onNav} />;
  else if (route === "article") page = <ArticlePage articleId={params.id} onNav={onNav} />;
  else if (route === "support") page = <SupportPage onNav={onNav} />;
  else if (route === "utensils") page = <UtensilsPage onNav={onNav} />;
  else if (route === "pesach") page = <PesachPage onNav={onNav} />;
  else if (route === "whatsapp") page = <WhatsappPage onNav={onNav} />;
  else if (route === "faq") page = <FaqPage onNav={onNav} />;
  else if (route === "contact") page = <ContactPage onNav={onNav} />;
  else page = t.homeVersion === "classic"
    ? <ClassicHomePage onNav={onNav} />
    : <HomePage onNav={onNav} tweaks={t} />;

  const { lang } = useLang();
  const pageKey = route + "|" + (params.q || params.id || params.kosher || "") + "|" + lang + "|" + t.homeVersion;

  const appContent = (
    <React.Fragment>
      <Header route={route} onNav={onNav} />
      <main className="app-main" key={pageKey}>{page}</main>
      <Footer onNav={onNav} />
      <AuthModal />
    </React.Fragment>
  );

  // Embedded inside a device-preview iframe: render the bare site only.
  if (IS_EMBED) return appContent;

  const previewing = t.viewport !== "pc";

  return (
    <React.Fragment>
      {previewing
        ? <DevicePreview mode={t.viewport} accent={t.cardAccent} lang={lang} />
        : appContent}

      <TweaksPanel>
        <TweakSection label={lang === "he" ? "עמוד הבית" : "Home page"} />
        <TweakRadio label={lang === "he" ? "גרסה" : "Version"} value={t.homeVersion}
          options={[{ label: lang === "he" ? "חדשה" : "New", value: "new" },
                    { label: lang === "he" ? "קלאסית" : "Classic", value: "classic" }]}
          onChange={(v) => setTweak("homeVersion", v)} />
        <TweakSection label={lang === "he" ? "עיצוב" : "Design"} />
        <TweakColor label={lang === "he" ? "צבע הדגשה" : "Accent color"} value={t.cardAccent}
          options={["#C8FE94", "#BE914D", "#2A6FDB", "#A6E86A"]}
          onChange={(v) => setTweak("cardAccent", v)} />
        <TweakSection label="ZeKasher" />
        <TweakRadio label={lang === "he" ? "תצוגת תוצאות" : "Results layout"} value={t.zkView}
          options={["grid", "list"]}
          onChange={(v) => setTweak("zkView", v)} />
        <TweakSection label={lang === "he" ? "תצוגת מכשיר" : "Viewport"} />
        <TweakRadio label={lang === "he" ? "גודל מסך" : "Screen size"} value={t.viewport}
          options={[
            { label: "PC", value: "pc" },
            { label: "Tablet", value: "tablet" },
            { label: "Mobile", value: "mobile" },
          ]}
          onChange={(v) => setTweak("viewport", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

// Device-preview stage: loads the site in a width-constrained iframe so its own
// media queries fire at the simulated width (accurate mobile/tablet rendering).
function DevicePreview({ mode, accent, lang }) {
  const dims = mode === "mobile" ? { w: 390, h: 844 } : { w: 834, h: 1112 };
  const src = location.pathname + "?frame=" + mode;
  const label = mode === "mobile" ? "Mobile · 390×844" : "Tablet · 834×1112";
  return (
    <div className="vp-stage">
      <div className="vp-device-wrap">
        <div className="vp-device-cap">{label}</div>
        <div className={"vp-device vp-" + mode}
             style={{ width: dims.w, height: "min(" + dims.h + "px, calc(100vh - 96px))" }}>
          <iframe className="vp-iframe" src={src} title={label} />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </LangProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
