// GOK site — data layer.
//  searchProducts(params) is the SINGLE integration point for the live API.
//  Today it filters a local sample set and resolves async (mimicking a fetch).
//  To go live, replace the body with:
//     const r = await fetch(`${API}/products?` + new URLSearchParams(params));
//     return r.json();
//  …keeping the same return shape: { items: Product[], total: number }.

const COUNTRIES = [
  { code: "all", flag: "🌍", he: "כל המדינות", en: "All countries" },
  { code: "il", flag: "🇮🇱", he: "ישראל", en: "Israel" },
  { code: "us", flag: "🇺🇸", he: "ארה״ב", en: "USA" },
  { code: "uk", flag: "🇬🇧", he: "בריטניה", en: "UK" },
  { code: "fr", flag: "🇫🇷", he: "צרפת", en: "France" },
  { code: "be", flag: "🇧🇪", he: "בלגיה", en: "Belgium" },
  { code: "ch", flag: "🇨🇭", he: "שווייץ", en: "Switzerland" },
  { code: "de", flag: "🇩🇪", he: "גרמניה", en: "Germany" },
  { code: "au", flag: "🇦🇺", he: "אוסטרליה", en: "Australia" },
  { code: "it", flag: "🇮🇹", he: "איטליה", en: "Italy" },
];
const countryByCode = (c) => COUNTRIES.find((x) => x.code === c) || COUNTRIES[0];

// kosher: milk | meat | pareve | passover (a product can be pareve + passover etc.)
const PRODUCTS = [
  { id: 1, brand: "Swiss Premium", he: "חלב מפוסטר 3%", en: "Whole Milk 3% – 1L", cat: "dairy", kosher: ["milk"], cert: "בד״ץ אנטוורפן", certEn: "Badatz Antwerp", barcode: "019283746", countries: ["ch", "de", "fr"], tone: "#3F6FB5" },
  { id: 2, brand: "Premium Meats", he: "סטייק בקר 250 ג׳", en: "Beef Steak – 250g", cat: "meat", kosher: ["meat"], cert: "בד״ץ אנטוורפן", certEn: "Badatz Antwerp", barcode: "019283746", countries: ["be", "fr", "us"], tone: "#A23B3B" },
  { id: 3, brand: "Galil", he: "טחינה גולמית", en: "Raw Tahini – 500g", cat: "pantry", kosher: ["pareve", "passover"], cert: "GOK", certEn: "GOK", barcode: "729001234567", countries: ["il", "us", "uk"], tone: "#B79A52" },
  { id: 4, brand: "Boulangerie Lévy", he: "בגט חיטה מלאה", en: "Whole-wheat Baguette", cat: "bakery", kosher: ["pareve"], cert: "בד״ץ פריז", certEn: "Badatz Paris", barcode: "340155500110", countries: ["fr"], tone: "#C58A3D" },
  { id: 5, brand: "Alpen Choc", he: "שוקולד חלב 70 ג׳", en: "Milk Chocolate – 70g", cat: "snacks", kosher: ["milk"], cert: "בד״ץ ציריך", certEn: "Badatz Zurich", barcode: "761000098234", countries: ["ch", "de"], tone: "#7A4A2B" },
  { id: 6, brand: "Sunrise Foods", he: "מיץ תפוזים סחוט", en: "Orange Juice – 1L", cat: "drinks", kosher: ["pareve", "passover"], cert: "OU", certEn: "OU", barcode: "041800110021", countries: ["us", "uk", "au"], tone: "#D98A2B" },
  { id: 7, brand: "Tnuva", he: "גבינה צהובה 28%", en: "Yellow Cheese 28%", cat: "dairy", kosher: ["milk"], cert: "GOK", certEn: "GOK", barcode: "729011002233", countries: ["il"], tone: "#D6B23E" },
  { id: 8, brand: "London Bakehouse", he: "עוגיות חמאה", en: "Butter Cookies – 200g", cat: "bakery", kosher: ["milk"], cert: "KLBD", certEn: "KLBD", barcode: "501234500987", countries: ["uk"], tone: "#C99B57" },
  { id: 9, brand: "Mediterraneo", he: "שמן זית כתית", en: "Extra-virgin Olive Oil", cat: "pantry", kosher: ["pareve", "passover"], cert: "בד״ץ מילאנו", certEn: "Badatz Milan", barcode: "800100200300", countries: ["it", "fr"], tone: "#6E8C3A" },
  { id: 10, brand: "Outback Kosher", he: "נקניקיות עוף", en: "Chicken Franks – 400g", cat: "meat", kosher: ["meat"], cert: "KA Australia", certEn: "KA Australia", barcode: "931000456789", countries: ["au"], tone: "#9A4030" },
  { id: 11, brand: "Berliner Brot", he: "לחם שיפון", en: "Rye Bread – 750g", cat: "bakery", kosher: ["pareve"], cert: "בד״ץ ברלין", certEn: "Badatz Berlin", barcode: "401234566778", countries: ["de"], tone: "#B0824A" },
  { id: 12, brand: "Galil", he: "קוסקוס מלא", en: "Whole Couscous – 1kg", cat: "pantry", kosher: ["pareve"], cert: "GOK", certEn: "GOK", barcode: "729004455667", countries: ["il", "fr", "us"], tone: "#C2A85C" },
  { id: 13, brand: "Dairy Best", he: "יוגורט טבעי", en: "Natural Yogurt – 150g", cat: "dairy", kosher: ["milk"], cert: "OU-D", certEn: "OU-D", barcode: "044700123456", countries: ["us"], tone: "#5E86B8" },
  { id: 14, brand: "Snackline", he: "חטיף תירס", en: "Corn Snack – 60g", cat: "snacks", kosher: ["pareve"], cert: "GOK", certEn: "GOK", barcode: "729007788990", countries: ["il", "uk"], tone: "#D7A93B" },
  { id: 15, brand: "Vin Pur", he: "מיץ ענבים", en: "Grape Juice – 750ml", cat: "drinks", kosher: ["pareve", "passover"], cert: "בד״ץ פריז", certEn: "Badatz Paris", barcode: "340199001122", countries: ["fr", "be"], tone: "#7B3F6B" },
  { id: 16, brand: "Premium Meats", he: "כבד עוף קפוא", en: "Frozen Chicken Liver", cat: "meat", kosher: ["meat"], cert: "בד״ץ אנטוורפן", certEn: "Badatz Antwerp", barcode: "019288890011", countries: ["be", "us"], tone: "#8C3A3A" },
  { id: 17, brand: "Pure Pantry", he: "אורז בסמטי", en: "Basmati Rice – 1kg", cat: "pantry", kosher: ["pareve", "passover"], cert: "OU-P", certEn: "OU-P", barcode: "041800556677", countries: ["us", "uk", "au"], tone: "#A99765" },
  { id: 18, brand: "Café Roma", he: "פולי קפה קלוי", en: "Roasted Coffee Beans", cat: "drinks", kosher: ["pareve"], cert: "בד״ץ מילאנו", certEn: "Badatz Milan", barcode: "800155667788", countries: ["it"], tone: "#6B4A33" },
];

