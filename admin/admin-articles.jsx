// GOK Admin — Articles: list/manage + rich create/edit editor with live preview.
const { useState: useArtState, useRef: useArtRef } = React;

const KOSHER_LABELS = { milk: "חלבי", meat: "בשרי", pareve: "פרווה", passover: "לפסח" };
const ART_STATUS = { published: { label: "מפורסם", cls: "st-published" }, draft: { label: "טיוטה", cls: "st-pending" } };

// tiny markdown → HTML for the editor preview
function mdToHtml(src) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) => esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<em>$2</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  const lines = src.split("\n");
  let html = "", list = null;
  const closeList = () => { if (list) { html += "</ul>"; list = null; } };
  for (let ln of lines) {
    if (/^##\s+/.test(ln)) { closeList(); html += "<h2>" + inline(ln.replace(/^##\s+/, "")) + "</h2>"; }
    else if (/^>\s?/.test(ln)) { closeList(); html += "<blockquote>" + inline(ln.replace(/^>\s?/, "")) + "</blockquote>"; }
    else if (/^[-*]\s+/.test(ln)) { if (!list) { html += "<ul>"; list = true; } html += "<li>" + inline(ln.replace(/^[-*]\s+/, "")) + "</li>"; }
    else if (ln.trim() === "") { closeList(); }
    else { closeList(); html += "<p>" + inline(ln) + "</p>"; }
  }
  closeList();
  return html;
}

// ── List / manage ─────────────────────────────────────────────────────
function ArticlesPage({ onNav }) {
  const [items] = useArtState(() => ADMIN_ARTICLES.map((x) => ({ ...x })));
  const [status, setStatus] = useArtState("all");
  const [q, setQ] = useArtState("");
  const list = items.filter((a) =>
    (status === "all" || a.status === status) &&
    (!q || a.title.includes(q)));
  const counts = { all: items.length, published: items.filter((a) => a.status === "published").length, draft: items.filter((a) => a.status === "draft").length };
  return (
    <div className="page">
      <div className="art-toolbar">
        <div className="seg-pills">
          {[["all", "הכל"], ["published", "מפורסמים"], ["draft", "טיוטות"]].map(([v, l]) => (
            <button key={v} className={status === v ? "on" : ""} onClick={() => setStatus(v)}>{l}<span className="qa-filter-n">{counts[v]}</span></button>
          ))}
        </div>
        <div className="art-search">{Icons.search}<input placeholder="חיפוש מאמר…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <Button kind="primary" icon={AdminIcons.plus} iconR={null} onClick={() => onNav("article-new")}>מאמר חדש</Button>
      </div>

      <div className="art-table card">
        <div className="art-th">
          <span className="col-title">מאמר</span>
          <span className="col-cat">קטגוריה</span>
          <span className="col-status">סטטוס</span>
          <span className="col-views">צפיות</span>
          <span className="col-date">עודכן</span>
          <span className="col-act"></span>
        </div>
        {list.map((a) => (
          <div className="art-tr" key={a.id} onClick={() => onNav("article-edit", { id: a.id })}>
            <span className="col-title">
              <span className="art-cover" style={{ background: a.tone }}><Sparkle tone="lime" /></span>
              <span className="art-titletext">
                <b>{a.title}</b>
                <small>{a.tags.map((t) => KOSHER_LABELS[t]).join(" · ")} · {a.read} דק׳ קריאה</small>
              </span>
            </span>
            <span className="col-cat"><span className="art-cat-chip">{artCat(a.cat).label}</span></span>
            <span className="col-status"><span className={"st-pill " + ART_STATUS[a.status].cls}>{ART_STATUS[a.status].label}</span></span>
            <span className="col-views">{a.views.toLocaleString("he-IL")}</span>
            <span className="col-date">{a.updated}</span>
            <span className="col-act">
              <button className="art-iconbtn" title="עריכה" onClick={(e) => { e.stopPropagation(); onNav("article-edit", { id: a.id }); }}>{AdminIcons.pencil}</button>
              <button className="art-iconbtn" title="עוד">{AdminIcons.dots}</button>
            </span>
          </div>
        ))}
        {list.length === 0 && <div className="art-empty">לא נמצאו מאמרים</div>}
      </div>
    </div>
  );
}

// ── Editor (create / edit) ────────────────────────────────────────────
const TOOLBAR = [
  { ic: "bold", wrap: ["**", "**"], t: "מודגש" },
  { ic: "italic", wrap: ["*", "*"], t: "נטוי" },
  { ic: "h1", prefix: "## ", t: "כותרת" },
  { ic: "list", prefix: "- ", t: "רשימה" },
  { ic: "quote", prefix: "> ", t: "ציטוט" },
  { ic: "link", wrap: ["[", "](https://)"], t: "קישור" },
  { ic: "image", insert: "\n![תמונה](placeholder)\n", t: "תמונה" },
];

