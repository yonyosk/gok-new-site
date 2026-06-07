// GOK Admin — lightweight, dependency-free chart components (brand-colored).
const { useState: useChartState } = React;

// ── Area / line chart ─────────────────────────────────────────────────
function AreaChart({ data, height = 220, accent = "var(--gok-green)", fill = "rgba(35,79,71,.10)" }) {
  const w = 760, h = height, padX = 8, padT = 16, padB = 28;
  const max = Math.max(...data.map((d) => d.v)) * 1.12;
  const min = 0;
  const innerW = w - padX * 2, innerH = h - padT - padB;
  const x = (i) => padX + (i / (data.length - 1)) * innerW;
  const y = (v) => padT + innerH - ((v - min) / (max - min)) * innerH;
  const pts = data.map((d, i) => [x(i), y(d.v)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  const area = line + ` L ${x(data.length - 1).toFixed(1)} ${(padT + innerH).toFixed(1)} L ${padX} ${(padT + innerH).toFixed(1)} Z`;
  const grid = [0, 0.25, 0.5, 0.75, 1].map((g) => padT + innerH * g);
  return (
    <svg className="area-chart" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img">
      {grid.map((gy, i) => <line key={i} x1={padX} x2={w - padX} y1={gy} y2={gy} stroke="var(--gok-line)" strokeWidth="1" strokeDasharray={i === grid.length - 1 ? "0" : "4 5"} />)}
      <path d={area} fill={fill} />
      <path d={line} fill="none" stroke={accent} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#fff" stroke={accent} strokeWidth="2.5" />)}
      {data.map((d, i) => <text key={i} x={x(i)} y={h - 8} textAnchor="middle" className="chart-xlabel">{d.m}</text>)}
    </svg>
  );
}

// ── Horizontal bar list ───────────────────────────────────────────────
function BarList({ data, accent = "var(--gok-green)", suffix = "", soft = false }) {
  const max = Math.max(...data.map((d) => d.v));
  return (
    <div className="barlist">
      {data.map((d) => (
        <div className="barlist-row" key={d.label}>
          <span className="barlist-label">{d.label}</span>
          <div className="barlist-track">
            <div className="barlist-fill" style={{ width: (d.v / max) * 100 + "%", background: soft ? "var(--gok-lime)" : accent }}></div>
          </div>
          <span className="barlist-val">{d.v.toLocaleString("he-IL")}{suffix}</span>
        </div>
      ))}
    </div>
  );
}

// ── Donut chart ───────────────────────────────────────────────────────
function Donut({ segments, size = 168, thickness = 26, centerLabel, centerSub }) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="donut-wrap">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="donut">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segments.map((s, i) => {
            const len = (s.pct / 100) * c;
            const dash = `${len} ${c - len}`;
            const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none"
              stroke={s.color} strokeWidth={thickness} strokeDasharray={dash}
              strokeDashoffset={-offset} strokeLinecap="butt" />;
            offset += len;
            return el;
          })}
        </g>
        {centerLabel && <text x="50%" y="47%" textAnchor="middle" className="donut-center">{centerLabel}</text>}
        {centerSub && <text x="50%" y="62%" textAnchor="middle" className="donut-sub">{centerSub}</text>}
      </svg>
      <div className="donut-legend">
        {segments.map((s) => (
          <div className="dl-row" key={s.label}>
            <span className="dl-dot" style={{ background: s.color }}></span>
            <span className="dl-label">{s.label}</span>
            <span className="dl-pct">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { AreaChart, BarList, Donut });
