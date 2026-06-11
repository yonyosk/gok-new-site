// GOK site — shared atoms. Exposed on window for cross-file use.
const ASSETS = "assets";

const Icon = ({ d, paths, size = 19, stroke = 2, style }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" style={style}
       stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {paths ? paths.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);
const Icons = {
  arrow: <Icon d="M5 12h14M13 6l6 6-6 6" />,
  arrowL: <Icon d="M19 12H5M11 6l-6 6 6 6" />,
  chevD: <Icon d="m6 9 6 6 6-6" />,
  chevL: <Icon d="m15 18-6-6 6-6" />,
  chevR: <Icon d="m9 18 6-6-6-6" />,
  check: <Icon d="M20 6 9 17l-5-5" />,
  x: <Icon d="M18 6 6 18M6 6l12 12" />,
  search: <Icon paths={["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "m21 21-4.3-4.3"]} />,
  shield: <Icon paths={["M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z", "m9 12 2 2 4-4"]} />,
  globe: <Icon paths={["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M2 12h20", "M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20Z"]} />,
  leaf: <Icon paths={["M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 9-4 16-9 16Z", "M4 20c4-5 7-7 11-8"]} />,
  award: <Icon paths={["M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z", "m9 14-1.5 7L12 19l4.5 2L15 14"]} />,
  menu: <Icon paths={["M3 6h18", "M3 12h18", "M3 18h18"]} />,
  filter: <Icon paths={["M22 3H2l8 9.5V19l4 2v-8.5L22 3Z"]} />,
  scan: <Icon paths={["M3 7V5a2 2 0 0 1 2-2h2", "M17 3h2a2 2 0 0 1 2 2v2", "M21 17v2a2 2 0 0 1-2 2h-2", "M7 21H5a2 2 0 0 1-2-2v-2", "M7 8v8M11 8v8M15 8v8M17 8v8"]} stroke={1.6} />,
  heart: <Icon d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5C2 13 12 21 12 21s4-3.2 7-7Z" />,
  star: <Icon d="m12 3 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 18.8 6.2 21l1.1-6.5L2.6 9.8l6.5-.9L12 3Z" />,
  info: <Icon paths={["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 16v-4", "M12 8h.01"]} />,
  map: <Icon paths={["M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z", "M9 4v14", "M15 6v14"]} />,
  book: <Icon paths={["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"]} />,
  chat: <Icon d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z" />,
  clock: <Icon paths={["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 6v6l4 2"]} />,
  share: <Icon paths={["M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5"]} />,
  heartHand: <Icon paths={["M11 14h2a2 2 0 1 0 0-4h-3l-3.4 3.4", "M2 13l4 4", "M18 12c1-1 2-2.2 2-3.6A2.4 2.4 0 0 0 16 7a2.4 2.4 0 0 0-4 1.4"]} stroke={1.7} />,
  send: <Icon paths={["M22 2 11 13", "M22 2 15 22l-4-9-9-4 20-7Z"]} />,
  user: <Icon paths={["M20 21a8 8 0 1 0-16 0", "M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"]} />,
  logout: <Icon paths={["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"]} />,
  camera: <Icon paths={["M14.5 4h-5L8 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-1.5-2Z", "M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"]} stroke={1.7} />,
  barcode: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect x="2" y="4" width="2" height="16"/><rect x="5.5" y="4" width="1" height="16"/><rect x="7.5" y="4" width="2.5" height="16"/><rect x="11" y="4" width="1" height="16"/><rect x="13.5" y="4" width="2" height="16"/><rect x="16.5" y="4" width="1" height="16"/><rect x="18.5" y="4" width="1.5" height="16"/><rect x="21" y="4" width="1" height="16"/></svg>,
  lock: <Icon paths={["M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z", "M8 11V7a4 4 0 0 1 8 0v4"]} />,
  whatsapp: <Icon paths={["M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z", "M8.5 8.8c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.5l-.4.5c-.2.2-.2.3-.1.5.3.6.9 1.3 1.6 1.7.2.1.4.1.5-.1l.5-.5c.1-.2.3-.2.5-.1l1.5.7c.3.1.4.3.4.5 0 .6-.4 1.2-1 1.3-.6.1-1.2.1-2.6-.5-1.7-.7-2.9-2.3-3-2.5-.1-.2-.8-1.1-.8-2.1 0-1 .5-1.5.7-1.7Z"]} stroke={1.6} />,
};

const Sparkle = ({ tone = "green", className = "", style }) =>
  <img src={`${ASSETS}/sparkle-${tone}.svg`} className={className} style={style} alt="" />;

const Logo = ({ variant = "white", style, className }) =>
  <img src={`${ASSETS}/logo-mono-${variant}.svg`} style={style} className={className}
       alt="GOK — Global Orthodox Kosher" />;

const Eyebrow = ({ children, onDark, tone = "green" }) => (
  <div className={"eyebrow" + (onDark ? " on-dark" : "")}>
    <Sparkle tone={onDark ? "lime" : tone} className="spk" /> {children}
  </div>
);

const Button = ({ kind = "primary", sm, lg, children, icon, iconR, className = "", ...p }) => (
  <button className={`btn btn-${kind}${sm ? " btn-sm" : ""}${lg ? " btn-lg" : ""} ${className}`} {...p}>
    {iconR}{children}{icon}
  </button>
);

// kosher-type badge (חלבי / בשרי / פרווה / לפסח) — color-coded pill
const KOSHER_TONE = {
  milk: { bg: "#E7F0FB", fg: "#1F5FB0" },
  meat: { bg: "#FBE8E8", fg: "#A62122" },
  pareve: { bg: "var(--gok-lime-soft)", fg: "var(--gok-green-700)" },
  passover: { bg: "#F0EAFB", fg: "#5B33B0" },
};
const KosherBadge = ({ type, label }) => {
  const tone = KOSHER_TONE[type] || KOSHER_TONE.pareve;
  return <span className="kbadge" style={{ background: tone.bg, color: tone.fg }}>{label}</span>;
};

Object.assign(window, { Icon, Icons, Sparkle, Logo, Eyebrow, Button, KosherBadge, KOSHER_TONE, ASSETS });
