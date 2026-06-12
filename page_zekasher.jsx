// GOK site — ZeKasher product search (desktop layout + interactive search + phone mockup).
const { useState: useZkState, useEffect: useZkEffect, useRef: useZkRef } = React;

// ---- category placeholder glyphs (line icons over a tinted block) ----
const CatGlyph = ({ cat }) => {
  const P = (paths) => (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor"
         strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="ph-icon">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
  switch (cat) {
    case "dairy":  return P(["M9 2h6", "M9 2v3l-2 3v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8l-2-3V2", "M7 12h10"]);
    case "meat":   return P(["M3 17a4 4 0 0 0 5 5l2-2 8-8a4 4 0 1 0-5-5l-8 8-2 2Z", "M5 19l-2 2"]);
    case "bakery": return P(["M4 13a4 4 0 0 1 4-4h8a4 4 0 0 1 0 8H8a4 4 0 0 1-4-4Z", "M8 9V7M12 9V7M16 9V7"]);
    case "snacks": return P(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M8 9h.01M14 8h.01M9 14h.01M15 14h.01M12 11h.01"]);
    case "drinks": return P(["M7 3h10l-1 5H8L7 3Z", "M8 8l1 12a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l1-12"]);
    default:       return P(["M5 8h14v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8Z", "M4 4h16v4H4z", "M10 12h4"]);
  }
};

function ProductCard({ p, mini, onFav, faved }) {
  const { t, lang } = useLang();
  const z = t.zekasher;
  const cert = lang === "he" ? p.cert : p.certEn;
  const isUnhandled = p.apiStatus === "unhandled" || (!p.cert && !p.kosher?.length);
  return (
    <div className={"pcard" + (mini ? " mini" : "")}>
      <div className="pcard-top">
        <div className="pcard-top-l">
          {isUnhandled ? (
            <div className="pcard-unhandled" title={z.statusUnhandledTip}>
              <span className="pcard-unhandled-dot" />
              <span>{z.statusUnhandled}</span>
            </div>
          ) : (
            <React.Fragment>
              <span className="pcard-check">{Icons.check}</span>
              <div className="pcard-cert">
                <b>{lang === "he" ? "כשר" : "Kosher"}</b>
                <span>{cert}</span>
              </div>
            </React.Fragment>
          )}
        </div>
        <div className="pcard-top-r">
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {(p.kosher || []).map((k) => (
              <KosherBadge key={k} type={k} label={z.kosherTypes[k]} />
            ))}
          </div>
          {!mini && (
            <button className={"pcard-fav" + (faved ? " on" : "")} aria-label="favorite"
                    onClick={() => onFav && onFav(p.id)}>{Icons.heart}</button>
          )}
        </div>
      </div>
      <div className="pcard-body">
        <div className="pcard-info">
          <span className="pcard-brand">{p.brand}</span>
          <div className="pcard-names">
            <div className="he">{lang === "he" ? p.he : p.en}</div>
            <div className="en">{lang === "he" ? p.en : p.he}</div>
          </div>
          {p.barcode && <div className="pcard-barcode">{z.barcode}: {p.barcode}</div>}
        </div>
        <div className="pcard-img" style={{ background: p.tone }}>
          {p.image
            ? <img src={p.image} alt={lang === "he" ? p.he : p.en} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <React.Fragment><CatGlyph cat={p.cat} /><span className="ph-brand">{p.brand}</span></React.Fragment>}
        </div>
      </div>
    </div>
  );
}

// ---- country picker bottom-sheet ----
function CountrySheet({ open, onClose, country, setCountry, countries = COUNTRIES }) {
  const { t, lang } = useLang();
  const [filter, setFilter] = React.useState("");
  React.useEffect(() => { if (!open) setFilter(""); }, [open]);
  const q = filter.trim().toLowerCase();
  const filtered = q
    ? countries.filter((c) => c.he.includes(filter.trim()) || c.en.toLowerCase().includes(q) || c.code.toLowerCase() === q)
    : countries;
  return (
    <React.Fragment>
      <div className={"sheet-scrim" + (open ? " open" : "")} onClick={onClose} />
      <div className={"sheet" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-labelledby="country-sheet-title">
        <div className="sheet-head">
          <h3 id="country-sheet-title">{t.zekasher.country}</h3>
          <button onClick={onClose} aria-label="close">{Icons.x}</button>
        </div>
        <div className="sheet-body">
          <input className="country-filter-input"
                 placeholder={lang === "he" ? "חיפוש מדינה…" : "Search country…"}
                 value={filter} onChange={(e) => setFilter(e.target.value)} />
          <div className="fopts fopts--countries">
            {filtered.map((c) => (
              <button key={c.code} className={"fopt" + (country === c.code ? " on" : "")}
                      onClick={() => { setCountry(c.code); onClose(); }}>
                <span className="flag">{c.flag}</span>{lang === "he" ? c.he : c.en}
              </button>
            ))}
            {filtered.length === 0 && (
              <p style={{ fontSize: 14, color: "var(--gok-ink-3)", padding: "12px 4px" }}>
                {lang === "he" ? "לא נמצאה מדינה" : "No country found"}
              </p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// ---- filter bottom-sheet ----
function FilterSheet({ open, onClose, kosher, setKosher, cat, setCat, onApply }) {
  const { t, lang } = useLang();
  const kt = t.zekasher.kosherTypes;
  return (
    <React.Fragment>
      <div className={"sheet-scrim" + (open ? " open" : "")} onClick={onClose} />
      <div className={"sheet" + (open ? " open" : "")} role="dialog" aria-modal="true" aria-labelledby="filter-sheet-title">
        <div className="sheet-head">
          <h3 id="filter-sheet-title">{t.zekasher.filters}</h3>
          <button onClick={onClose} aria-label="close">{Icons.x}</button>
        </div>
        <div className="sheet-body">
          <div className="fgroup">
            <h4>{t.zekasher.kosherFor}</h4>
            <div className="fopts">
              {["all", "milk", "meat", "pareve", "passover"].map((k) => (
                <button key={k} className={"fopt" + (kosher === k ? " on" : "")}
                        onClick={() => setKosher(k)}>{kt[k]}</button>
              ))}
            </div>
          </div>
          <div className="fgroup">
            <h4>{t.zekasher.catLabel}</h4>
            <div className="fopts">
              <button className={"fopt" + (cat === "all" ? " on" : "")}
                      onClick={() => setCat("all")}>{t.zekasher.cats.all}</button>
              {CATEGORIES.map((c) => (
                <button key={c.id} className={"fopt" + (cat === c.id ? " on" : "")}
                        onClick={() => setCat(c.id)}>{c.icon} {lang === "he" ? c.he : c.en}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="sheet-foot">
          <Button kind="outline" onClick={() => { setKosher("all"); setCat("all"); }}>
            {lang === "he" ? "איפוס" : "Reset"}
          </Button>
          <Button kind="primary" onClick={onApply}>
            {lang === "he" ? "הצגת מוצרים" : "Show products"}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

function ZeKasherPage(props) {
  const { user } = useAuth();
  if (!user) return <ZeKasherGuest onNav={props.onNav} />;
  return <ZeKasherFull {...props} />;
}

function ZeKasherFull({ initialQuery, initialKosher, onNav, zkView = "grid" }) {
  const { t, lang } = useLang();
  const [q, setQ] = useZkState(initialQuery || "");
  const [committedQ, setCommittedQ] = useZkState(initialQuery || "");
  const [country, setCountry] = useZkState("all");
  const [kosher, setKosher] = useZkState(initialKosher || "all");
  const [cat, setCat] = useZkState("all");
  const [sheet, setSheet] = useZkState(false);
  const [countrySheet, setCountrySheet] = useZkState(false);
  const [loading, setLoading] = useZkState(true);
  const [res, setRes] = useZkState({ items: [], total: 0 });
  const [favs, setFavs] = useZkState({});
  const reqId = useZkRef(0);
  const [countryList, setCountryList] = useZkState(COUNTRIES);
  const [scanWarnMsg, setScanWarnMsg] = useZkState("");

  useZkEffect(() => {
    fetchAvailableCountries().then(setCountryList);
  }, []);

  const browseMode = country !== "all" && !committedQ && cat === "all" && kosher === "all";

  useZkEffect(() => {
    const id = ++reqId.current;
    setLoading(true);
    const limit = browseMode ? 100 : 20;
    searchProducts({ q: committedQ, approved_only: true, country, kosher, cat, limit }, lang).then((r) => {
      if (id === reqId.current) { setRes(r); setLoading(false); }
    });
  }, [committedQ, country, kosher, cat, lang]);

  const [scanning, setScanning] = useZkState(false);
  const fileRef = useZkRef(null);

  const commitSearch = () => setCommittedQ(q);
  const toggleFav = (id) => setFavs((f) => ({ ...f, [id]: !f[id] }));
  const activeFilters = (kosher !== "all" ? 1 : 0) + (cat !== "all" ? 1 : 0);
  const sel = countryByCode(country);

  const activateScan = () => {
    if (!("BarcodeDetector" in window) && !/iPhone|iPad|Android/i.test(navigator.userAgent)) {
      setScanWarnMsg(lang === "he" ? "סריקת ברקוד אינה נתמכת בדפדפן זה" : "Barcode scanning is not supported in this browser");
      return;
    }
    setScanWarnMsg("");
    if (fileRef.current) fileRef.current.click();
  };

  const onScanFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file || !("BarcodeDetector" in window)) return;
    setScanning(true);
    try {
      let formats;
      try { formats = await window.BarcodeDetector.getSupportedFormats(); } catch (_) {}
      const detector = new window.BarcodeDetector(formats?.length ? { formats } : undefined);
      const bmp = await createImageBitmap(file);
      const codes = await detector.detect(bmp);
      if (bmp.close) bmp.close();
      if (codes?.length) { const val = codes[0].rawValue; setQ(val); setCommittedQ(val); }
    } catch {} finally { setScanning(false); }
  };

  return (
    <React.Fragment>
      <section className="zk-hero">
        <div className="hero-lozenge" />
        <div className="wrap">
          <Eyebrow onDark>{t.zekasher.eyebrow}</Eyebrow>
          <h1>{t.zekasher.title}</h1>
          <p>{t.zekasher.sub}</p>

          <div className="zk-country-strip">
            <button className="zk-country-btn" onClick={() => setCountrySheet(true)}>
              <span className="zk-country-label">{t.zekasher.buyingIn}</span>
              <span className="flag">{sel.flag}</span>
              <span>{country === "all" ? t.zekasher.allCountries : (lang === "he" ? sel.he : sel.en)}</span>
              {Icons.chevD}
            </button>
            {country === "all" && <span className="zk-country-nudge">{t.zekasher.selectCountry}</span>}
          </div>

          <div className="zk-tools">
            <div className="zk-searchbar">
              <button className="zk-search-go" aria-label={lang === "he" ? "חפש" : "Search"}
                      onClick={commitSearch}>
                {Icons.search}
              </button>
              <input value={q} placeholder={t.zekasher.searchPlaceholder}
                     onChange={(e) => setQ(e.target.value)}
                     onKeyDown={(e) => { if (e.key === "Enter") commitSearch(); }} />
              {q ? (
                <button className="scan" aria-label="clear" onClick={() => { setQ(""); setCommittedQ(""); }}>{Icons.x}</button>
              ) : (
                <button className="scan" aria-label="scan barcode" onClick={activateScan} disabled={scanning}>
                  {scanning ? <span className="zk-spinner" style={{width:18,height:18,borderWidth:2}} /> : Icons.scan}
                </button>
              )}
            </div>
            <div className="zk-filterrow">
              <button className="zk-chip filter-btn" onClick={() => setSheet(true)}>
                {Icons.filter}{t.zekasher.filter}
                {activeFilters > 0 && <span className="count-dot">{activeFilters}</span>}
              </button>
              {kosher !== "all" && (
                <button className="zk-chip on" onClick={() => setKosher("all")}>
                  {t.zekasher.kosherTypes[kosher]}{Icons.x}
                </button>
              )}
              {cat !== "all" && (
                <button className="zk-chip on" onClick={() => setCat("all")}>
                  {(CATEGORIES.find((c) => c.id === cat) || {}).icon}{" "}
                  {lang === "he" ? (CATEGORIES.find((c) => c.id === cat) || {}).he : (CATEGORIES.find((c) => c.id === cat) || {}).en}
                  {Icons.x}
                </button>
              )}
            </div>
          </div>
          {scanWarnMsg && <div className="zk-scan-msg">{Icons.info}{scanWarnMsg}</div>}
        </div>
      </section>

      <section className="wrap zk-results">
        <div className="zk-cat-strip">
          {QUICK_CATS.map((c) => (
            <button key={c.id} className={"zk-cat-chip" + (cat === c.id ? " on" : "")}
                    onClick={() => setCat(cat === c.id ? "all" : c.id)}>
              <span>{c.icon}</span>{lang === "he" ? c.he : c.en}
            </button>
          ))}
        </div>
        <div className="zk-results-head">
          <h2>
            {t.zekasher.resultsAll}{" "}
            <span style={{ color: "var(--gok-green)" }}>
              ({res.items.length}{res.hasMore ? "+" : ""})
            </span>
          </h2>
          <span className="muted">{t.zekasher.sortNote}</span>
        </div>

        {loading ? (
          <div className="zk-loading"><span className="zk-spinner" />{lang === "he" ? "מחפש…" : "Searching…"}</div>
        ) : res.items.length === 0 ? (
          <div className="zk-empty">
            <div className="ic">{Icons.search}</div>
            <h3>{t.zekasher.emptyApproved}</h3>
            <p>{t.zekasher.emptyApprovedSub}</p>
            <button className="zk-reset-link"
                    onClick={() => { setQ(""); setCommittedQ(""); setKosher("all"); setCat("all"); setCountry("all"); }}>
              {lang === "he" ? "נקה חיפוש" : "Clear search"}
            </button>
          </div>
        ) : browseMode ? (
          <React.Fragment>
            <div className="pcard-warn pcard-warn--global">{Icons.info}{t.zekasher.warning}</div>
            {(() => {
              const grouped = {};
              res.items.forEach((p) => { const k = p.cat || "other"; (grouped[k] = grouped[k] || []).push(p); });
              const sections = CATEGORIES.filter((c) => grouped[c.id]);
              if (grouped.other) sections.push({ id: "other", icon: "📦", he: "אחר", en: "Other" });
              return sections.map((c) => (
                <div key={c.id} className="zk-cat-section">
                  <div className="zk-cat-section-head">
                    <span>{c.icon}</span>
                    <h3>{lang === "he" ? c.he : c.en}</h3>
                    <span className="muted">({grouped[c.id].length})</span>
                  </div>
                  <div className="zk-grid">
                    {grouped[c.id].map((p) => <ProductCard key={p.id} p={p} onFav={toggleFav} faved={favs[p.id]} />)}
                  </div>
                </div>
              ));
            })()}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="pcard-warn pcard-warn--global">{Icons.info}{t.zekasher.warning}</div>
            <div className={"zk-grid" + (zkView === "list" ? " list" : "")}>
              {res.items.map((p) => (
                <ProductCard key={p.id} p={p} onFav={toggleFav} faved={favs[p.id]} />
              ))}
            </div>
          </React.Fragment>
        )}
      </section>

      <FilterSheet open={sheet} onClose={() => setSheet(false)}
        kosher={kosher} setKosher={setKosher}
        cat={cat} setCat={setCat} onApply={() => setSheet(false)} />
      <CountrySheet open={countrySheet} onClose={() => setCountrySheet(false)}
        country={country} setCountry={setCountry} countries={countryList} />
      <input ref={fileRef} type="file" accept="image/*" capture="environment"
             style={{display:"none"}} onChange={onScanFile} />
    </React.Fragment>
  );
}

// ---- Guest (unregistered) view: login wall ----
function ZeKasherGuest({ onNav }) {
  const { t } = useLang();
  const { openAuth } = useAuth();
  const z = t.zekasher;
  const auth = t.auth;
  return (
    <React.Fragment>
      <section className="zk-hero">
        <div className="hero-lozenge" />
        <div className="wrap">
          <Eyebrow onDark>{z.eyebrow}</Eyebrow>
          <h1>{z.title}</h1>
          <p>{z.sub}</p>
        </div>
      </section>

      <section className="wrap zk-results">
        <div className="zk-auth-wall">
          <span className="zk-auth-wall-ic">{Icons.lock}</span>
          <h2>{z.guestTitle}</h2>
          <p>{z.guestSub}</p>
          <div className="zk-auth-wall-btns">
            <Button kind="lime" icon={Icons.user} onClick={() => openAuth("register")}>
              {auth.register}
            </Button>
            <Button kind="outline" onClick={() => openAuth("signin")}>
              {auth.signin}
            </Button>
          </div>
        </div>
      </section>

    </React.Fragment>
  );
}

// ---- Phone mockup (mirrors the ZeKasher app design) ----
function PhoneMock({ compact }) {
  const { t, lang } = useLang();
  const items = PRODUCTS.slice(0, 4);
  const chips = [t.zekasher.kosherTypes.all, t.zekasher.kosherTypes.meat, t.zekasher.kosherTypes.milk, t.zekasher.kosherTypes.pareve];
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="pscreen-status">
          <span>9:41</span>
          <span>● ● ●</span>
        </div>
        <div className="pscreen-top">
          <div className="pscreen-appbar">
            <span className="flag">🇨🇭</span>
            <span className="logo"><Logo variant="darkgreen" /> ZeKasher</span>
            <span style={{ color: "var(--gok-ink-3)" }}>{Icons.filter}</span>
          </div>
          <div className="pscreen-search">{Icons.search}<span>{t.zekasher.searchPlaceholder}</span></div>
          <div className="pscreen-chips">
            {chips.map((c, i) => (
              <span key={c} className={"pscreen-chip" + (i === 0 ? " on" : "")}>{c}</span>
            ))}
          </div>
        </div>
        <div className="pscreen-body">
          {items.map((p) => <ProductCard key={p.id} p={p} mini />)}
        </div>
        <div className="pscreen-nav">
          <span className="item">{Icons.book}{lang === "he" ? "מדריך" : "Guide"}</span>
          <span className="item on">{Icons.search}{lang === "he" ? "מוצרים" : "Products"}</span>
          <span className="item">{Icons.chat}{lang === "he" ? "צ׳אט" : "Chat"}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ZeKasherPage, ZeKasherFull, ZeKasherGuest, ProductCard, PhoneMock, FilterSheet, CountrySheet, CatGlyph });
