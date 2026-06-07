/* @ds-bundle: {"format":3,"namespace":"GOKDesignSystem_59dcde","components":[],"sourceHashes":{"ui_kits/website/app.jsx":"1b31525c2452","ui_kits/website/sections.jsx":"8dc0251b4eea","ui_kits/website/ui.jsx":"ddca47e3722b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.GOKDesignSystem_59dcde = window.GOKDesignSystem_59dcde || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/website/app.jsx
try { (() => {
// GOK Website UI kit — app shell, wires sections + interactivity.
const {
  useRef,
  useState: useState_
} = React;
function App() {
  const [active, setActive] = useState_("בית");
  const verifyRef = useRef(null);
  const scrollToVerify = () => verifyRef.current && window.scrollTo({
    top: verifyRef.current.offsetTop - 60,
    behavior: "smooth"
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Header, {
    active: active,
    onNav: setActive
  }), /*#__PURE__*/React.createElement(Hero, {
    onVerify: scrollToVerify
  }), /*#__PURE__*/React.createElement(Trust, null), /*#__PURE__*/React.createElement(Process, null), /*#__PURE__*/React.createElement(Verify, {
    refEl: verifyRef
  }), /*#__PURE__*/React.createElement(Directory, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
// GOK Website UI kit — page sections. Uses atoms from ui.jsx (on window).
const {
  useState: useS
} = React;
function Header({
  active = "בית",
  onNav
}) {
  const items = ["בית", "הסמכה", "מאגר מוצרים", "אודות", "צור קשר"];
  return /*#__PURE__*/React.createElement("header", {
    className: "hdr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap hdr-in"
  }, /*#__PURE__*/React.createElement("a", {
    className: "brand",
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav && onNav("בית");
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "darkgreen",
    style: {
      height: 42
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "brand-name"
  }, /*#__PURE__*/React.createElement("b", null, "GOK"), /*#__PURE__*/React.createElement("span", null, "\u05D0\u05E8\u05D2\u05D5\u05DF \u05D4\u05DB\u05E9\u05E8\u05D5\u05EA \u05D4\u05E2\u05D5\u05DC\u05DE\u05D9"))), /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    className: it === active ? "active" : "",
    onClick: e => {
      e.preventDefault();
      onNav && onNav(it);
    }
  }, it))), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    sm: true,
    icon: Icons.arrow
  }, "\u05D1\u05E7\u05E9\u05EA \u05D4\u05E1\u05DE\u05DB\u05D4")));
}
function Hero({
  onVerify
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-lozenge"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-lozenge two"
  }), /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-in"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    onDark: true
  }, "\u05D4\u05E1\u05DE\u05DB\u05D4 \u05D0\u05D5\u05E8\u05EA\u05D5\u05D3\u05D5\u05E7\u05E1\u05D9\u05EA \xB7 \u05DE\u05D0\u05D6 1962"), /*#__PURE__*/React.createElement("h1", null, "\u05DB\u05E9\u05E8\u05D5\u05EA \u05E2\u05D5\u05DC\u05DE\u05D9\u05EA,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "\u05D1\u05EA\u05E7\u05DF \u05D0\u05D7\u05D3.")), /*#__PURE__*/React.createElement("p", null, "GOK \u05DE\u05E2\u05E0\u05D9\u05E7 \u05D4\u05E1\u05DE\u05DB\u05EA \u05DB\u05E9\u05E8\u05D5\u05EA \u05D0\u05D5\u05E8\u05EA\u05D5\u05D3\u05D5\u05E7\u05E1\u05D9\u05EA \u05DC\u05DE\u05E4\u05E2\u05DC\u05D9\u05DD, \u05DE\u05E1\u05E2\u05D3\u05D5\u05EA \u05D5\u05D9\u05D1\u05D5\u05D0\u05E0\u05D9\u05DD \u2014 \u05D1\u05E4\u05D9\u05E7\u05D5\u05D7 \u05E8\u05D1\u05E0\u05D9 \u05E7\u05E4\u05D3\u05E0\u05D9, \u05D1\u05DB\u05DC \u05D9\u05D1\u05E9\u05EA, \u05EA\u05D7\u05EA \u05EA\u05E7\u05DF \u05D0\u05D7\u05D9\u05D3 \u05D5\u05E9\u05E7\u05D5\u05E3."), /*#__PURE__*/React.createElement("div", {
    className: "hero-cta"
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "lime",
    icon: Icons.arrow
  }, "\u05D4\u05EA\u05D7\u05D9\u05DC\u05D5 \u05EA\u05D4\u05DC\u05D9\u05DA \u05D4\u05E1\u05DE\u05DB\u05D4"), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost-light",
    onClick: onVerify,
    icon: Icons.shield
  }, "\u05D0\u05D9\u05DE\u05D5\u05EA \u05EA\u05E2\u05D5\u05D3\u05D4"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-seal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ring"
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    style: {
      width: 228
    }
  })), /*#__PURE__*/React.createElement(Sparkle, {
    tone: "lime",
    className: "hero-spk",
    style: {
      top: 24,
      right: 36
    }
  }), /*#__PURE__*/React.createElement(Sparkle, {
    tone: "lime",
    className: "hero-spk",
    style: {
      bottom: 30,
      left: 18,
      width: 30,
      height: 30,
      opacity: .7
    }
  })))));
}
function Trust() {
  const stats = [["12,400+", "מוצרים מאושרים"], ["38", "מדינות בפיקוח"], ["540", "משגיחים בשטח"], ["1962", "שנת ייסוד"]];
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trust"
  }, /*#__PURE__*/React.createElement("div", {
    className: "trust-in"
  }, stats.map(([b, s]) => /*#__PURE__*/React.createElement("div", {
    className: "stat",
    key: s
  }, /*#__PURE__*/React.createElement("b", null, b), /*#__PURE__*/React.createElement("span", null, s))))));
}
function Process() {
  const steps = [["01", "בקשת הסמכה", "מילוי טופס מקוון עם פרטי המפעל, המוצרים והרכיבים.", Icons.leaf], ["02", "ביקורת באתר", "משגיח GOK מבקר במתקן, בודק תהליכי ייצור ומקורות אספקה.", Icons.search], ["03", "בדיקת רכיבים", "מעבדה ורבנות בוחנים כל רכיב מול מאגר התקנים העולמי.", Icons.shield], ["04", "אישור ותעודה", "הנפקת תעודת כשרות דיגיטלית עם קוד אימות ייחודי.", Icons.award]];
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u05EA\u05D4\u05DC\u05D9\u05DA \u05D4\u05D4\u05E1\u05DE\u05DB\u05D4"), /*#__PURE__*/React.createElement("h2", null, "\u05D0\u05E8\u05D1\u05E2\u05D4 \u05E6\u05E2\u05D3\u05D9\u05DD \u05DE\u05D1\u05E7\u05E9\u05D4 \u05DC\u05EA\u05E2\u05D5\u05D3\u05D4."), /*#__PURE__*/React.createElement("p", null, "\u05EA\u05D4\u05DC\u05D9\u05DA \u05D1\u05E8\u05D5\u05E8, \u05DE\u05EA\u05D5\u05E2\u05D3 \u05D5\u05E9\u05E7\u05D5\u05E3 \u2014 \u05DB\u05D3\u05D9 \u05E9\u05EA\u05D3\u05E2\u05D5 \u05D1\u05D3\u05D9\u05D5\u05E7 \u05D4\u05D9\u05DB\u05DF \u05E2\u05D5\u05DE\u05D3\u05EA \u05D4\u05D1\u05E7\u05E9\u05D4 \u05E9\u05DC\u05DB\u05DD \u05D1\u05DB\u05DC \u05E8\u05D2\u05E2.")), /*#__PURE__*/React.createElement("div", {
    className: "steps"
  }, steps.map(([n, h, p, ic]) => /*#__PURE__*/React.createElement("div", {
    className: "step",
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    className: "step-n"
  }, n), /*#__PURE__*/React.createElement("h3", null, h), /*#__PURE__*/React.createElement("p", null, p))))));
}

