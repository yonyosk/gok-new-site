// GOK Admin — shell: extra icons, login screen, sidebar, topbar, layout.
// Reuses atoms.jsx (Icon, Icons, Logo, Sparkle, Button) loaded before this file.
const { useState: useShellState } = React;

// ── admin-specific icons (built on the shared <Icon>) ─────────────────
const AdminIcons = {
  grid: <Icon paths={["M3 3h7v7H3z", "M14 3h7v7h-7z", "M14 14h7v7h-7z", "M3 14h7v7H3z"]} stroke={1.8} />,
  bars: <Icon paths={["M3 3v18h18", "M8 17v-5", "M13 17V8", "M18 17v-9"]} />,
  qa: <Icon paths={["M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z", "M9.5 9a2.5 2.5 0 0 1 3.7 2.1c0 1.5-2.2 2-2.2 2", "M11 16h.01"]} stroke={1.8} />,
  file: <Icon paths={["M14 3v5h5", "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5Z", "M9 13h6", "M9 17h4"]} stroke={1.8} />,
  bell: <Icon paths={["M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9", "M13.7 21a2 2 0 0 1-3.4 0"]} />,
  plus: <Icon paths={["M12 5v14", "M5 12h14"]} />,
  pencil: <Icon paths={["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"]} />,
  trash: <Icon paths={["M3 6h18", "M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2", "M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6", "M10 11v6", "M14 11v6"]} stroke={1.7} />,
  eye: <Icon paths={["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"]} />,
  alert: <Icon paths={["M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z", "M12 9v4", "M12 17h.01"]} stroke={1.7} />,
  up: <Icon paths={["M7 14l5-5 5 5"]} stroke={2.4} />,
  down: <Icon paths={["M7 10l5 5 5-5"]} stroke={2.4} />,
  logout: <Icon paths={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />,
  user: <Icon paths={["M20 21a8 8 0 1 0-16 0", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"]} />,
  dots: <Icon paths={["M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z", "M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z", "M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"]} stroke={2.2} />,
  cal: <Icon paths={["M3 5h18v16H3z", "M3 9h18", "M8 3v4", "M16 3v4"]} stroke={1.7} />,
  image: <Icon paths={["M3 5h18v14H3z", "M3 16l5-5 4 4 3-3 6 6", "M9 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"]} stroke={1.7} />,
  bold: <Icon paths={["M6 4h7a4 4 0 0 1 0 8H6z", "M6 12h8a4 4 0 0 1 0 8H6z"]} stroke={1.8} />,
  italic: <Icon paths={["M19 4h-9", "M14 20H5", "M15 4 9 20"]} />,
  h1: <Icon paths={["M4 6v12", "M12 6v12", "M4 12h8", "M17 10l3-1.5V18"]} stroke={1.9} />,
  list: <Icon paths={["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"]} />,
  quote: <Icon paths={["M7 7H4a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v3a3 3 0 0 1-3 3", "M18 7h-3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v3a3 3 0 0 1-3 3"]} stroke={1.6} />,
  link: <Icon paths={["M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1", "M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1"]} stroke={1.7} />,
  settings: <Icon paths={["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 6.7 19l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 5 13.6H5a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 6.7 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H11a1.6 1.6 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"]} stroke={1.5} />,
  box: <Icon paths={["M21 8 12 3 3 8v8l9 5 9-5V8Z", "M3 8l9 5 9-5", "M12 13v8"]} stroke={1.6} />,
  reply: <Icon paths={["M9 17l-5-5 5-5", "M4 12h11a5 5 0 0 1 5 5v2"]} />,
};

const NAV = [
  { id: "dashboard", label: "סקירה", icon: AdminIcons.grid },
  { id: "qa", label: "ניהול שאלות ותשובות", icon: AdminIcons.qa },
  { id: "articles", label: "מאמרים ותוכן", icon: AdminIcons.file },
  { id: "analytics", label: "אנליטיקס", icon: AdminIcons.bars },
];

// ── Login ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useShellState("admin@kosher.global");
  const [pw, setPw] = useShellState("••••••••");
  return (
    <div className="login-stage">
      <div className="login-bg" aria-hidden="true">
        <span className="login-loz one"></span>
        <span className="login-loz two"></span>
        <span className="login-dots"></span>
      </div>
      <div className="login-card">
        <div className="login-seal"><Logo variant="darkgreen" /></div>
        <h1>מערכת הניהול</h1>
        <p className="login-sub">ארגון הכשרות העולמי · GOK</p>
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <label className="login-field">
            <span>דוא״ל</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" />
          </label>
          <label className="login-field">
            <span>סיסמה</span>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} dir="ltr" />
          </label>
          <div className="login-row">
            <label className="login-remember"><input type="checkbox" defaultChecked /> זכור אותי</label>
            <a href="#" onClick={(e) => e.preventDefault()}>שכחת סיסמה?</a>
          </div>
          <Button kind="primary" lg className="login-submit" icon={Icons.arrowL} type="submit">כניסה למערכת</Button>
        </form>
      </div>
      <div className="login-foot">
        <Sparkle tone="green" style={{ width: 14, height: 14 }} />
        <span>גישה מאובטחת · מנהלי מערכת ומשגיחים מורשים בלבד</span>
      </div>
    </div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────
function Sidebar({ route, onNav, open, onClose }) {
  const qPending = QA_ITEMS.filter((x) => x.status === "pending").length;
  return (
    <React.Fragment>
      <div className={"sb-scrim" + (open ? " open" : "")} onClick={onClose}></div>
      <aside className={"sidebar" + (open ? " open" : "")}>
        <div className="sb-brand">
          <Logo variant="white" />
          <div className="sb-brand-name"><b>GOK</b><span>מערכת ניהול</span></div>
        </div>
        <nav className="sb-nav">
          {NAV.map((n) => (
            <button key={n.id} className={"sb-item" + (route === n.id ? " on" : "")} onClick={() => onNav(n.id)}>
              <span className="sb-ic">{n.icon}</span>
              <span className="sb-label">{n.label}</span>
              {n.id === "qa" && qPending > 0 && <span className="sb-badge">{qPending}</span>}
            </button>
          ))}
        </nav>
        <div className="sb-foot">
          <button className="sb-item ghost"><span className="sb-ic">{AdminIcons.settings}</span><span className="sb-label">הגדרות</span></button>
          <div className="sb-user">
            <div className="sb-avatar">{ADMIN_USER.initials}</div>
            <div className="sb-user-info"><b>{ADMIN_USER.name}</b><span>{ADMIN_USER.role}</span></div>
          </div>
        </div>
      </aside>
    </React.Fragment>
  );
}

// ── Topbar ────────────────────────────────────────────────────────────
const PAGE_TITLES = {
  dashboard: ["סקירה כללית", "מבט-על על פעילות המערכת"],
  qa: ["ניהול שאלות ותשובות", "מענה, אישור ופרסום שאלות הלכתיות"],
  articles: ["מאמרים ותוכן", "ניהול, יצירה ועריכת מאמרי המדריך"],
  analytics: ["אנליטיקס", "נתוני שימוש, חיפושים ומגמות"],
};
function Topbar({ route, onMenu, onNav }) {
  const [title, sub] = PAGE_TITLES[route] || PAGE_TITLES.dashboard;
  return (
    <header className="topbar">
      <button className="tb-burger" onClick={onMenu} aria-label="תפריט">{Icons.menu}</button>
      <div className="tb-title">
        <h1>{title}</h1>
        <p>{sub}</p>
      </div>
      <div className="tb-search">
        {Icons.search}
        <input placeholder="חיפוש במערכת…" />
      </div>
      <button className="tb-icon" aria-label="התראות">{AdminIcons.bell}<span className="tb-dot"></span></button>
      <a className="tb-site" href="index.html" title="צפייה באתר">{Icons.globe}</a>
    </header>
  );
}

Object.assign(window, { AdminIcons, NAV, LoginScreen, Sidebar, Topbar, PAGE_TITLES });