function matchProduct(p, { q, country, kosher, cat }, lang) {
  if (country && country !== "all" && !p.countries.includes(country)) return false;
  if (kosher && kosher !== "all" && !p.kosher.includes(kosher)) return false;
  if (cat && cat !== "all" && p.cat !== cat) return false;
  if (q) {
    const hay = `${p.brand} ${p.he} ${p.en} ${p.barcode}`.toLowerCase();
    if (!q.toLowerCase().split(/\s+/).every((tok) => hay.includes(tok))) return false;
  }
  return true;
}

// ── Live ZeKasher API ──────────────────────────────────────────────
const API_BASE = "https://new-app.zekasher.com/api/v1";
const GUEST_EMAIL = "api.new.site@site.new";
const GUEST_PASSWORD = "This0i$-New";

let _guestToken = null;
let _guestTokenExpiry = 0;

async function fetchGuestToken() {
  if (_guestToken && Date.now() < _guestTokenExpiry) return _guestToken;
  const r = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: GUEST_EMAIL, password: GUEST_PASSWORD }),
  });
  if (!r.ok) throw new Error(`Guest auth failed: ${r.status}`);
  const d = await r.json();
  _guestToken = d.access_token;
  _guestTokenExpiry = Date.now() + 55 * 60 * 1000;
  return _guestToken;
}

async function getApiToken() {
  try {
    const stored = JSON.parse(localStorage.getItem("gok-api-tokens") || "null");
    if (stored?.access_token) return { token: stored.access_token, isUser: true };
  } catch {}
  const token = await fetchGuestToken();
  return { token, isUser: false };
}

