// GOK Admin — app shell: login gate, routing, render.
const { useState: useMainState } = React;

function AdminApp() {
  const [authed, setAuthed] = useMainState(false);
  const [nav, setNav] = useMainState({ route: "dashboard", params: {} });
  const [menuOpen, setMenuOpen] = useMainState(false);

  const onNav = (route, params = {}) => { setNav({ route, params }); setMenuOpen(false); window.scrollTo(0, 0); };

  React.useEffect(() => { document.documentElement.dir = "rtl"; document.documentElement.lang = "he"; }, []);

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />;

  const { route, params } = nav;
  const isEditor = route === "article-new" || route === "article-edit";
  const navActive = route.startsWith("article") ? "articles" : route;

  let page;
  if (route === "dashboard") page = <DashboardPage onNav={onNav} />;
  else if (route === "qa") page = <QAPage initialId={params.id} />;
  else if (route === "analytics") page = <AnalyticsPage />;
  else if (route === "articles") page = <ArticlesPage onNav={onNav} />;
  else if (route === "article-new") page = <ArticleEditor onNav={onNav} />;
  else if (route === "article-edit") page = <ArticleEditor articleId={params.id} onNav={onNav} />;
  else page = <DashboardPage onNav={onNav} />;

  return (
    <div className="admin-shell">
      <Sidebar route={navActive} onNav={onNav} open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="admin-main">
        {!isEditor && <Topbar route={navActive} onMenu={() => setMenuOpen((o) => !o)} onNav={onNav} />}
        <div className="admin-content" key={route + (params.id || "")}>{page}</div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("admin-root")).render(<AdminApp />);