// ---- interactive certificate verifier ----
const CERTS = {
  "GOK-4821": {
    name: "מאפיית הזיתים",
    cat: "מאפייה · ירושלים",
    status: "פרווה",
    valid: "בתוקף עד 09/2026"
  },
  "GOK-1190": {
    name: "טעמי הגליל בע״מ",
    cat: "יבואן · קריית שמונה",
    status: "חלבי",
    valid: "בתוקף עד 03/2026"
  },
  "GOK-7755": {
    name: "מסעדת הרימון",
    cat: "מסעדה · תל אביב",
    status: "בשרי",
    valid: "בתוקף עד 12/2025"
  }
};
function Verify({
  refEl
}) {
  const [val, setVal] = useS("");
  const [res, setRes] = useS(null);
  const check = () => {
    const key = val.trim().toUpperCase();
    if (!key) return setRes(null);
    const hit = CERTS[key];
    setRes(hit ? {
      ok: true,
      ...hit
    } : {
      ok: false
    });
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    ref: refEl
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "verify"
  }, /*#__PURE__*/React.createElement("div", {
    className: "verify-dots"
  }), /*#__PURE__*/React.createElement("div", {
    className: "verify-in"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
    onDark: true,
    tone: "lime"
  }, "\u05D0\u05DE\u05D9\u05E0\u05D5\u05EA \u05DE\u05DC\u05D0\u05D4"), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 12
    }
  }, "\u05D0\u05D9\u05DE\u05D5\u05EA \u05EA\u05E2\u05D5\u05D3\u05EA \u05DB\u05E9\u05E8\u05D5\u05EA."), /*#__PURE__*/React.createElement("p", null, "\u05DB\u05DC \u05EA\u05E2\u05D5\u05D3\u05D4 \u05E0\u05D5\u05E9\u05D0\u05EA \u05E7\u05D5\u05D3 \u05D9\u05D9\u05D7\u05D5\u05D3\u05D9. \u05D4\u05D6\u05D9\u05E0\u05D5 \u05D0\u05D5\u05EA\u05D5 \u05DB\u05D3\u05D9 \u05DC\u05D5\u05D5\u05D3\u05D0 \u05E9\u05D4\u05DE\u05D5\u05E6\u05E8 \u05DE\u05D5\u05E1\u05DE\u05DA, \u05D0\u05EA \u05E1\u05D5\u05D2 \u05D4\u05DB\u05E9\u05E8\u05D5\u05EA \u05D5\u05D0\u05EA \u05EA\u05D5\u05E7\u05E3 \u05D4\u05D0\u05D9\u05E9\u05D5\u05E8 \u2014 \u05D1\u05D6\u05DE\u05DF \u05D0\u05DE\u05EA.")), /*#__PURE__*/React.createElement("div", {
    className: "verify-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "verify-field"
  }, /*#__PURE__*/React.createElement("input", {
    value: val,
    placeholder: "\u05DE\u05E1\u05E4\u05E8 \u05EA\u05E2\u05D5\u05D3\u05D4 (\u05DC\u05D3\u05D5\u05D2\u05DE\u05D4 GOK-4821)",
    onChange: e => setVal(e.target.value),
    onKeyDown: e => e.key === "Enter" && check()
  }), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    onClick: check,
    icon: Icons.search
  })), res && res.ok && /*#__PURE__*/React.createElement("div", {
    className: "verify-result ok"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vi"
  }, Icons.check), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, res.name, " \u2014 \u05DE\u05D0\u05D5\u05E9\u05E8 \u2713"), /*#__PURE__*/React.createElement("small", null, res.cat, " \xB7 \u05DB\u05E9\u05E8\u05D5\u05EA ", res.status, " \xB7 ", res.valid))), res && !res.ok && /*#__PURE__*/React.createElement("div", {
    className: "verify-result bad"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vi"
  }, Icons.x), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D4 \u05EA\u05E2\u05D5\u05D3\u05D4"), /*#__PURE__*/React.createElement("small", null, "\u05D1\u05D3\u05E7\u05D5 \u05D0\u05EA \u05D4\u05DE\u05E1\u05E4\u05E8 \u05D5\u05E0\u05E1\u05D5 \u05E9\u05D5\u05D1, \u05D0\u05D5 \u05E4\u05E0\u05D5 \u05D0\u05DC\u05D9\u05E0\u05D5."))), /*#__PURE__*/React.createElement("div", {
    className: "verify-hint"
  }, "\u05E0\u05E1\u05D5: GOK-4821 \xB7 GOK-1190 \xB7 GOK-7755"))))));
}
function Directory() {
  const cats = ["מאפיות", "מסעדות", "יבואנים", "בתי מלון"];
  const [active, setActive] = useS("מאפיות");
  const data = {
    "מאפיות": [["ז", "מאפיית הזיתים", "ירושלים", ["פרווה", "מהדרין"]], ["ל", "לחם הארץ", "חיפה", ["פרווה"]], ["א", "אפיית בוקר", "באר שבע", ["חלבי", "מהדרין"]]],
    "מסעדות": [["ר", "מסעדת הרימון", "תל אביב", ["בשרי", "גלאט"]], ["ה", "השולחן הירוק", "הרצליה", ["חלבי"]], ["צ", "צמחים", "רעננה", ["פרווה", "טבעוני"]]],
    "יבואנים": [["ט", "טעמי הגליל בע״מ", "קריית שמונה", ["חלבי"]], ["ג", "גלובל פוד", "אשדוד", ["פרווה"]], ["מ", "מטעמי הים", "אילת", ["בשרי"]]],
    "בתי מלון": [["כ", "מלון כרמל", "חיפה", ["בשרי", "מהדרין"]], ["ש", "שער הזהב", "ירושלים", ["חלבי", "גלאט"]], ["נ", "נווה ים", "נתניה", ["פרווה"]]]
  };
  return /*#__PURE__*/React.createElement("section", {
    className: "section",
    style: {
      background: "var(--gok-mist-2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-head"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "\u05DE\u05D0\u05D2\u05E8 \u05DE\u05D5\u05E1\u05DE\u05DB\u05D9\u05DD"), /*#__PURE__*/React.createElement("h2", null, "\u05D0\u05DC\u05E4\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD \u05DE\u05D5\u05E1\u05DE\u05DB\u05D9\u05DD, \u05D2\u05DC\u05D5\u05D9\u05D9\u05DD \u05DC\u05DB\u05D5\u05DC\u05DD."), /*#__PURE__*/React.createElement("p", null, "\u05DE\u05D0\u05D2\u05E8 \u05E4\u05EA\u05D5\u05D7 \u05E9\u05DC \u05DB\u05DC \u05D1\u05E2\u05DC\u05D9 \u05EA\u05E2\u05D5\u05D3\u05EA GOK \u05D1\u05EA\u05D5\u05E7\u05E3 \u2014 \u05DE\u05E1\u05D5\u05E0\u05DF \u05DC\u05E4\u05D9 \u05E7\u05D8\u05D2\u05D5\u05E8\u05D9\u05D4 \u05D5\u05E1\u05D5\u05D2 \u05DB\u05E9\u05E8\u05D5\u05EA.")), /*#__PURE__*/React.createElement("div", {
    className: "cat-tabs"
  }, cats.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    className: "cat-tab" + (c === active ? " active" : ""),
    onClick: () => setActive(c)
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "dir-grid"
  }, data[active].map(([l, name, city, tags]) => /*#__PURE__*/React.createElement("div", {
    className: "dir-card",
    key: name
  }, /*#__PURE__*/React.createElement("div", {
    className: "dir-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dir-logo"
  }, l), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, name), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, city))), /*#__PURE__*/React.createElement("div", {
    className: "dir-tags"
  }, tags.map((t, i) => /*#__PURE__*/React.createElement("span", {
    className: "tag" + (i === 0 ? " lime" : ""),
    key: t
  }, /*#__PURE__*/React.createElement(Sparkle, {
    tone: "green",
    style: {
      width: 11,
      height: 11
    }
  }), t))))))));
}
function CTA() {
  return /*#__PURE__*/React.createElement("section", {
    className: "section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cta"
  }, /*#__PURE__*/React.createElement(Sparkle, {
    tone: "green",
    className: "cta-spk",
    style: {
      width: 80,
      top: 30,
      right: 60
    }
  }), /*#__PURE__*/React.createElement(Sparkle, {
    tone: "green",
    className: "cta-spk",
    style: {
      width: 50,
      bottom: 36,
      left: 90
    }
  }), /*#__PURE__*/React.createElement("h2", null, "\u05DE\u05D5\u05DB\u05E0\u05D9\u05DD \u05DC\u05D4\u05E1\u05DE\u05D9\u05DA \u05D0\u05EA \u05D4\u05DE\u05D5\u05E6\u05E8 \u05E9\u05DC\u05DB\u05DD?"), /*#__PURE__*/React.createElement("p", null, "\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5 \u05DC\u05D0\u05DC\u05E4\u05D9 \u05E2\u05E1\u05E7\u05D9\u05DD \u05E9\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD \u05D0\u05EA \u05D7\u05D5\u05EA\u05DD GOK \u05D1\u05E8\u05D7\u05D1\u05D9 \u05D4\u05E2\u05D5\u05DC\u05DD."), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: Icons.arrow
  }, "\u05D4\u05EA\u05D7\u05D9\u05DC\u05D5 \u05D0\u05EA \u05D4\u05EA\u05D4\u05DC\u05D9\u05DA"))));
}
function Footer() {
  const cols = [["הסמכה", ["תהליך ההסמכה", "סוגי כשרות", "תעריפים", "שאלות נפוצות"]], ["מאגר", ["חיפוש מוסמכים", "אימות תעודה", "כשרות בינלאומית"]], ["GOK", ["אודות הארגון", "צוות רבני", "צור קשר", "קריירה"]]];
  return /*#__PURE__*/React.createElement("footer", {
    className: "ftr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ftr-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ftr-brand"
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "white",
    style: {
      height: 46
    }
  }), /*#__PURE__*/React.createElement("p", null, "\u05D0\u05E8\u05D2\u05D5\u05DF \u05D4\u05DB\u05E9\u05E8\u05D5\u05EA \u05D4\u05E2\u05D5\u05DC\u05DE\u05D9 \u2014 \u05D4\u05E1\u05DE\u05DB\u05EA \u05DB\u05E9\u05E8\u05D5\u05EA \u05D0\u05D5\u05E8\u05EA\u05D5\u05D3\u05D5\u05E7\u05E1\u05D9\u05EA \u05D1\u05EA\u05E7\u05DF \u05D0\u05D7\u05D9\u05D3, \u05D1\u05E4\u05D9\u05E7\u05D5\u05D7 \u05E8\u05D1\u05E0\u05D9, \u05DE\u05D0\u05D6 1962.")), cols.map(([h, links]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("h5", null, h), /*#__PURE__*/React.createElement("ul", null, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    className: "ftr-bottom"
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 GOK \xB7 Global Orthodox Kosher"), /*#__PURE__*/React.createElement("span", null, "\u05EA\u05E7\u05E0\u05D5\u05DF \xB7 \u05E4\u05E8\u05D8\u05D9\u05D5\u05EA"))));
}
Object.assign(window, {
  Header,
  Hero,
  Trust,
  Process,
  Verify,
  Directory,
  CTA,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ui.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// GOK Website UI kit — shared atoms. Exposed on window for cross-file use.
const {
  useState
} = React;
const ASSETS = "../../assets";

// Lucide-style line icons (rounded joins, ~2px) — substitution for the file's line-icon set.
const Icon = ({
  d,
  paths,
  size = 19,
  stroke = 2
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  width: size,
  height: size,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, paths ? paths.map((p, i) => /*#__PURE__*/React.createElement("path", {
  key: i,
  d: p
})) : /*#__PURE__*/React.createElement("path", {
  d: d
}));
const Icons = {
  arrow: /*#__PURE__*/React.createElement(Icon, {
    d: "M5 12h14M13 6l6 6-6 6"
  }),
  // RTL "forward" points right visually; used for CTAs
  arrowL: /*#__PURE__*/React.createElement(Icon, {
    d: "M19 12H5M11 6l-6 6 6 6"
  }),
  check: /*#__PURE__*/React.createElement(Icon, {
    d: "M20 6 9 17l-5-5"
  }),
  x: /*#__PURE__*/React.createElement(Icon, {
    d: "M18 6 6 18M6 6l12 12"
  }),
  search: /*#__PURE__*/React.createElement(Icon, {
    paths: ["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "m21 21-4.3-4.3"]
  }),
  shield: /*#__PURE__*/React.createElement(Icon, {
    paths: ["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "m9 12 2 2 4-4"]
  }),
  globe: /*#__PURE__*/React.createElement(Icon, {
    paths: ["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M2 12h20", "M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20Z"]
  }),
  leaf: /*#__PURE__*/React.createElement(Icon, {
    paths: ["M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 9-4 16-9 16Z", "M4 20c4-5 7-7 11-8"]
  }),
  award: /*#__PURE__*/React.createElement(Icon, {
    paths: ["M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z", "m9 14-1.5 7L12 19l4.5 2L15 14"]
  })
};
const Sparkle = ({
  tone = "green",
  className = "",
  style
}) => /*#__PURE__*/React.createElement("img", {
  src: `${ASSETS}/sparkle-${tone}.svg`,
  className: className,
  style: style,
  alt: ""
});
const Logo = ({
  variant = "white",
  style
}) => /*#__PURE__*/React.createElement("img", {
  src: `${ASSETS}/logo-mono-${variant}.svg`,
  style: style,
  alt: "GOK \u2014 Global Orthodox Kosher"
});
const Eyebrow = ({
  children,
  onDark,
  tone = "green"
}) => /*#__PURE__*/React.createElement("div", {
  className: "eyebrow" + (onDark ? " on-dark" : "")
}, /*#__PURE__*/React.createElement(Sparkle, {
  tone: tone,
  className: "spk"
}), " ", children);
const Button = ({
  kind = "primary",
  sm,
  children,
  icon,
  ...p
}) => /*#__PURE__*/React.createElement("button", _extends({
  className: `btn btn-${kind}${sm ? " btn-sm" : ""}`
}, p), children, icon);
Object.assign(window, {
  Icon,
  Icons,
  Sparkle,
  Logo,
  Eyebrow,
  Button,
  ASSETS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ui.jsx", error: String((e && e.message) || e) }); }

})();