async function refreshUserToken() {
  try {
    const stored = JSON.parse(localStorage.getItem("gok-api-tokens") || "null");
    if (!stored?.refresh_token) return null;
    const r = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: stored.refresh_token }),
    });
    if (!r.ok) { localStorage.removeItem("gok-api-tokens"); return null; }
    const d = await r.json();
    localStorage.setItem("gok-api-tokens", JSON.stringify(d));
    return d.access_token;
  } catch { return null; }
}

async function apiFetch(url, options = {}) {
  let { token, isUser } = await getApiToken();
  const doFetch = (t) => fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${t}` },
  });
  let resp = await doFetch(token);
  if (resp.status === 401) {
    if (isUser) {
      const newToken = await refreshUserToken();
      if (newToken) { resp = await doFetch(newToken); }
      else { localStorage.removeItem("gok-api-tokens"); }
    } else {
      _guestToken = null;
      const newToken = await fetchGuestToken();
      if (newToken) resp = await doFetch(newToken);
    }
  }
  return resp;
}

const mapApiProduct = (r) => ({
  id: r.id,
  brand: r.brand_name || "",
  he: r.name_he || r.canonical_name || "",
  en: r.name_en || r.canonical_name || "",
  cat: "",
  kosher: [],
  cert: "",
  certEn: "",
  barcode: r.barcode || "",
  countries: [],
  tone: "#234F47",
  image: r.image_url || r.front_image_url || null,
  apiStatus: r.status || "unhandled",
});

async function searchProducts(params = {}, lang = "he") {
  try {
    const qs = new URLSearchParams({ q: params.q || "", limit: 20, skip: params.skip || 0 });
    const resp = await apiFetch(`${API_BASE}/products/search?${qs}`);
    if (!resp || !resp.ok) throw new Error(`API ${resp?.status}`);
    const json = await resp.json();
    return { items: (json.items || []).map(mapApiProduct), total: json.total || 0, hasMore: json.has_more || false };
  } catch (err) {
    console.warn("[ZeKasher] search API failed, using sample data:", err);
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = PRODUCTS.filter((p) => matchProduct(p, params, lang));
        resolve({ items, total: items.length, hasMore: false });
      }, 260);
    });
  }
}

async function lookupBarcode(barcode) {
  if (!barcode?.trim()) return null;
  try {
    const resp = await apiFetch(`${API_BASE}/products/barcode/${encodeURIComponent(barcode.trim())}`);
    if (!resp) return null;
    if (resp.status === 404) return [];
    if (!resp.ok) throw new Error(`API ${resp.status}`);
    const r = await resp.json();
    const products = Array.isArray(r) ? r : [r];
    return products.map(mapApiProduct);
  } catch (err) {
    console.warn("[ZeKasher] barcode lookup failed:", err);
    return null;
  }
}

// ---- Guide / article content (placeholders) ----
const ARTICLES = [
  { id: "kosher-abroad", cat: 1, read: 6,
    he: { title: "כשרות בחו״ל — מדריך בסיסי למטייל", excerpt: "מה כדאי לבדוק לפני שיוצאים, אילו סמלי כשרות מוכרים בכל יבשת, ואיך משתמשים ב-ZeKasher בדרכים." },
    en: { title: "Kosher abroad — a basic traveler's guide", excerpt: "What to check before you go, which kosher symbols are recognized on each continent, and how to use ZeKasher on the road." } },
  { id: "symbols", cat: 1, read: 4,
    he: { title: "סמלי הכשרות הנפוצים בעולם", excerpt: "OU, OK, KLBD, בד״ץ ועוד — מה ההבדל ביניהם ומתי לסמוך על כל אחד." },
    en: { title: "Common kosher symbols around the world", excerpt: "OU, OK, KLBD, Badatz and more — the differences and when to rely on each." } },
  { id: "baking", cat: 2, read: 5,
    he: { title: "בישול ואפייה במטבח לא-כשר", excerpt: "הכשרת כלים, אפייה בתנור משותף וכללי בסיס לשהייה בדירת נופש." },
    en: { title: "Cooking & baking in a non-kosher kitchen", excerpt: "Kashering utensils, baking in a shared oven, and basics for a vacation rental." } },
  { id: "restaurants", cat: 3, read: 3,
    he: { title: "איך לבחור מסעדה כשרה בחו״ל", excerpt: "מה לשאול את המלצר, אילו תעודות לבקש, ואיך לאתר מסעדות מפוקחות." },
    en: { title: "How to pick a kosher restaurant abroad", excerpt: "What to ask the waiter, which certificates to request, and how to find supervised restaurants." } },
  { id: "pesach", cat: 4, read: 8,
    he: { title: "הלכות פסח למטייל", excerpt: "מכירת חמץ, מוצרים כשרים-לפסח בחו״ל וכשרות במלון לחג." },
    en: { title: "Passover laws for the traveler", excerpt: "Selling chametz, kosher-for-Passover products abroad, and hotel kosher over the holiday." } },
  { id: "tvilat-kelim", cat: 5, read: 4,
    he: { title: "טבילת כלים ומכירתם לנוכרי", excerpt: "מתי חייבים בטבילה, איך מבצעים מכירה לנוכרי, והשלמת הטופס המקוון." },
    en: { title: "Utensil immersion & sale to a non-Jew", excerpt: "When immersion is required, how the sale is carried out, and completing the online form." } },
];

// Long-form body used by the article page (same body for any article — placeholder).
const ARTICLE_BODY = {
  he: [
    { type: "p", text: "טקסט זה הוא תוכן זמני (placeholder). בעת מילוי האתר יוחלף בתוכן ההלכתי המלא שיסופק על-ידי הארגון. המבנה, הכותרות והעיצוב משקפים את האופן שבו ייראה מאמר אמיתי במדריך." },
    { type: "h2", text: "לפני הנסיעה" },
    { type: "p", text: "כדאי לבדוק מראש אילו סמלי כשרות מקובלים ביעד, להוריד את אפליקציית ZeKasher, ולשמור את פרטי הקשר של הרבנות המקומית. מומלץ להצטייד במוצרים בסיסיים לימים הראשונים." },
    { type: "ul", items: ["בדקו את רשימת המוצרים המאושרים במדינת היעד", "שמרו צילום של תעודות הכשרות הרלוונטיות", "תכננו ארוחות לשבת מראש"] },
    { type: "h2", text: "במהלך השהייה" },
    { type: "p", text: "בעת רכישת מוצר, סרקו את הברקוד או חפשו את שמו ב-ZeKasher. שימו לב לסוג הכשרות (חלבי / בשרי / פרווה) ולתוקף התעודה. אם מוצר אינו מופיע במאגר, ניתן להוסיף אותו ולעזור למטיילים הבאים." },
    { type: "quote", text: "תקן אחד, שקוף ואמין — נגיש לכל יהודי, בכל מקום בעולם." },
    { type: "h2", text: "שאלות נפוצות" },
    { type: "p", text: "מצאתם אי-התאמה בין הסימון על האריזה לבין המאגר? פנו אלינו דרך עמוד הצור-קשר ונעדכן בהקדם. זכרו: יש להסתמך על סימון הכשרות שעל גבי האריזה." },
  ],
  en: [
    { type: "p", text: "This is placeholder text. When the site is populated it will be replaced with the full halachic content provided by the organization. The structure, headings and styling reflect how a real guide article will look." },
    { type: "h2", text: "Before you travel" },
    { type: "p", text: "Check in advance which kosher symbols are accepted at your destination, download the ZeKasher app, and save the local rabbinate's contact details. It's wise to pack basic products for the first days." },
    { type: "ul", items: ["Review the approved product list for your destination", "Save photos of the relevant kosher certificates", "Plan Shabbat meals in advance"] },
    { type: "h2", text: "During your stay" },
    { type: "p", text: "When buying a product, scan the barcode or search its name in ZeKasher. Note the kosher type (dairy / meat / pareve) and the certificate validity. If a product isn't in the database, you can add it and help the next traveler." },
    { type: "quote", text: "One standard — transparent and reliable — accessible to every Jew, anywhere in the world." },
    { type: "h2", text: "FAQ" },
    { type: "p", text: "Found a mismatch between the package marking and the database? Reach out via the contact page and we'll update it promptly. Remember: always rely on the kosher marking on the package itself." },
  ],
};

Object.assign(window, { COUNTRIES, countryByCode, PRODUCTS, searchProducts, ARTICLES, ARTICLE_BODY });

// ---- Home page placeholder content (bilingual) ----
const HOME_UPDATES = {
  he: [
    { tag: "מאמר", date: "06/2026", title: "כשרות בחו״ל — מה חדש בקיץ 2026", excerpt: "מדריך מעודכן ליעדים הפופולריים ולמותגים המאושרים החדשים במאגר." },
    { tag: "עדכון", date: "05/2026", title: "מאות מוצרים חדשים נוספו ל-ZeKasher", excerpt: "הרחבנו את המאגר ביעדים באירופה ובצפון אמריקה — כולל סינון לפסח." },
    { tag: "אירוע", date: "04/2026", title: "סדנת כשרות לפסח לקהילות", excerpt: "סדרת מפגשים מקוונים לקראת החג — הרשמה פתוחה לקהל הרחב." },
    { tag: "הודעה", date: "03/2026", title: "שיתוף פעולה עם רבנויות מקומיות", excerpt: "הרחבת מערך הפיקוח לחמש מדינות נוספות באמריקה הלטינית." },
  ],
  en: [
    { tag: "Article", date: "06/2026", title: "Kosher abroad — what's new in summer 2026", excerpt: "An updated guide to popular destinations and newly approved brands in the database." },
    { tag: "Update", date: "05/2026", title: "Hundreds of new products added to ZeKasher", excerpt: "We expanded the database across Europe and North America — including Passover filtering." },
    { tag: "Event", date: "04/2026", title: "Passover kosher workshop for communities", excerpt: "A series of online sessions ahead of the holiday — open registration." },
    { tag: "Notice", date: "03/2026", title: "Partnership with local rabbinates", excerpt: "Expanding supervision to five more countries across Latin America." },
  ],
};

const HOME_QA = {
  he: [
    { cat: 1, q: "האם אפשר לסמוך על מסעדה עם תעודה מקומית בחו״ל?" },
    { cat: 2, q: "אילו מוצרים צריכים הכשר מיוחד לפסח?" },
    { cat: 3, q: "איך מזהים סימון כשרות אמין על מוצר מדף?" },
    { cat: 4, q: "מה חשוב לבדוק לפני נסיעה ליעד ללא קהילה יהודית?" },
    { cat: 1, q: "האם צריך להטביל כלים שנקנו במלון בחו״ל?" },
    { cat: 3, q: "כיצד נבדקים רכיבים מיובאים מול התקן העולמי?" },
  ],
  en: [
    { cat: 1, q: "Can I rely on a restaurant with a local certificate abroad?" },
    { cat: 2, q: "Which products need special certification for Passover?" },
    { cat: 3, q: "How do I identify a reliable kosher mark on a packaged product?" },
    { cat: 4, q: "What should I check before traveling to a place with no Jewish community?" },
    { cat: 1, q: "Do I need to immerse utensils bought at a hotel abroad?" },
    { cat: 3, q: "How are imported ingredients checked against the global standard?" },
  ],
};

const HOME_FAQ = {
  he: [
    ["מהי הסמכת הכשרות של GOK?", "GOK מעניק הסמכת כשרות אורתודוקסית בתקן אחיד, בפיקוח רבני קפדני. כל תעודה נושאת קוד אימות פתוח שניתן לבדוק בכל רגע."],
    ["איך עובד מאגר ZeKasher?", "המאגר מאפשר לחפש מוצר לפי שם, מותג, קטגוריה או ברקוד, ולסנן לפי המדינה בה אתם נמצאים ולפי סוג הכשרות — בדפדפן ובאפליקציה."],
    ["האם השירות בתשלום?", "מאגר ZeKasher והחיפוש פתוחים וחינמיים לכל אדם. שירותי הסמכה וליווי לעסקים מתומחרים בנפרד לפי היקף."],
    ["כיצד מבקשים הסמכת כשרות לעסק?", "ממלאים טופס פנייה, ומשם מתחיל תהליך הכולל ביקורת בשטח, בדיקת רכיבים והנפקת תעודה דיגיטלית."],
    ["מה עושים אם נמצאה אי-התאמה בסימון?", "פנו אלינו דרך עמוד הצור-קשר ונעדכן בהקדם. תמיד יש להסתמך על סימון הכשרות שעל גבי האריזה."],
  ],
  en: [
    ["What is GOK kosher certification?", "GOK grants Orthodox kosher certification on a single standard, under strict rabbinic supervision. Every certificate carries an open verification code you can check anytime."],
    ["How does the ZeKasher database work?", "Search a product by name, brand, category or barcode, and filter by the country you're in and by kosher type — on web and in the app."],
    ["Is the service free?", "The ZeKasher database and search are open and free for everyone. Certification and business support services are priced separately by scope."],
    ["How do I request certification for a business?", "Fill the contact form, and a process begins that includes a field audit, ingredient review and a digital certificate."],
    ["What if a marking mismatch is found?", "Reach out via the contact page and we'll update it promptly. Always rely on the kosher marking on the package itself."],
  ],
};

Object.assign(window, { HOME_UPDATES, HOME_QA, HOME_FAQ });
