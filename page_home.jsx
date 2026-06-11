// GOK site — Home page, restructured to match the Figma "Home Page" desktop design.
// Sections: Hero (light) · About + feature cards · AI chat assistant · Solutions
// (Personal/Business tabs, alternating rows) · Updates · Halachic Q&A (dark) · FAQ.
const { useState: useHomeState } = React;

// ── decorative media block — a branded motif panel (stands in for product photography) ──
function MediaBlock({ lozenge = 1, flip, tone = "green", children }) {
  return (
    <div className={"media-block tone-" + tone + (flip ? " flip" : "")}>
      <span className="media-dots" aria-hidden="true"></span>
      <img className="media-lozenge" src={`${ASSETS}/lozenge-${lozenge}.svg`} alt="" />
      <Sparkle tone={tone === "green" ? "lime" : "green"} className="media-spk" />
      <Logo variant={tone === "green" ? "white" : "darkgreen"} className="media-seal" />
      <div className="media-inner">{children}</div>
    </div>
  );
}

// ── 1 · HERO ──────────────────────────────────────────────────────────
// Recognized kosher authorities GOK works alongside — a real, on-brand trust strip
const CERT_MARKS = ["OU", "OK", "KLBD", "בד״ץ", "OU-P", "KA"];
function HomeHero({ onNav }) {
  const { t } = useLang();
  return (
    <section className="home-hero">
      <div className="hh-bg" aria-hidden="true">
        <span className="hh-lozenge"></span>
        <span className="hh-lozenge two"></span>
        <span className="hh-dots"></span>
      </div>
      <Sparkle tone="green" className="hh-spk one" />
      <Sparkle tone="lime" className="hh-spk two" />
      <div className="wrap">
        <div className="hh-top">
          <div className="hh-seal-wrap">
            <Logo variant="darkgreen" className="hh-seal" />
          </div>
          <h1>{t.home.h1}</h1>
          <p className="hh-sub">{t.home.sub}</p>
          <div className="hh-chat">
            <span>{t.home.chatPrompt}</span>
            <div className="hh-cta-row">
              <Button kind="outline" lg icon={Icons.chat} onClick={() => onNav("zekasher")}>
                {t.home.chatCta}
              </Button>
              <Button kind="primary" lg icon={Icons.search} onClick={() => onNav("zekasher")}>
                {t.cta.search}
              </Button>
            </div>
          </div>
        </div>
        <div className="hero-trust">
          <span className="hero-trust-label">{t.home.logosLabel}</span>
          <div className="cert-marks">
            {CERT_MARKS.map((m) => (
              <span className="cert-mark" key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── deep-green trust / stats band — the "stamp of trust" beat after the light hero ──
function TrustStats() {
  const { t } = useLang();
  const stats = t.homeClassic.stats;
  return (
    <section className="trust-band">
      <Sparkle tone="lime" className="tb-spk" />
      <div className="wrap">
        <div className="trust-band-in">
          {stats.map(([b, s]) => (
            <div className="tb-stat" key={s}><b>{b}</b><span>{s}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 2 · ABOUT + FEATURE CARDS ────────────────────────────────────────
function AboutBlock({ onNav }) {
  const { t } = useLang();
  const icons = [Icons.scan, Icons.globe, Icons.map, Icons.shield];
  return (
    <section className="section about-block">
      <div className="wrap">
        <p className="ab-lead">{t.home.about}</p>
        <div className="feature-cards">
          {t.home.cards.map(([title, body, route], i) => (
            <button className="fcard" key={title} onClick={() => onNav(route)}>
              <span className="fcard-ic">{icons[i]}</span>
              <span className="fcard-text">
                <b>{title}</b>
                <span>{body}</span>
              </span>
              <span className="fcard-arrow">{Icons.arrowL}</span>
            </button>
          ))}
        </div>
        <div className="ab-cta">
          <Button kind="outline" lg icon={Icons.arrow} onClick={() => onNav("about")}>
            {t.home.aboutCta}
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── 4 · SOLUTIONS (tabs + alternating rows) ──────────────────────────
function SolutionRow({ sol, idx, onNav }) {
  const { t } = useLang();
  const flip = idx % 2 === 1;
  const media = sol.variant === "app"
    ? <PhoneMock compact />
    : <MediaBlock lozenge={idx + 1} flip={flip} tone={idx % 2 === 1 ? "green" : "mist"} />;
  return (
    <div className={"sol-row" + (flip ? " flip" : "")}>
      <div className="sol-media">{media}</div>
      <div className="sol-copy">
        <h3>{sol.title}</h3>
        <p>{sol.body}</p>
        <div className="sol-ctas">
          {sol.ctas.map((c, i) => (
            <Button key={c} kind={i === 0 ? "primary" : "outline"} icon={i === 0 ? Icons.arrow : null}
                    onClick={() => onNav(sol.variant === "app" ? "zekasher" : "guide")}>{c}</Button>
          ))}
        </div>
        {sol.tryTitle && (
          <div className="sol-try">
            <span className="sol-try-t">{sol.tryTitle}</span>
            <button className="sol-try-input" onClick={() => onNav("zekasher")}>
              <span className="sti-ic">{Icons.search}</span>
              <span className="sti-ph">{sol.tryPlaceholder}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Solutions({ onNav }) {
  const { t } = useLang();
  const [tab, setTab] = useHomeState("personal");
  return (
    <section className="section solutions">
      <div className="wrap">
        <h2 className="sec-title">{t.home.solutionsTitle}</h2>
        <div className="seg-toggle">
          <button className={tab === "personal" ? "on" : ""} onClick={() => setTab("personal")}>{t.home.tabs.personal}</button>
          <button className={tab === "business" ? "on" : ""} onClick={() => setTab("business")}>{t.home.tabs.business}</button>
        </div>
        <div className="sol-rows">
          {t.home.solutions
            .filter((_, i) => tab === "personal" ? [0, 1].includes(i) : [0, 2].includes(i))
            .map((sol, i) => (
              <SolutionRow key={sol.title} sol={sol} idx={i} onNav={onNav} />
            ))}
        </div>
      </div>
    </section>
  );
}

// ── 5 · UPDATES ──────────────────────────────────────────────────────
function Updates({ onNav }) {
  const { t, lang } = useLang();
  const items = HOME_UPDATES[lang];
  return (
    <section className="section updates">
      <div className="wrap">
        <div className="up-head">
          <h2 className="sec-title">{t.home.updatesTitle}</h2>
          <Button kind="outline" icon={Icons.arrow} onClick={() => onNav("guide")}>{t.home.updatesCta}</Button>
        </div>
        <div className="up-rail">
          {items.map((u, i) => (
            <button type="button" className="up-card" key={u.title}
                    onClick={() => onNav("article", { id: ARTICLES[i % ARTICLES.length].id })}>
              <div className="up-media" style={{ background: GUIDE_TONES[i % GUIDE_TONES.length] }}>
                <Sparkle tone="lime" className="up-spk" />
                <span className="up-tag">{u.tag}</span>
              </div>
              <div className="up-body">
                <span className="up-date">{u.date}</span>
                <h3>{u.title}</h3>
                <p>{u.excerpt}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 6 · HALACHIC Q&A (dark) ──────────────────────────────────────────
function QASection({ onNav }) {
  const { t, lang } = useLang();
  const [tab, setTab] = useHomeState(0);
  const all = HOME_QA[lang];
  const list = tab === 0 ? all : all.filter((x) => x.cat === tab);
  return (
    <section className="section qa-section">
      <Sparkle tone="lime" className="qa-deco one" />
      <div className="wrap">
        <div className="sec-head center on-dark">
          <h2 className="sec-title light">{t.home.qaTitle}</h2>
          <p className="qa-sub">{t.home.qaSub}</p>
        </div>
        <div className="qa-tabs">
          {t.home.qaTabs.map((c, i) => (
            <button key={c} className={"qa-tab" + (tab === i ? " on" : "")} onClick={() => setTab(i)}>{c}</button>
          ))}
        </div>
        <div className="qa-grid">
          {list.map((item, i) => (
            <button className="qa-card" key={item.q + i} onClick={() => onNav("guide")}>
              <span className="qa-q">{item.q}</span>
              <span className="qa-go">{Icons.arrowL}</span>
            </button>
          ))}
        </div>
        <div className="qa-foot">
          <Button kind="lime" lg icon={Icons.arrow} onClick={() => onNav("guide")}>{t.home.qaCta}</Button>
          <div className="qa-notfound">
            <span>{t.home.qaNotFound}</span>
            <button onClick={() => onNav("zekasher")}>{t.home.qaAsk}{Icons.chat}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 7 · FAQ accordion ────────────────────────────────────────────────
function FAQ({ onNav }) {
  const { t, lang } = useLang();
  const items = HOME_FAQ[lang];
  const [open, setOpen] = useHomeState(0);
  return (
    <section className="section faq">
      <div className="wrap">
        <h2 className="sec-title center">{t.home.faqTitle}</h2>
        <div className="faq-list">
          {items.map(([q, a], i) => (
            <div className={"faq-item" + (open === i ? " open" : "")} key={q}>
              <button className="faq-q" aria-expanded={open === i} aria-controls={"faq-body-home-" + i}
                      onClick={() => setOpen(open === i ? -1 : i)}>
                <span className="faq-chev">{Icons.chevD}</span>
                <span>{q}</span>
              </button>
              <div className="faq-a" id={"faq-body-home-" + i} role="region"><p>{a}</p></div>
            </div>
          ))}
        </div>
        <div className="ab-cta">
          <Button kind="outline" icon={Icons.arrow} onClick={() => onNav("contact")}>{t.home.faqCta}</Button>
        </div>
      </div>
    </section>
  );
}

// ── CTA band (kept — used by About & Support pages) ──────────────────
function CtaBand({ onNav }) {
  const { t, lang } = useLang();
  const title = lang === "he" ? "המוצר שלכם ראוי לחותם GOK." : "Your product deserves the GOK seal.";
  const sub = lang === "he" ? "הצטרפו לאלפי עסקים הנושאים את הסמכת הכשרות העולמית." : "Join thousands of businesses carrying global kosher certification.";
  return (
    <section className="section">
      <div className="wrap"><div className="cta">
        <Sparkle tone="green" className="cta-spk" style={{ width: 70, top: 24, insetInlineEnd: 40 }} />
        <Sparkle tone="green" className="cta-spk" style={{ width: 44, bottom: 28, insetInlineStart: 70 }} />
        <h2>{title}</h2>
        <p>{sub}</p>
        <Button kind="primary" lg icon={Icons.arrow} onClick={() => onNav("contact")}>{t.cta.certify}</Button>
      </div></div>
    </section>
  );
}

function HomePage({ onNav, tweaks }) {
  return (
    <React.Fragment>
      <HomeHero onNav={onNav} />
      <TrustStats />
      <AboutBlock onNav={onNav} />
      <Solutions onNav={onNav} />
      <Updates onNav={onNav} />
      <QASection onNav={onNav} />
      <FAQ onNav={onNav} />
    </React.Fragment>
  );
}

const GUIDE_TONES = ["#234F47", "#2A6FDB", "#A23B3B", "#5B33B0", "#BE914D", "#1F8A5B"];
Object.assign(window, { HomePage, CtaBand, MediaBlock, GUIDE_TONES });
