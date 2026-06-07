// GOK Admin — sample data layer (Hebrew, RTL). Stands in for the live API.
// Q&A, articles and analytics series are realistic kosher-domain placeholders.

const ADMIN_USER = { name: "הרב אורן דובדבני", role: "מנהל מערכת", initials: "א\u05f4ד" };

// ── Q&A categories ────────────────────────────────────────────────────
const QA_CATS = [
  { id: "travel", label: "טיולים", tone: "#2A6FDB" },
  { id: "pesach", label: "פסח", tone: "#5B33B0" },
  { id: "shelf", label: "מוצרי מדף", tone: "#1F8A5B" },
  { id: "abroad", label: "חו\u05f4ל", tone: "#BE914D" },
  { id: "general", label: "כללי", tone: "#234F47" },
];
const qaCat = (id) => QA_CATS.find((c) => c.id === id) || QA_CATS[4];

// status: pending | answered | published
const QA_ITEMS = [
  { id: 101, q: "האם אפשר לסמוך על מסעדה עם תעודת כשרות מקומית בפריז?", askedBy: "דניאל ל.", date: "07/06/2026", cat: "abroad", channel: "chat", status: "pending", views: 0,
    answer: "" },
  { id: 102, q: "אילו מוצרי חלב צריכים הכשר מיוחד לפסח כשנמצאים בחו\u05f4ל?", askedBy: "מערכת ZeKasher", date: "07/06/2026", cat: "pesach", channel: "form", status: "pending", views: 0,
    answer: "" },
  { id: 103, q: "קניתי סיר חדש במלון באיטליה — האם חובה להטביל אותו?", askedBy: "מרים כ.", date: "06/06/2026", cat: "abroad", channel: "chat", status: "pending", views: 0,
    answer: "" },
  { id: 104, q: "כיצד מזהים סימון כשרות אמין על מוצר מדף בסופרמרקט בגרמניה?", askedBy: "יוסי ב.", date: "06/06/2026", cat: "shelf", channel: "chat", status: "answered", views: 12,
    answer: "יש לחפש את חותם הכשרות המופיע על האריזה ולוודא שהוא מופיע במאגר ZeKasher עבור המדינה בה אתם נמצאים. סימונים כגון OU, KLBD, בד\u05f4ץ והחותם של GOK מוכרים ואמינים. במקרה של ספק, סרקו את הברקוד באפליקציה." },
  { id: 105, q: "מה חשוב לבדוק לפני נסיעה ליעד שאין בו קהילה יהודית?", askedBy: "רחל מ.", date: "05/06/2026", cat: "travel", channel: "form", status: "answered", views: 31,
    answer: "מומלץ להצטייד במוצרים בסיסיים לימים הראשונים, לבדוק מראש אילו סמלי כשרות מקובלים ביעד, ולשמור את פרטי הקשר של הרבנות הקרובה. עיינו במדריך 'כשרות בחו\u05f4ל' באתר." },
  { id: 106, q: "האם ניתן להכשיר תנור משותף בדירת נופש לקראת שבת?", askedBy: "אברהם ט.", date: "05/06/2026", cat: "general", channel: "chat", status: "published", views: 248,
    answer: "ניתן להכשיר תנור על-ידי ניקוי יסודי והפעלתו בחום מרבי למשך כשעה. כלי חרס אינם ניתנים להכשרה. לפרטים נוספים עיינו במאמר 'בישול ואפייה במטבח לא-כשר'." },
  { id: 107, q: "כיצד נבדקים רכיבים מיובאים מול התקן העולמי של GOK?", askedBy: "מערכת ZeKasher", date: "04/06/2026", cat: "shelf", channel: "form", status: "published", views: 187,
    answer: "כל רכיב מיובא נבדק על-ידי ועדת ההלכה מול מאגר התקנים העולמי, כולל מקור הייצור ותהליך הפיקוח. רק לאחר אישור מלא המוצר נכנס למאגר עם סימון הכשרות המתאים." },
  { id: 108, q: "האם מיץ ענבים שאינו מבושל דורש השגחה מיוחדת?", askedBy: "שמואל ר.", date: "03/06/2026", cat: "general", channel: "chat", status: "published", views: 156,
    answer: "מיץ ענבים ויין דורשים השגחה הלכתית קפדנית לאורך כל תהליך הייצור. חפשו מוצרים הנושאים חותם כשרות בתוקף במאגר ZeKasher." },
  { id: 109, q: "אילו דגים נחשבים כשרים ואיך מזהים אותם בשוק זר?", askedBy: "תמר ש.", date: "03/06/2026", cat: "abroad", channel: "form", status: "pending", views: 0, answer: "" },
  { id: 110, q: "מה דין מוצר שעבר תוקף תעודת הכשרות שלו במאגר?", askedBy: "נתן ה.", date: "02/06/2026", cat: "shelf", channel: "chat", status: "answered", views: 8,
    answer: "מוצר שתוקף תעודתו פג מסומן במאגר כ'לא בתוקף'. יש להסתמך על הסימון שעל גבי האריזה ולבדוק את תאריך התוקף המודפס." },
];

