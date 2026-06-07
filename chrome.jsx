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

function Header({ route, onNav }) {
  const { t } = useLang();
  const [open, setOpen] = useChromeState(false);
  const items = [
    ["home", t.nav.home], ["zekasher", t.nav.zekasher], ["guide", t.nav.guide],
    ["pesach", t.nav.pesach], ["utensils", t.nav.utensils], ["about", t.nav.about], ["support", t.nav.support], ["contact", t.nav.contact],
  ];
  const go = (r) => { onNav(r); setOpen(false); };
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
          {items.map(([r, label]) => (
            <a key={r} href="#" className={r === route ? "active" : ""}
               onClick={(e) => { e.preventDefault(); go(r); }}>{label}</a>
          ))}
        </nav>
        <div className="hdr-end">
          <LangToggle />
          <Button kind="primary" sm className="hdr-cta" icon={Icons.search}
                  onClick={() => go("zekasher")}>{t.cta.search}</Button>
        </div>
      </div>
      <div className={"mobile-nav" + (open ? " open" : "")}>
        {items.map(([r, label]) => (
          <a key={r} href="#" className={r === route ? "active" : ""}
             onClick={(e) => { e.preventDefault(); go(r); }}>{label}{Icons.chevL}</a>
        ))}
        <div className="mobile-nav-foot">
          <LangToggle />
          <Button kind="lime" sm icon={Icons.search} onClick={() => go("zekasher")}>{t.cta.search}</Button>
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

Object.assign(window, { Header, Footer, LangToggle });
