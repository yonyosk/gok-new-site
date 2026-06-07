// GOK site — Pesach laws page + Contact page.
const { useState: useExtraState } = React;

// ---- Pesach (iframe) ----
function PesachPage({ onNav }) {
  const [loaded, setLoaded] = useExtraState(false);
  return (
    <div className="iframe-page">
      {!loaded && (
        <div className="iframe-loading">
          <Sparkle tone="green" style={{ width: 48, height: 48 }} />
        </div>
      )}
      <iframe
        src="https://pesach-gok.lovable.app"
        className={"iframe-full" + (loaded ? " loaded" : "")}
        title="הלכות פסח — GOK"
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

// ---- Contact ----
function ContactPage({ onNav }) {
  const { t } = useLang();
  const c = t.contact;
  const f = c.fields;
  const [vals, setVals] = useExtraState({ name: "", email: "", subject: "", message: "" });
  const [errs, setErrs] = useExtraState({});
  const [done, setDone] = useExtraState(false);
  const set = (k, v) => setVals((s) => ({ ...s, [k]: v }));
  const infoIcons = [Icons.send, Icons.chat, Icons.map, Icons.clock];

  const submit = () => {
    const e = {};
    if (!vals.name.trim()) e.name = c.required;
    if (!vals.email.trim()) e.email = c.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = c.invalidEmail;
    if (!vals.message.trim()) e.message = c.required;
    setErrs(e);
    if (Object.keys(e).length === 0) setDone(true);
  };

  if (done) {
    return (
      <React.Fragment>
        <PageHead eyebrow={c.eyebrow} title={c.title} />
        <section className="section">
          <div className="wrap">
            <div className="success-card">
              <div className="ic">{Icons.check}</div>
              <h2>{c.successTitle}</h2>
              <p>{c.successSub}</p>
              <Button kind="primary" onClick={() => onNav("home")}>{t.cta.back}</Button>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <PageHead eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="section">
        <div className="wrap">
          <div className="contact-split">
            <div className="contact-info">
              <h3>{c.infoTitle}</h3>
              {c.info.map(([label, val], i) => (
                <div className="cinfo-row" key={label}>
                  <div className="ic">{infoIcons[i]}</div>
                  <div><span>{label}</span><b dir="ltr">{val}</b></div>
                </div>
              ))}
              <div className="cinfo-seal"><Logo variant="darkgreen" style={{ height: 40 }} /></div>
            </div>
            <div className="form-card" style={{ margin: 0 }}>
              <FormField label={f.name} required value={vals.name} err={errs.name} onChange={(v) => set("name", v)} />
              <FormField label={f.email} required type="email" value={vals.email} err={errs.email} onChange={(v) => set("email", v)} />
              <FormField label={f.subject} value={vals.subject} options={f.subjects} ph={f.subjectPh} onChange={(v) => set("subject", v)} />
              <FormField label={f.message} required textarea placeholder={f.messagePh} value={vals.message} err={errs.message} onChange={(v) => set("message", v)} />
              <Button kind="primary" lg className="btn-block" icon={Icons.send} onClick={submit}>{c.submit}</Button>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

// ---- WhatsApp groups ----
function WhatsappPage({ onNav }) {
  const { t, lang } = useLang();
  const w = t.whatsapp;
  return (
    <React.Fragment>
      <PageHead eyebrow={w.eyebrow} title={w.title} lead={w.lead} />
      <section className="section">
        <div className="wrap">
          <div className="wa-grid">
            {w.groups.map(([name, desc], i) => (
              <div className="wa-card" key={i}>
                <div className="wa-ic">{Icons.whatsapp}</div>
                <div className="wa-body">
                  <h3>{name}</h3>
                  <p>{desc}</p>
                </div>
                <a className="wa-join btn btn-primary btn-sm"
                   href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                  {w.joinBtn}
                </a>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13, color: "var(--gok-ink-3)", marginTop: 24, textAlign: "center" }}>{w.note}</p>
        </div>
      </section>
    </React.Fragment>
  );
}

// ---- FAQ standalone page ----
function FaqPage({ onNav }) {
  const { t, lang } = useLang();
  const f = t.faqPage;
  const items = HOME_FAQ[lang];
  const [open, setOpen] = useExtraState(0);
  return (
    <React.Fragment>
      <PageHead eyebrow={f.eyebrow} title={f.title} lead={f.lead} />
      <section className="section">
        <div className="wrap">
          <div className="faq-list" style={{ marginTop: 0 }}>
            {items.map(([q, a], i) => (
              <div className={"faq-item" + (open === i ? " open" : "")} key={i}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  {q}
                  <span className="faq-chev">{Icons.chevD}</span>
                </button>
                <div className="faq-a"><p>{a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { PesachPage, ContactPage, WhatsappPage, FaqPage });