// ── Articles ──────────────────────────────────────────────────────────
const ART_CATS = [
  { id: "abroad", label: "כשרות בחו\u05f4ל" },
  { id: "cooking", label: "בישול ואפייה" },
  { id: "restaurants", label: "מסעדות" },
  { id: "pesach", label: "פסח" },
  { id: "utensils", label: "טבילת כלים" },
];
const artCat = (id) => ART_CATS.find((c) => c.id === id) || ART_CATS[0];

// kosher tags reuse the site's KOSHER_TONE keys: milk | meat | pareve | passover
const ADMIN_ARTICLES = [
  { id: "kosher-abroad", title: "כשרות בחו\u05f4ל — מדריך בסיסי למטייל", cat: "abroad", status: "published",
    author: "הרב אורן דובדבני", date: "01/06/2026", updated: "05/06/2026", views: 4280, read: 6, tags: ["pareve"], tone: "#234F47",
    excerpt: "מה כדאי לבדוק לפני שיוצאים, אילו סמלי כשרות מוכרים בכל יבשת, ואיך משתמשים ב-ZeKasher בדרכים.",
    body: "כאשר יוצאים לדרך, חשוב לבדוק מראש אילו סמלי כשרות מקובלים ביעד ולהוריד את אפליקציית ZeKasher. במאמר זה נסקור את עיקרי הדברים לפני ובמהלך הנסיעה." },
  { id: "symbols", title: "סמלי הכשרות הנפוצים בעולם", cat: "abroad", status: "published",
    author: "ועדת ההלכה", date: "28/05/2026", updated: "28/05/2026", views: 3110, read: 4, tags: ["pareve", "milk"], tone: "#2A6FDB",
    excerpt: "OU, OK, KLBD, בד\u05f4ץ ועוד — מה ההבדל ביניהם ומתי לסמוך על כל אחד.",
    body: "בעולם פועלים עשרות גופי כשרות. במאמר זה נכיר את הסמלים הנפוצים ביותר ונבין את ההבדלים ביניהם." },
  { id: "baking", title: "בישול ואפייה במטבח לא-כשר", cat: "cooking", status: "published",
    author: "הרב אורן דובדבני", date: "20/05/2026", updated: "22/05/2026", views: 2740, read: 5, tags: ["meat", "milk"], tone: "#A23B3B",
    excerpt: "הכשרת כלים, אפייה בתנור משותף וכללי בסיס לשהייה בדירת נופש.",
    body: "שהייה בדירת נופש מציבה אתגרים הלכתיים. נסביר כיצד מכשירים כלים ותנור ומה הכללים הבסיסיים." },
  { id: "restaurants", title: "איך לבחור מסעדה כשרה בחו\u05f4ל", cat: "restaurants", status: "published",
    author: "צוות GOK", date: "12/05/2026", updated: "12/05/2026", views: 1980, read: 3, tags: ["meat"], tone: "#5B33B0",
    excerpt: "מה לשאול את המלצר, אילו תעודות לבקש, ואיך לאתר מסעדות מפוקחות.",
    body: "בחירת מסעדה כשרה ביעד זר דורשת תשומת לב. נפרט אילו שאלות לשאול ואילו תעודות לבקש." },
  { id: "pesach", title: "הלכות פסח למטייל", cat: "pesach", status: "draft",
    author: "ועדת ההלכה", date: "08/06/2026", updated: "08/06/2026", views: 0, read: 8, tags: ["passover"], tone: "#BE914D",
    excerpt: "מכירת חמץ, מוצרים כשרים-לפסח בחו\u05f4ל וכשרות במלון לחג.",
    body: "טיוטה — לקראת פסח נעדכן את המדריך המלא הכולל מכירת חמץ, זיהוי מוצרים כשרים לפסח וכשרות במלון." },
  { id: "tvilat-kelim", title: "טבילת כלים ומכירתם לנוכרי", cat: "utensils", status: "draft",
    author: "הרב אורן דובדבני", date: "06/06/2026", updated: "06/06/2026", views: 0, read: 4, tags: ["pareve"], tone: "#1F8A5B",
    excerpt: "מתי חייבים בטבילה, איך מבצעים מכירה לנוכרי, והשלמת הטופס המקוון.",
    body: "טיוטה — מדריך לטבילת כלים: מתי חובה, כיצד מבצעים מכירה לנוכרי וכיצד ממלאים את הטופס המקוון." },
];

