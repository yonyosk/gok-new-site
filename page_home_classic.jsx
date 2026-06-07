// GOK site — CLASSIC home page (previous version), kept as a selectable option
// alongside the Figma-faithful HomePage. Reads t.homeClassic. Toggle via Tweaks.
const { useState: useClassicState } = React;

function ClassicHeroSeal() {
  return (
    <div className="hero-seal">
      <div className="ring"><Logo variant="white" className="seal" /></div>
      <Sparkle tone="lime" className="hero-spk" style={{ top: 14, insetInlineEnd: 24 }} />
      <Sparkle tone="lime" className="hero-spk" style={{ bottom: 20, insetInlineStart: 10, width: 30, height: 30, opacity: .7 }} />
    </div>
  );
}

function ClassicHero({ onNav }) {
  const { t } = useLang();
  const c = t.homeClassic;
  return (
    <section className="hero">
      <div className="hero-lozenge" />
      <div className="hero-lozenge two" />
      <div className="wrap">
        <div className="hero-in">
          <div>
            <Eyebrow onDark>{c.eyebrow}</Eyebrow>
            <h1>{c.h1a} <em>{c.h1em}</em><br />{c.h1b}</h1>
            <p>{c.sub}</p>
            <div className="hero-cta">
              <Button kind="lime" icon={Icons.arrow} onClick={() => onNav("zekasher")}>{c.ctaPrimary}</Button>
              <Button kind="ghost-light" icon={Icons.shield} onClick={() => onNav("about")}>{c.ctaSecondary}</Button>
            </div>
            <div className="hero-certs">
              <span>{t.home.logosLabel}</span>
              <div className="hero-cert-marks">
                {["OU", "OK", "KLBD", "בד״ץ", "KA"].map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
          </div>
          <ClassicHeroSeal />
        </div>
      </div>
    </section>
  );
}

function ClassicStatBar() {
  const { t } = useLang();
  return (
    <div className="wrap">
      <div className="trust"><div className="trust-in">
        {t.homeClassic.stats.map(([b, s]) => (
          <div className="stat" key={s}><b>{b}</b><span>{s}</span></div>
        ))}
      </div></div>
    </div>
  );
}

function ClassicFeature({ onNav }) {
  const { t } = useLang();
  const c = t.homeClassic;
  const icons = [Icons.globe, Icons.shield, Icons.scan];
  return (
    <section className="section feat">
      <div className="wrap">
        <div className="feat-grid">
          <div>
            <Eyebrow>{t.zekasher.eyebrow}</Eyebrow>
            <h2 className="gok-h2" style={{ fontSize: "clamp(26px,5.6vw,38px)", margin: "12px 0 12px", lineHeight: 1.1 }}>{c.featTitle}</h2>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: "var(--gok-ink-2)", maxWidth: 520 }}>{c.featSub}</p>
            <div className="feat-bullets">
              {c.featBullets.map(([h, p], i) => (
                <div className="feat-b" key={h}>
                  <div className="ic">{icons[i]}</div>
                  <div><h4>{h}</h4><p>{p}</p></div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <Button kind="primary" icon={Icons.arrow} onClick={() => onNav("zekasher")}>{c.ctaPrimary}</Button>
            </div>
          </div>
          <div className="feat-visual"><PhoneMock compact /></div>
        </div>
      </div>
    </section>
  );
}

function ClassicProcess() {
  const { t } = useLang();
  const c = t.homeClassic;
  return (
    <section className="section">
      <div className="wrap">
        <div className="sec-head">
          <Eyebrow>{c.processEyebrow}</Eyebrow>
          <h2>{c.processTitle}</h2>
          <p>{c.processSub}</p>
        </div>
        <div className="steps">
          {c.steps.map(([n, h, p]) => (
            <div className="step" key={n}>
              <div className="step-n">{n}</div>
              <div><h3>{h}</h3><p>{p}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClassicGuide({ onNav }) {
  const { t } = useLang();
  const c = t.homeClassic;
  const items = ARTICLES.slice(0, 3);
  return (
    <section className="section feat">
      <div className="wrap">
        <div className="sec-head">
          <Eyebrow>{c.guideEyebrow}</Eyebrow>
          <h2>{c.guideTitle}</h2>
          <p>{c.guideSub}</p>
        </div>
        <div className="guide-grid">
          {items.map((a, i) => (
            <ArticleCard key={a.id} a={a} tone={GUIDE_TONES[i]} onNav={onNav} />
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <Button kind="outline" icon={Icons.arrow} onClick={() => onNav("guide")}>{t.cta.more}</Button>
        </div>
      </div>
    </section>
  );
}

function ClassicHomePage({ onNav }) {
  return (
    <React.Fragment>
      <ClassicHero onNav={onNav} />
      <ClassicStatBar />
      <ClassicFeature onNav={onNav} />
      <ClassicProcess />
      <ClassicGuide onNav={onNav} />
      <CtaBand onNav={onNav} />
    </React.Fragment>
  );
}

Object.assign(window, { ClassicHomePage });
