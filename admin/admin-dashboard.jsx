// GOK Admin — Dashboard (overview) + Analytics views.
const { useState: useDashState } = React;

const KPI_ICONS = { search: Icons.search, alert: AdminIcons.alert, chat: Icons.chat, award: Icons.award };
const KOSHER_HEX = { milk: "#3F6FB5", meat: "#A23B3B", pareve: "#1F8A5B", passover: "#5B33B0" };

function KpiCard({ kpi }) {
  const isPct = kpi.id === "searches" || kpi.id === "noresult";
  const good = kpi.good === "down" ? kpi.delta < 0 : kpi.delta > 0;
  const arrow = kpi.delta >= 0 ? AdminIcons.up : AdminIcons.down;
  return (
    <div className="kpi">
      <div className="kpi-top">
        <span className="kpi-ic">{KPI_ICONS[kpi.icon]}</span>
        <span className={"kpi-delta " + (good ? "pos" : "neg")}>{arrow}{Math.abs(kpi.delta)}{isPct ? "%" : ""}</span>
      </div>
      <div className="kpi-val">{kpi.value}</div>
      <div className="kpi-label">{kpi.label}</div>
    </div>
  );
}

function Card({ title, sub, action, children, className = "" }) {
  return (
    <section className={"card " + className}>
      {(title || action) && (
        <div className="card-head">
          <div><h3>{title}</h3>{sub && <p>{sub}</p>}</div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

const ACTIVITY_TONE = { qa: "#2A6FDB", answer: "#1F8A5B", gap: "#BE914D", article: "#5B33B0", lead: "#234F47" };
function ActivityFeed({ items }) {
  return (
    <ul className="activity">
      {items.map((a, i) => (
        <li className="act-row" key={i}>
          <span className="act-dot" style={{ background: ACTIVITY_TONE[a.type] }}></span>
          <div className="act-body">
            <p><b>{a.who}</b> {a.what}</p>
            <span className="act-when">{a.when}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

// ── Dashboard (overview) ──────────────────────────────────────────────
function DashboardPage({ onNav }) {
  const A = ANALYTICS;
  const pending = QA_ITEMS.filter((x) => x.status === "pending");
  const kosherSeg = A.kosherSplit.map((s) => ({ label: s.label, pct: s.pct, color: KOSHER_HEX[s.key] }));
  return (
    <div className="page">
      <div className="kpi-row">
        {A.kpis.map((k) => <KpiCard key={k.id} kpi={k} />)}
      </div>

      <div className="grid-2-1">
        <Card title="חיפושים במאגר ZeKasher" sub="12 החודשים האחרונים (באלפים)"
          action={<span className="chip-soft">{AdminIcons.up}12.4% מול חודש קודם</span>}>
          <AreaChart data={A.searchesTrend} />
        </Card>
        <Card title="פילוח לפי סוג כשרות" sub="מתוך כלל החיפושים">
          <Donut segments={kosherSeg} centerLabel="48K" centerSub="חיפושים" />
        </Card>
      </div>

      <div className="grid-2-1">
        <Card title="שאלות ממתינות למענה" sub={pending.length + " שאלות בתור"}
          action={<button className="card-link" onClick={() => onNav("qa")}>לכל השאלות {Icons.arrowL}</button>}>
          <ul className="mini-qa">
            {pending.map((q) => (
              <li key={q.id} className="mini-qa-row" onClick={() => onNav("qa", { id: q.id })}>
                <span className="mini-qa-cat" style={{ background: qaCat(q.cat).tone }}></span>
                <span className="mini-qa-q">{q.q}</span>
                <span className="mini-qa-meta">{q.date}</span>
                <span className="mini-qa-go">{Icons.arrowL}</span>
              </li>
            ))}
            {pending.length === 0 && <li className="mini-empty">אין שאלות ממתינות 🎉</li>}
          </ul>
        </Card>
        <Card title="פעילות אחרונה">
          <ActivityFeed items={A.activity} />
        </Card>
      </div>
    </div>
  );
}

// ── Analytics (deeper) ────────────────────────────────────────────────
function AnalyticsPage() {
  const A = ANALYTICS;
  const [range, setRange] = useDashState("12m");
  const kosherSeg = A.kosherSplit.map((s) => ({ label: s.label, pct: s.pct, color: KOSHER_HEX[s.key] }));
  return (
    <div className="page">
      <div className="seg-row">
        <div className="seg-pills">
          {[["30d", "30 יום"], ["12m", "12 חודשים"], ["all", "מאז ההשקה"]].map(([v, l]) => (
            <button key={v} className={range === v ? "on" : ""} onClick={() => setRange(v)}>{l}</button>
          ))}
        </div>
        <button className="btn-ghost-ic">{AdminIcons.cal} ייצוא דו״ח</button>
      </div>

      <div className="kpi-row">
        {A.kpis.map((k) => <KpiCard key={k.id} kpi={k} />)}
      </div>

      <Card title="נפח חיפושים לאורך זמן" sub="מספר החיפושים במאגר ZeKasher (באלפים)">
        <AreaChart data={A.searchesTrend} height={260} />
      </Card>

      <div className="grid-2">
        <Card title="המוצרים המבוקשים ביותר" sub="לפי מספר חיפושים החודש">
          <BarList data={A.topSearched} />
        </Card>
        <Card title="פערים במאגר" sub="חיפושים נפוצים שלא הניבו תוצאה — הזדמנויות להוספת מוצרים"
          action={<span className="chip-warn">{AdminIcons.alert}לטיפול</span>}>
          <BarList data={A.gaps} soft />
        </Card>
      </div>

      <div className="grid-1-1">
        <Card title="פילוח גאוגרפי" sub="חיפושים לפי מדינת המשתמש">
          <div className="geo-list">
            {A.countries.map((c) => (
              <div className="geo-row" key={c.code}>
                <span className="geo-flag">{c.flag}</span>
                <span className="geo-label">{c.label}</span>
                <div className="geo-track"><div className="geo-fill" style={{ width: c.pct + "%" }}></div></div>
                <span className="geo-pct">{c.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
        <Card title="פילוח לפי סוג כשרות" sub="מתוך כלל החיפושים">
          <Donut segments={kosherSeg} centerLabel="48K" centerSub="חיפושים" />
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardPage, AnalyticsPage, KpiCard, Card, KOSHER_HEX });
