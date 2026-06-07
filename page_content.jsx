// GOK site — content pages: About, Guide list, Article, Support, Utensils form. + ArticleCard.
const { useState: useCState } = React;

// shared article card (home preview + guide grid + related)
function ArticleCard({ a, tone, onNav }) {
  const { t, lang } = useLang();
  const cat = (lang === "he" ? STR.he : STR.en).guide.cats[a.cat];
  const c = lang === "he" ? a.he : a.en;
  return (
    <div className="gcard" onClick={() => onNav("article", { id: a.id })}>
      <div className="gcard-top" style={{ background: tone || "#234F47" }}>
        <Sparkle tone="lime" className="spk" />
        <span className="gcard-cat">{cat}</span>
      </div>
      <div className="gcard-body">
        <h3>{c.title}</h3>
        <p>{c.excerpt}</p>
        <div className="gcard-meta">{Icons.clock}{a.read} {t.guide.readTime}</div>
      </div>
    </div>
  );
}

function PageHead({ eyebrow, title, lead }) {
  return (
    <section className="phead">
      <Sparkle tone="green" className="spk-deco" />
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}

// ---- About ----
function AboutPage({ onNav }) {
  const { t } = useLang();
  return (
    <React.Fragment>
      <PageHead eyebrow={t.about.eyebrow} title={t.about.title} lead={t.about.lead} />
      <section className="section">
        <div className="wrap">
          <div className="about-prose">
            {t.about.paras.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>
      <section className="section feat">
        <div className="wrap">
          <div className="sec-head"><Eyebrow>{t.about.valuesTitle}</Eyebrow></div>
          <div className="values-grid">
            {t.about.values.map(([h, p]) => (
              <div className="vcard" key={h}>
                <h3><Sparkle tone="green" className="spk" />{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <Eyebrow>{t.about.teamTitle}</Eyebrow>
            <h2>{t.about.teamTitle}</h2>
            <p>{t.about.teamSub}</p>
          </div>
          <div className="values-grid">
            {[0, 1, 2, 3].map((i) => (
              <div className="vcard" key={i} style={{ borderTopColor: "var(--gok-green)", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--gok-mist)",
                  margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "var(--gok-green)", fontWeight: 800, fontSize: 22 }}>
                  {["ר", "מ", "ש", "א"][i]}
                </div>
                <h3 style={{ justifyContent: "center", fontSize: 18 }}>{t.dir === "rtl" ? "הרב ישראל כהן" : "Rabbi Israel Cohen"}</h3>
                <p>{t.dir === "rtl" ? "חבר ועדת ההלכה" : "Halachic committee member"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand onNav={onNav} />
    </React.Fragment>
  );
}

// ---- Guide list ----
function GuidePage({ onNav }) {
  const { t, lang } = useLang();
  const [cat, setCat] = useCState(0);
  const list = cat === 0 ? ARTICLES : ARTICLES.filter((a) => a.cat === cat);
  return (
    <React.Fragment>
      <PageHead eyebrow={t.guide.eyebrow} title={t.guide.title} lead={t.guide.sub} />
      <section className="section">
        <div className="wrap">
          <div className="pill-row">
            {t.guide.cats.map((c, i) => (
              <button key={c} className={"pill-tab" + (cat === i ? " on" : "")}
                      onClick={() => setCat(i)}>{c}</button>
            ))}
          </div>
          <div className="guide-grid">
            {list.map((a, i) => (
              <ArticleCard key={a.id} a={a} tone={GUIDE_TONES[(a.cat + i) % GUIDE_TONES.length]} onNav={onNav} />
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

// ---- Article ----
function ArticlePage({ articleId, onNav }) {
  const { t, lang } = useLang();
  const a = ARTICLES.find((x) => x.id === articleId) || ARTICLES[0];
  const c = lang === "he" ? a.he : a.en;
  const body = ARTICLE_BODY[lang];
  const cat = t.guide.cats[a.cat];
  const related = ARTICLES.filter((x) => x.id !== a.id).slice(0, 3);
  return (
    <React.Fragment>
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="article">
          <button className="article-back" onClick={() => onNav("guide")}>
            {Icons.chevL}{t.article.backToGuide}
          </button>
          <Eyebrow>{cat}</Eyebrow>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(28px,6vw,42px)", letterSpacing: "-.02em",
            lineHeight: 1.12, margin: "12px 0 0" }}>{c.title}</h1>
          <div className="article-meta">
            <span>{t.article.updated} 06/2026</span><span className="dot" />
            <span>{a.read} {t.guide.readTime}</span><span className="dot" />
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--gok-green)" }}>
              {Icons.share}{t.article.share}</span>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="article article-body">
          {body.map((b, i) => {
            if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.type === "quote") return (
              <div className="article-quote" key={i}>
                <Sparkle tone="lime" className="spk" /><div>{b.text}</div>
              </div>
            );
            if (b.type === "ul") return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
            return <p key={i}>{b.text}</p>;
          })}

          <div className="article-related">
            <div className="sec-head" style={{ marginBottom: 18 }}>
              <h2 style={{ fontSize: 24, margin: 0 }}>{t.article.related}</h2>
            </div>
            <div className="related-grid">
              {related.map((r, i) => (
                <ArticleCard key={r.id} a={r} tone={GUIDE_TONES[(r.cat + i) % GUIDE_TONES.length]} onNav={onNav} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

// ---- Support ----
function SupportPage({ onNav }) {
  const { t, lang } = useLang();
  const [freq, setFreq] = useCState("once");
  const [amount, setAmount] = useCState(t.support.amounts[1]);
  const [custom, setCustom] = useCState("");
  const [done, setDone] = useCState(false);
  const icons = [Icons.globe, Icons.map, Icons.scan];

  if (done) {
    return (
      <React.Fragment>
        <PageHead eyebrow={t.support.eyebrow} title={t.support.title} />
        <section className="section">
          <div className="wrap">
            <div className="success-card">
              <div className="ic">{Icons.heartHand}</div>
              <h2>{t.support.thanksTitle}</h2>
              <p>{t.support.thanksSub}</p>
              <Button kind="primary" onClick={() => onNav("home")}>{t.cta.back}</Button>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <PageHead eyebrow={t.support.eyebrow} title={t.support.title} lead={t.support.lead} />
      <section className="section">
        <div className="wrap">
          <div className="donate-card">
            <div className="donate-freq">
              <button className={freq === "once" ? "on" : ""} onClick={() => setFreq("once")}>{t.support.freqOnce}</button>
              <button className={freq === "monthly" ? "on" : ""} onClick={() => setFreq("monthly")}>{t.support.freqMonthly}</button>
            </div>
            <div className="donate-label">{t.support.amountTitle}</div>
            <div className="amount-grid">
              {t.support.amounts.map((a) => (
                <button key={a} className={"amount-btn" + (amount === a && !custom ? " on" : "")}
                        onClick={() => { setAmount(a); setCustom(""); }}>{a}</button>
              ))}
            </div>
            <div className="amount-custom">
              <span>{lang === "he" ? "₪" : "$"}</span>
              <input type="number" placeholder={t.support.custom} value={custom}
                     onChange={(e) => { setCustom(e.target.value); }} />
            </div>
            <Button kind="primary" lg className="btn-block" icon={Icons.heart}
                    onClick={() => setDone(true)}>{t.support.donateBtn}</Button>
          </div>
        </div>
      </section>
      <section className="section feat">
        <div className="wrap">
          <div className="sec-head center"><h2>{t.support.impactTitle}</h2></div>
          <div className="impact-grid">
            {t.support.impact.map(([h, p], i) => (
              <div className="icard" key={h}>
                <div className="ic">{icons[i]}</div>
                <div><h4>{h}</h4><p>{p}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

// top-level field component (defining inside a page would remount + lose focus each keystroke)
function FormField({ label, required, value, onChange, type = "text", textarea, placeholder, err, options, ph }) {
  return (
    <div className={"field" + (err ? " err" : "")}>
      <label>{label} {required && <span className="req">*</span>}</label>
      {options
        ? <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value="">{ph}</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        : textarea
        ? <textarea value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        : <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
      {err && <div className="errmsg">{err}</div>}
    </div>
  );
}

// ---- Utensils sale form (enhanced) ----
const UTIL_STR = {
  he: {
    personalSection: "פרטים אישיים",
    utensilsSection: "פירוט הכלים",
    city: "עיר",
    utensilName: "שם / תיאור הכלי",
    utensilNamePh: "למשל: סיר נירוסטה, מחבת טפלון, כוס זכוכית...",
    material: "חומר",
    matPh: "בחרו חומר",
    qty: "כמות",
    value: "ערך משוער (₪)",
    addRow: "הוספת כלי",
    authSection: "נוסח הרשאת המכירה",
    authText: "אני הח\"מ מרשה ומסמיך/ת את ארגון GOK ואת נציגיו המוסמכים לבצע מכירה כדין תורה של הכלים המפורטים לעיל לנוכרי, לשם פטורם מחיוב טבילה עם ברכה. המכירה תבוצע על-ידי הרב המוסמך מטעם הארגון ותכנס לתוקפה מיום קבלת אישור בדוא\"ל מהארגון. אני מאשר/ת כי הכלים שייכים לי ומוסמכים למכירה.",
    notesSection: "הערות (לא חובה)",
    dateLabel: "תאריך מילוי הטופס",
    mats: { metal: "מתכת", glass: "זכוכית", ceramic: "קרמיקה / חרסינה", plastic: "פלסטיק", other: "אחר" },
    utensilReq: "יש למלא שם הכלי",
  },
  en: {
    personalSection: "Personal details",
    utensilsSection: "Utensil list",
    city: "City",
    utensilName: "Utensil name / description",
    utensilNamePh: "e.g. stainless pot, Teflon pan, glass cup...",
    material: "Material",
    matPh: "Select material",
    qty: "Qty",
    value: "Est. value ($)",
    addRow: "Add utensil",
    authSection: "Sale authorization",
    authText: "I hereby authorize GOK and its authorized representatives to carry out a valid halachic sale of the utensils listed above to a non-Jew, for the purpose of exempting them from the obligation of immersion (tevilat kelim). The sale will be performed by the organization's authorized rabbi and shall take effect upon receipt of an email confirmation from the organization. I confirm that the listed utensils are my property and authorized for sale.",
    notesSection: "Notes (optional)",
    dateLabel: "Date of submission",
    mats: { metal: "Metal", glass: "Glass", ceramic: "Ceramic / Porcelain", plastic: "Plastic", other: "Other" },
    utensilReq: "Please enter utensil name",
  },
};

function UtensilsPage({ onNav }) {
  const { t, lang } = useLang();
  const u = t.utensils;
  const s = UTIL_STR[lang];
  const f = u.fields;

  const [vals, setVals] = useCState({ name: "", email: "", phone: "", city: "", country: "" });
  const [rows, setRows] = useCState([{ id: 1, name: "", material: "", qty: "1", value: "" }]);
  const [notes, setNotes] = useCState("");
  const [agree, setAgree] = useCState(false);
  const [errs, setErrs] = useCState({});
  const [done, setDone] = useCState(false);

  const set = (k, v) => setVals((prev) => ({ ...prev, [k]: v }));
  const addRow = () => setRows((prev) => [...prev, { id: Date.now(), name: "", material: "", qty: "1", value: "" }]);
  const removeRow = (id) => setRows((prev) => prev.filter((x) => x.id !== id));
  const updateRow = (id, k, v) => setRows((prev) => prev.map((x) => x.id === id ? { ...x, [k]: v } : x));

  const today = new Date().toLocaleDateString(lang === "he" ? "he-IL" : "en-GB");
  const matEntries = Object.entries(s.mats);

  const validate = () => {
    const e = {};
    if (!vals.name.trim()) e.name = u.required;
    if (!vals.email.trim()) e.email = u.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vals.email)) e.email = u.invalidEmail;
    if (!vals.country.trim()) e.country = u.required;
    rows.forEach((r, i) => { if (!r.name.trim()) e["uname_" + i] = s.utensilReq; });
    if (!agree) e.agree = u.mustAgree;
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => { if (validate()) setDone(true); };

  if (done) {
    return (
      <React.Fragment>
        <PageHead eyebrow={u.eyebrow} title={u.title} />
        <section className="section">
          <div className="wrap">
            <div className="success-card">
              <div className="ic">{Icons.check}</div>
              <h2>{u.successTitle}</h2>
              <p>{u.successSub}</p>
              <Button kind="primary" onClick={() => onNav("home")}>{t.cta.back}</Button>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <PageHead eyebrow={u.eyebrow} title={u.title} lead={u.lead} />
      <section className="section">
        <div className="wrap">
          <div className="form-card utensils-form-card">

            {/* — Personal details — */}
            <div className="form-sec-head">{s.personalSection}</div>
            <div className="form-col2">
              <FormField label={f.name} required value={vals.name} err={errs.name} onChange={(v) => set("name", v)} />
              <FormField label={f.email} required type="email" value={vals.email} err={errs.email} onChange={(v) => set("email", v)} />
              <FormField label={f.phone} type="tel" value={vals.phone} onChange={(v) => set("phone", v)} />
              <FormField label={s.city} value={vals.city} onChange={(v) => set("city", v)} />
              <div className="form-col2-span">
                <FormField label={f.country} required value={vals.country} err={errs.country} onChange={(v) => set("country", v)} />
              </div>
            </div>

            {/* — Utensil list — */}
            <div className="form-sec-head">{s.utensilsSection}</div>
            <div className="utensil-list">
              {rows.map((row, i) => (
                <div className="utensil-row" key={row.id}>
                  <div className="urow-fields">
                    <div className={"field" + (errs["uname_" + i] ? " err" : "")}>
                      <label>{s.utensilName} <span className="req">*</span></label>
                      <input type="text" placeholder={s.utensilNamePh} value={row.name}
                             onChange={(e) => updateRow(row.id, "name", e.target.value)} />
                      {errs["uname_" + i] && <div className="errmsg">{errs["uname_" + i]}</div>}
                    </div>
                    <div className="field">
                      <label>{s.material}</label>
                      <select value={row.material} onChange={(e) => updateRow(row.id, "material", e.target.value)}>
                        <option value="">{s.matPh}</option>
                        {matEntries.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                    </div>
                    <div className="field">
                      <label>{s.qty}</label>
                      <input type="number" min="1" value={row.qty}
                             onChange={(e) => updateRow(row.id, "qty", e.target.value)} />
                    </div>
                    <div className="field">
                      <label>{s.value}</label>
                      <input type="number" min="0" placeholder="0" value={row.value}
                             onChange={(e) => updateRow(row.id, "value", e.target.value)} />
                    </div>
                  </div>
                  {rows.length > 1 && (
                    <button className="urow-remove" onClick={() => removeRow(row.id)} aria-label="remove">
                      {Icons.x}
                    </button>
                  )}
                </div>
              ))}
              <button className="add-row-btn" onClick={addRow}>
                <span className="add-row-plus">+</span>{s.addRow}
              </button>
            </div>

            {/* — Date — */}
            <div className="form-date-strip">
              <span>{s.dateLabel}</span>
              <b dir="ltr">{today}</b>
            </div>

            {/* — Authorization — */}
            <div className="form-sec-head">{s.authSection}</div>
            <div className="auth-block">
              <p>{s.authText}</p>
            </div>

            {/* — Notes — */}
            <FormField label={s.notesSection} textarea value={notes} onChange={(v) => setNotes(v)} />

            {/* — Agreement checkbox — */}
            <div className={"check-field" + (agree ? " on" : "") + (errs.agree ? " err" : "")}
                 onClick={() => setAgree((a) => !a)}>
              <span className="box">{Icons.check}</span>
              <span>{f.agree}</span>
            </div>
            {errs.agree && <div className="errmsg" style={{ marginTop: -8, marginBottom: 14 }}>{errs.agree}</div>}

            <Button kind="primary" lg className="btn-block" icon={Icons.send} onClick={submit}>
              {u.submit}
            </Button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

function SolutionsPage({ onNav }) {
  const { t, lang } = useLang();
  const s = t.solutions;
  return (
    <React.Fragment>
      <section className="sol-hero">
        <div className="hero-lozenge" />
        <div className="wrap">
          <Eyebrow onDark>{t.nav.solutions}</Eyebrow>
          <h1>{s.title}</h1>
          <p>{s.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sol-grid">
            {/* Business */}
            <div className="sol-card sol-card--business">
              <div className="sol-card-head">
                <span className="sol-card-ic">{Icons.star}</span>
                <div>
                  <h2>{s.businessTitle}</h2>
                  <p>{s.businessLead}</p>
                </div>
              </div>
              <ul className="sol-list">
                {s.businessItems.map((item) => (
                  <li key={item}><span>{Icons.check}</span>{item}</li>
                ))}
              </ul>
              <Button kind="primary" lg icon={Icons.arrow} onClick={() => onNav("contact")}>
                {s.businessCta}
              </Button>
            </div>

            {/* Personal */}
            <div className="sol-card sol-card--personal">
              <div className="sol-card-head">
                <span className="sol-card-ic">{Icons.user}</span>
                <div>
                  <h2>{s.personalTitle}</h2>
                  <p>{s.personalLead}</p>
                </div>
              </div>
              <ul className="sol-list">
                {s.personalItems.map((item) => (
                  <li key={item}><span>{Icons.check}</span>{item}</li>
                ))}
              </ul>
              <Button kind="outline" lg icon={Icons.arrow} onClick={() => onNav("zekasher")}>
                {s.personalCta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section feat sol-cta-band">
        <div className="wrap">
          <div className="sec-head center">
            <h2>{s.ctaTitle}</h2>
            <p>{s.ctaSub}</p>
          </div>
          <div className="sol-cta-row">
            <Button kind="lime" lg icon={Icons.arrow} onClick={() => onNav("contact")}>{s.ctaContact}</Button>
            <Button kind="ghost-light" lg icon={Icons.arrow} onClick={() => onNav("zekasher")}>{s.ctaZekasher}</Button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

Object.assign(window, { ArticleCard, PageHead, FormField, AboutPage, GuidePage, ArticlePage, SupportPage, UtensilsPage, SolutionsPage });
