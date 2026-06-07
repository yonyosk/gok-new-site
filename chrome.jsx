// GOK site — Header + Footer chrome. Mobile-first, RTL/LTR aware, with language toggle.
const { useState: useChromeState } = React;

function LangToggle({ compact }) {
  const { lang, setLang } = useLang();
  return (
    <div className={"lang-toggle" + (compact ? " compact" : "")}>
      <button className={lang === "he" ? "on" : ""} onClick={() => setLang("he")}>עב</button>
      <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
    </div>
  );
}

// desktop dropdown for the "guide & info" group
function NavDropdown({ label, items, route, go }) {
  const [open, setOpen] = useChromeState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const active = items.some(([r]) => r === route);
  return (
    <div className={"nav-dd" + (open ? " open" : "")} ref={ref}
         onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className={"nav-dd-trigger" + (active ? " active" : "")}
              onClick={() => setOpen((o) => !o)}>
        {label}{Icons.chevD}
      </button>
      <div className="nav-dd-menu" role="menu">
        {items.map(([r, l]) => (
          <a key={r} href="#" role="menuitem" className={r === route ? "on" : ""}
             onClick={(e) => { e.preventDefault(); go(r); setOpen(false); }}>{l}</a>
        ))}
      </div>
    </div>
  );
}

function Header({ route, onNav }) {
  const { t } = useLang();
  const [open, setOpen] = useChromeState(false);
  const [guideOpen, setGuideOpen] = useChromeState(false);
  const guideItems = [
    ["whatsapp", t.nav.whatsapp],
    ["guide", t.nav.infoGeneral],
    ["faq", t.nav.faq],
    ["utensils", t.nav.utensils],
    ["pesach", t.nav.pesach],
  ];
  const mainItems = [["home", t.nav.home], ["zekasher", t.nav.zekasher]];
  const tailItems = [["about", t.nav.about], ["solutions", t.nav.solutions], ["contact", t.nav.contact]];
  const go = (r) => { onNav(r); setOpen(false); setGuideOpen(false); };
  const guideActive = guideItems.some(([r]) => r === route);
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <button className="hdr-burger" aria-label="menu" onClick={() => setOpen((o) => !o)}>
          {open ? Icons.x : Icons.menu}
        </button>
        <a className="brand" href="#" onClick={(e) => { e.preventDefault(); go("home"); }}>
          <Logo variant="darkgreen" />
          <span className="brand-name"><b>{t.brand.name}</b><span>{t.brand.short}</span></span>
        </a>
        <nav className="nav">
          {mainItems.map(([r, label]) => (
            <a key={r} href="#" className={r === route ? "active" : ""}
               onClick={(e) => { e.preventDefault(); go(r); }}>{label}</a>
          ))}
          <NavDropdown label={t.nav.guide} items={guideItems} route={route} go={go} />
          {tailItems.map(([r, label]) => (
            <a key={r} href="#" className={r === route ? "active" : ""}
               onClick={(e) => { e.preventDefault(); go(r); }}>{label}</a>
          ))}
        </nav>
        <div className="hdr-end">
          <AccountButton />
          <LangToggle />
          <Button kind="primary" sm className="hdr-cta" icon={Icons.search}
                  onClick={() => go("zekasher")}>{t.cta.search}</Button>
        </div>
      </div>
      <div className={"mobile-nav" + (open ? " open" : "")}>
        {mainItems.map(([r, label]) => (
          <a key={r} href="#" className={r === route ? "active" : ""}
             onClick={(e) => { e.preventDefault(); go(r); }}>{label}{Icons.chevL}</a>
        ))}
        <button className={"mnav-group-trigger" + (guideActive ? " active" : "") + (guideOpen ? " open" : "")}
                onClick={() => setGuideOpen((g) => !g)}>
          {t.nav.guide}
          <span className="mnav-chev">{Icons.chevD}</span>
        </button>
        <div className={"mnav-sub" + (guideOpen ? " open" : "")}>
          {guideItems.map(([r, label]) => (
            <a key={r} href="#" className={r === route ? "active" : ""}
               onClick={(e) => { e.preventDefault(); go(r); }}>{label}{Icons.chevL}</a>
          ))}
        </div>
        {tailItems.map(([r, label]) => (
          <a key={r} href="#" className={r === route ? "active" : ""}
             onClick={(e) => { e.preventDefault(); go(r); }}>{label}{Icons.chevL}</a>
        ))}
        <div className="mobile-nav-foot">
          <AccountButton compact />
          <LangToggle />
        </div>
      </div>
    </header>
  );
}

function Footer({ onNav }) {
  const { t } = useLang();
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-in">
          <div className="ftr-brand">
            <Logo variant="white" style={{ height: 46 }} />
            <p>{t.footer.tagline}</p>
            <div className="ftr-seal">
              <Sparkle tone="lime" style={{ width: 16, height: 16 }} />
              <span>{t.brand.full}</span>
            </div>
          </div>
          {t.footer.cols.map(([h, links]) => (
            <div className="ftr-col" key={h}>
              <h5>{h}</h5>
              <ul>
                {links.map(([label, r]) => (
                  <li key={label}>
                    <a href="#" onClick={(e) => { e.preventDefault(); if (r) onNav(r); }}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="ftr-bottom">
          <span>{t.footer.rights}</span>
          <span>{t.footer.legal}</span>
          <a href="admin.html" className="ftr-admin">{t.brand.name} · ניהול</a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Header, Footer, LangToggle, NavDropdown });