// ── Analytics ─────────────────────────────────────────────────────────
const ANALYTICS = {
  kpis: [
    { id: "searches", label: "חיפושים החודש", value: "48,210", delta: +12.4, icon: "search" },
    { id: "noresult", label: "חיפושים ללא תוצאה", value: "6.2%", delta: -1.8, good: "down", icon: "alert" },
    { id: "questions", label: "שאלות ממתינות", value: "4", delta: +2, good: "down", icon: "chat" },
    { id: "leads", label: "פניות הסמכה חדשות", value: "23", delta: +9, icon: "award" },
  ],
  // 12-month searches trend
  searchesTrend: [
    { m: "יול", v: 21 }, { m: "אוג", v: 24 }, { m: "ספט", v: 22 }, { m: "אוק", v: 28 },
    { m: "נוב", v: 31 }, { m: "דצמ", v: 35 }, { m: "ינו", v: 33 }, { m: "פבר", v: 38 },
    { m: "מרץ", v: 42 }, { m: "אפר", v: 46 }, { m: "מאי", v: 44 }, { m: "יונ", v: 48 },
  ],
  topSearched: [
    { label: "שוקולד חלב", v: 3120 },
    { label: "טחינה גולמית", v: 2740 },
    { label: "יין / מיץ ענבים", v: 2310 },
    { label: "גבינה צהובה", v: 1980 },
    { label: "שמן זית", v: 1640 },
    { label: "לחם ומאפים", v: 1420 },
  ],
  gaps: [
    { label: "ממתקים יפניים", v: 412 },
    { label: "רטבים תאילנדיים", v: 308 },
    { label: "גבינות צרפתיות מקומיות", v: 276 },
    { label: "חטיפי חלבון", v: 194 },
  ],
  countries: [
    { code: "il", flag: "🇮🇱", label: "ישראל", pct: 34 },
    { code: "us", flag: "🇺🇸", label: "ארה\u05f4ב", pct: 22 },
    { code: "fr", flag: "🇫🇷", label: "צרפת", pct: 14 },
    { code: "uk", flag: "🇬🇧", label: "בריטניה", pct: 11 },
    { code: "de", flag: "🇩🇪", label: "גרמניה", pct: 9 },
    { code: "other", flag: "🌍", label: "אחר", pct: 10 },
  ],
  // kosher-type split of searches (donut)
  kosherSplit: [
    { label: "פרווה", key: "pareve", pct: 38 },
    { label: "חלבי", key: "milk", pct: 27 },
    { label: "בשרי", key: "meat", pct: 21 },
    { label: "לפסח", key: "passover", pct: 14 },
  ],
  activity: [
    { who: "מרים כ.", what: "שלחה שאלה חדשה בנושא טבילת כלים", when: "לפני 12 דק\u05f3", type: "qa" },
    { who: "הרב אורן", what: "פרסם תשובה לשאלה על תנור משותף", when: "לפני שעה", type: "answer" },
    { who: "מערכת", what: "412 חיפושים ללא תוצאה — 'ממתקים יפניים'", when: "לפני 3 שעות", type: "gap" },
    { who: "צוות GOK", what: "עדכן את המאמר 'סמלי הכשרות בעולם'", when: "אתמול", type: "article" },
    { who: "מערכת", what: "23 פניות הסמכה חדשות נקלטו השבוע", when: "אתמול", type: "lead" },
  ],
};

Object.assign(window, {
  ADMIN_USER, QA_CATS, qaCat, QA_ITEMS, ART_CATS, artCat, ADMIN_ARTICLES, ANALYTICS,
});
