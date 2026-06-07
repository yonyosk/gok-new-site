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
  const cert = lang === "he" ? p.cert : p.certEn;
  const kType = p.kosher.find((k) => k !== "passover") || p.kosher[0];
  return (
    <div className={"pcard" + (mini ? " mini" : "")}>
      <div className="pcard-top">
        <div className="pcard-top-l">
          <span className="pcard-check">{Icons.check}</span>
          <div className="pcard-cert">
            <b>{lang === "he" ? "כשר" : "Kosher"}</b>
            <span>{cert}</span>
          </div>
        </div>
        <div className="pcard-top-r">
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {p.kosher.map((k) => (
              <KosherBadge key={k} type={k} label={t.zekasher.kosherTypes[k]} />
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
          <div className="pcard-barcode">{t.zekasher.barcode}: {p.barcode}</div>
        </div>
        <div className="pcard-img" style={{ background: p.tone }}>
          {p.image
            ? <img src={p.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <React.Fragment><CatGlyph cat={p.cat} /><span className="ph-brand">{p.brand}</span></React.Fragment>}
        </div>
      </div>
      <div className="pcard-warn">{Icons.info}{t.zekasher.warning}</div>
    </div>
  );
}

// ---- filter bottom-sheet ----
function FilterSheet({ open, onClose, country, setCountry, kosher, setKosher, cat, setCat, onApply }) {
  const { t, lang } = useLang();
  const kt = t.zekasher.kosherTypes;
  return (
    <React.Fragment>
      <div className={"sheet-scrim" + (open ? " open" : "")} onClick={onClose} />
      <div className={"sheet" + (open ? " open" : "")} role="dialog" aria-modal="true">
        <div className="sheet-head">
          <h3>{t.zekasher.filters}</h3>
          <button onClick={onClose} aria-label="close">{Icons.x}</button>
        </div>
        <div className="sheet-body">
          <div className="fgroup">
            <h4>{t.zekasher.country}</h4>
            <div className="fopts">
              {COUNTRIES.map((c) => (
                <button key={c.code} className={"fopt" + (country === c.code ? " on" : "")}
                        onClick={() => setCountry(c.code)}>
                  <span className="flag">{c.flag}</span>{lang === "he" ? c.he : c.en}
                </button>
              ))}
            </div>
          </div>
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
            <h4>{t.zekasher.cats.all}</h4>
            <div className="fopts">
              {["all", "dairy", "meat", "bakery", "snacks", "drinks", "pantry"].map((c) => (
                <button key={c} className={"fopt" + (cat === c ? " on" : "")}
                        onClick={() => setCat(c)}>{t.zekasher.cats[c]}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="sheet-foot">
          <Button kind="outline" onClick={() => { setCountry("all"); setKosher("all"); setCat("all"); }}>
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

function ZeKasherPage({ initialQuery, initialKosher, onNav, zkView = "grid" }) {
  const { t, lang } = useLang();
  const [q, setQ] = useZkState(initialQuery || "");
  const [country, setCountry] = useZkState("all");
  const [kosher, setKosher] = useZkState(initialKosher || "all");
  const [cat, setCat] = useZkState("all");
  const [sheet, setSheet] = useZkState(false);
  const [loading, setLoading] = useZkState(true);
  const [res, setRes] = useZkState({ items: [], total: 0 });
  const [favs, setFavs] = useZkState({});
  const reqId = useZkRef(0);

  useZkEffect(() => {
    const id = ++reqId.current;
    setLoading(true);
    searchProducts({ q, country, kosher, cat }, lang).then((r) => {
      if (id === reqId.current) { setRes(r); setLoading(false); }
    });
  }, [q, country, kosher, cat, lang]);

  const toggleFav = (id) => setFavs((f) => ({ ...f, [id]: !f[id] }));
  const activeFilters = (country !== "all" ? 1 : 0) + (kosher !== "all" ? 1 : 0) + (cat !== "all" ? 1 : 0);
  const sel = countryByCode(country);
  const kt = t.zekasher.kosherTypes;

  return (
    <React.Fragment>
      <section className="zk-hero">
        <div className="hero-lozenge" />
        <div className="wrap">
          <Eyebrow onDark>{t.zekasher.eyebrow}</Eyebrow>
          <h1>{t.zekasher.title}</h1>
          <p>{t.zekasher.sub}</p>

          <div className="zk-tools">
            <div className="zk-searchbar">
              {Icons.search}
              <input value={q} placeholder={t.zekasher.searchPlaceholder}
                     onChange={(e) => setQ(e.target.value)} />
              {q ? (
                <button className="scan" aria-label="clear" onClick={() => setQ("")}>{Icons.x}</button>
              ) : (
                <button className="scan" aria-label="scan barcode" title="Scan">{Icons.scan}</button>
              )}
            </div>
            <div className="zk-filterrow">
              <button className="zk-chip filter-btn" onClick={() => setSheet(true)}>
                {Icons.filter}{t.zekasher.filter}
                {activeFilters > 0 && <span className="count-dot">{activeFilters}</span>}
              </button>
              <button className="zk-chip" onClick={() => setSheet(true)}>
                <span className="flag">{sel.flag}</span>
                {country === "all" ? t.zekasher.allCountries : (lang === "he" ? sel.he : sel.en)}
                {Icons.chevD}
              </button>
              {["all", "milk", "meat", "pareve", "passover"].map((k) => (
                <button key={k} className={"zk-chip" + (kosher === k ? " on" : "")}
                        onClick={() => setKosher(k)}>{kt[k]}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap zk-results">
        <div className="zk-results-head">
          <h2>{t.zekasher.resultsAll} <span style={{ color: "var(--gok-green)" }}>({res.total})</span></h2>
          <span className="muted">{t.zekasher.sortNote}</span>
        </div>

        {loading ? (
          <div className="zk-loading"><span className="zk-spinner" />{lang === "he" ? "מחפש…" : "Searching…"}</div>
        ) : res.total === 0 ? (
          <div className="zk-empty">
            <div className="ic">{Icons.search}</div>
            <h3>{t.zekasher.empty}</h3>
            <p>{t.zekasher.emptySub}</p>
            <Button kind="primary" icon={Icons.arrow} onClick={() => onNav("utensils")}>
              {t.zekasher.addProduct}
            </Button>
          </div>
        ) : (
          <div className={"zk-grid" + (zkView === "list" ? " list" : "")}>
            {res.items.map((p) => (
              <ProductCard key={p.id} p={p} onFav={toggleFav} faved={favs[p.id]} />
            ))}
          </div>
        )}

        <p style={{ fontSize: 12.5, color: "var(--gok-ink-3)", marginTop: 20, textAlign: "center" }}>
          {t.zekasher.apiNote}
        </p>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="zk-phone-promo">
            <div className="dots" />
            <div className="zk-phone-in">
              <PhoneMock />
              <div className="zk-phone-copy">
                <Eyebrow onDark tone="lime">{t.zekasher.tryPhone}</Eyebrow>
                <h2>ZeKasher</h2>
                <p>{t.zekasher.phoneNote}</p>
                <div className="store-row">
                  <Button kind="lime" icon={Icons.arrow}>App Store</Button>
                  <Button kind="ghost-light" icon={Icons.arrow}>Google Play</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FilterSheet open={sheet} onClose={() => setSheet(false)}
        country={country} setCountry={setCountry} kosher={kosher} setKosher={setKosher}
        cat={cat} setCat={setCat} onApply={() => setSheet(false)} />
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

Object.assign(window, { ZeKasherPage, ProductCard, PhoneMock, FilterSheet, CatGlyph });
