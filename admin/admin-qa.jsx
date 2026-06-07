// GOK Admin — Q&A management: moderation queue (list) + answer/publish editor.
const { useState: useQaState } = React;

const QA_STATUS = {
  pending: { label: "ממתינה", cls: "st-pending" },
  answered: { label: "נענתה", cls: "st-answered" },
  published: { label: "פורסמה", cls: "st-published" },
};
const CHANNELS = { chat: { label: "צ\u05f3אט חכם", ic: "chat" }, form: { label: "טופס", ic: "file" } };

function StatusPill({ status }) {
  const s = QA_STATUS[status];
  return <span className={"st-pill " + s.cls}>{s.label}</span>;
}

function QAPage({ initialId }) {
  const [items, setItems] = useQaState(() => QA_ITEMS.map((x) => ({ ...x })));
  const [filter, setFilter] = useQaState("all");
  const [selId, setSelId] = useQaState(initialId || items.find((x) => x.status === "pending")?.id || items[0].id);
  const [draft, setDraft] = useQaState("");
  const [draftCat, setDraftCat] = useQaState("general");
  const [saved, setSaved] = useQaState(false);

  const sel = items.find((x) => x.id === selId);
  React.useEffect(() => { if (sel) { setDraft(sel.answer || ""); setDraftCat(sel.cat); setSaved(false); } }, [selId]);

  const counts = {
    all: items.length,
    pending: items.filter((x) => x.status === "pending").length,
    answered: items.filter((x) => x.status === "answered").length,
    published: items.filter((x) => x.status === "published").length,
  };
  const list = items.filter((x) => filter === "all" || x.status === filter);

  const update = (id, patch) => setItems((arr) => arr.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  const saveAnswer = (publish) => {
    update(selId, { answer: draft, cat: draftCat, status: publish ? "published" : (draft.trim() ? "answered" : "pending") });
    setSaved(true);
  };

  return (
    <div className="page qa-page">
      <div className="qa-split">
        {/* list pane */}
        <div className="qa-list-pane">
          <div className="qa-filter">
            {[["all", "הכל"], ["pending", "ממתינות"], ["answered", "נענו"], ["published", "פורסמו"]].map(([v, l]) => (
              <button key={v} className={filter === v ? "on" : ""} onClick={() => setFilter(v)}>
                {l}<span className="qa-filter-n">{counts[v]}</span>
              </button>
            ))}
          </div>
          <div className="qa-list">
            {list.map((q) => (
              <button key={q.id} className={"qa-litem" + (q.id === selId ? " on" : "")} onClick={() => setSelId(q.id)}>
                <div className="qa-litem-top">
                  <span className="qa-cat-tag" style={{ color: qaCat(q.cat).tone, background: qaCat(q.cat).tone + "1A" }}>{qaCat(q.cat).label}</span>
                  <StatusPill status={q.status} />
                </div>
                <p className="qa-litem-q">{q.q}</p>
                <div className="qa-litem-meta">
                  <span>{q.askedBy}</span><span className="dot"></span><span>{q.date}</span>
                  {q.status === "published" && <React.Fragment><span className="dot"></span><span>{AdminIcons.eye}{q.views}</span></React.Fragment>}
                </div>
              </button>
            ))}
            {list.length === 0 && <div className="qa-list-empty">אין שאלות בקטגוריה זו</div>}
          </div>
        </div>

        {/* detail / editor pane */}
        {sel ? (
          <div className="qa-detail" key={sel.id}>
            <div className="qa-detail-head">
              <div className="qa-detail-tags">
                <span className="qa-channel">{CHANNELS[sel.channel].ic === "chat" ? Icons.chat : AdminIcons.file}{CHANNELS[sel.channel].label}</span>
                <StatusPill status={sel.status} />
              </div>
              <button className="qa-del" title="מחיקה">{AdminIcons.trash}</button>
            </div>

            <div className="qa-question">
              <span className="qa-q-mark">?</span>
              <div>
                <h2>{sel.q}</h2>
                <div className="qa-q-meta">
                  <span>{AdminIcons.user}{sel.askedBy}</span>
                  <span>{AdminIcons.cal}{sel.date}</span>
                  {sel.status === "published" && <span>{AdminIcons.eye}{sel.views} צפיות</span>}
                </div>
              </div>
            </div>

            <div className="qa-editor">
              <div className="qa-field">
                <label>קטגוריה</label>
                <div className="qa-cat-pick">
                  {QA_CATS.map((c) => (
                    <button key={c.id} className={"qa-cat-opt" + (draftCat === c.id ? " on" : "")}
                      style={draftCat === c.id ? { background: c.tone, borderColor: c.tone, color: "#fff" } : { color: c.tone }}
                      onClick={() => { setDraftCat(c.id); setSaved(false); }}>{c.label}</button>
                  ))}
                </div>
              </div>
              <div className="qa-field">
                <label>תשובה הלכתית</label>
                <textarea className="qa-answer" value={draft} placeholder="כתבו כאן את התשובה ההלכתית לפרסום במאגר…"
                  onChange={(e) => { setDraft(e.target.value); setSaved(false); }}></textarea>
                <div className="qa-answer-foot">
                  <span className="qa-hint">{AdminIcons.alert}התשובה תוצג במאגר הציבורי לאחר פרסום</span>
                  <span className="qa-count">{draft.length} תווים</span>
                </div>
              </div>
              <div className="qa-actions">
                <Button kind="primary" icon={AdminIcons.reply} onClick={() => saveAnswer(false)}>שמירת תשובה</Button>
                <Button kind="lime" icon={Icons.check} onClick={() => saveAnswer(true)}>אישור ופרסום</Button>
                {saved && <span className="qa-saved">{Icons.check} נשמר</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="qa-detail empty"><p>בחרו שאלה מהרשימה</p></div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { QAPage, StatusPill });