function ArticleEditor({ articleId, onNav }) {
  const existing = articleId ? ADMIN_ARTICLES.find((a) => a.id === articleId) : null;
  const [title, setTitle] = useArtState(existing ? existing.title : "");
  const [body, setBody] = useArtState(existing ? existing.body : "");
  const [cat, setCat] = useArtState(existing ? existing.cat : "abroad");
  const [tags, setTags] = useArtState(existing ? existing.tags : []);
  const [statusVal, setStatusVal] = useArtState(existing ? existing.status : "draft");
  const [tone, setTone] = useArtState(existing ? existing.tone : "#234F47");
  const [showPreview, setShowPreview] = useArtState(false);
  const [toast, setToast] = useArtState("");
  const ref = useArtRef(null);

  const applyTool = (tool) => {
    const ta = ref.current; if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd, val = ta.value;
    let next, caret;
    if (tool.wrap) { next = val.slice(0, s) + tool.wrap[0] + (val.slice(s, e) || "טקסט") + tool.wrap[1] + val.slice(e); caret = e + tool.wrap[0].length + tool.wrap[1].length; }
    else if (tool.prefix) { const ls = val.lastIndexOf("\n", s - 1) + 1; next = val.slice(0, ls) + tool.prefix + val.slice(ls); caret = e + tool.prefix.length; }
    else { next = val.slice(0, s) + tool.insert + val.slice(e); caret = s + tool.insert.length; }
    setBody(next);
    requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(caret, caret); });
  };
  const toggleTag = (t) => setTags((a) => a.includes(t) ? a.filter((x) => x !== t) : [...a, t]);
  const save = (publish) => {
    setStatusVal(publish ? "published" : statusVal);
    setToast(publish ? "המאמר פורסם בהצלחה" : "הטיוטה נשמרה");
    setTimeout(() => setToast(""), 2400);
  };

  const TONES = ["#234F47", "#2A6FDB", "#A23B3B", "#5B33B0", "#BE914D", "#1F8A5B"];
  return (
    <div className="page editor-page">
      <div className="editor-bar">
        <button className="ed-back" onClick={() => onNav("articles")}>{Icons.chevR}<span>חזרה למאמרים</span></button>
        <div className="ed-bar-end">
          <button className={"ed-toggle" + (showPreview ? " on" : "")} onClick={() => setShowPreview((v) => !v)}>{AdminIcons.eye}{showPreview ? "עריכה" : "תצוגה מקדימה"}</button>
          <Button kind="outline" sm onClick={() => save(false)}>שמירת טיוטה</Button>
          <Button kind="primary" sm icon={Icons.check} onClick={() => save(true)}>פרסום</Button>
        </div>
      </div>

      <div className="editor-split">
        <div className="editor-main card">
          <span className="ed-label">{existing ? "עריכת מאמר" : "מאמר חדש"}</span>
          <input className="ed-title" placeholder="כותרת המאמר…" value={title} onChange={(e) => setTitle(e.target.value)} />

          {!showPreview ? (
            <React.Fragment>
              <div className="ed-toolbar">
                {TOOLBAR.map((tl) => (
                  <button key={tl.ic} className="ed-tool" title={tl.t} onClick={() => applyTool(tl)}>{AdminIcons[tl.ic]}</button>
                ))}
              </div>
              <textarea ref={ref} className="ed-body" placeholder="כתבו את תוכן המאמר כאן…  ניתן להשתמש ב-Markdown:  ## כותרת,  **מודגש**,  - רשימה,  > ציטוט"
                value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            </React.Fragment>
          ) : (
            <div className="ed-preview">
              <span className="art-cat-chip">{artCat(cat).label}</span>
              <h1>{title || "כותרת המאמר"}</h1>
              <div className="ed-preview-tags">{tags.map((t) => <KosherBadge key={t} type={t} label={KOSHER_LABELS[t]} />)}</div>
              <div className="ed-preview-body" dangerouslySetInnerHTML={{ __html: mdToHtml(body || "_אין תוכן עדיין._") }}></div>
            </div>
          )}
        </div>

        <aside className="editor-side">
          <div className="card ed-card">
            <h4>סטטוס פרסום</h4>
            <div className="ed-status-pick">
              {[["draft", "טיוטה"], ["published", "מפורסם"]].map(([v, l]) => (
                <button key={v} className={statusVal === v ? "on" : ""} onClick={() => setStatusVal(v)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="card ed-card">
            <h4>קטגוריה</h4>
            <select className="ed-select" value={cat} onChange={(e) => setCat(e.target.value)}>
              {ART_CATS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div className="card ed-card">
            <h4>סוגי כשרות</h4>
            <div className="ed-tags">
              {Object.keys(KOSHER_LABELS).map((t) => (
                <button key={t} className={"ed-tag" + (tags.includes(t) ? " on" : "")} onClick={() => toggleTag(t)}>
                  {tags.includes(t) && Icons.check}{KOSHER_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
          <div className="card ed-card">
            <h4>תמונת נושא</h4>
            <div className="ed-cover-preview" style={{ background: tone }}><Sparkle tone="lime" />{AdminIcons.image}</div>
            <div className="ed-tone-row">
              {TONES.map((c) => (
                <button key={c} className={"ed-tone" + (tone === c ? " on" : "")} style={{ background: c }} onClick={() => setTone(c)}></button>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {toast && <div className="ed-toast">{Icons.check}{toast}</div>}
    </div>
  );
}

Object.assign(window, { ArticlesPage, ArticleEditor, mdToHtml, KOSHER_LABELS });
