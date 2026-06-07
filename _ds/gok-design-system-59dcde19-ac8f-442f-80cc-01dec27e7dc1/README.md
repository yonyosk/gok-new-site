# GOK — Global Orthodox Kosher · Design System

**GOK** (Hebrew: **ארגון הכשרות העולמי** — "The World Kashrut Organization") is a global
**kosher certification** body. The mark spells **G·O·K** inside an oval seal arched with
**"GLOBAL ORTHODOX"** (top) and **"KOSHER"** (bottom) — a certification stamp you'd see on
packaging, on a website, and across marketing collateral.

The brand is **Hebrew-first and RTL**. It feels **clean, trustworthy, modern-natural** —
the deep pine green + bright pistachio palette signals fresh / organic / certified-pure,
while the geometric seal and sparkle motif keep it contemporary rather than rabbinical-traditional.

This design system was distilled from the brand's official **Brand Language** guidelines
("שפת מותג").

---

## Sources

- **Figma file:** *"GOK - Branding & Website (David).fig"* (mounted read-only).
  - Primary source (in scope): page **`/Branding`** → frame **`Frame-1321315144`**
    (node `1355:166629`) — the full Brand Language / "שפת מותג" guideline deck:
    cover, color system, logo construction (colored / monochrome / favicon), the Assistant
    type specimen, Hebrew + English type-hierarchy ladders, graphic elements (sparkle), and a
    poster/pattern application.
  - Other pages exist in the file but were **out of scope** for this pass: `/Website`
    (25 frames), `/New-App-July-2025`, `/New-App-WIP`, `/NEW-LOGO`, `/Prototype`. They are the
    natural next surfaces to build pixel-faithful UI kits from — see CAVEATS at the bottom.

> Everything under `/Branding` is the file author's brand content, recreated here as a design
> system. The reader is not assumed to have Figma access; key assets were copied into `assets/`.

---

## Brand at a glance

| | |
|---|---|
| **Name** | GOK · Global Orthodox Kosher · ארגון הכשרות העולמי |
| **Sector** | Kosher certification / supervision (kashrut) |
| **Language** | Hebrew-first, RTL (English/Latin used for the logo & data labels) |
| **Signature color** | Deep pine green `#234F47` |
| **Energy color** | Bright pistachio `#C8FE94` |
| **Display/Hebrew font** | **Assistant** |
| **Latin label font** | **League Spartan** (all-caps) |
| **Motifs** | Oval seal · 4-point sparkle · superellipse "pill" shapes · halftone dot field |

---

## CONTENT FUNDAMENTALS

**Language & direction.** Copy is **Hebrew, set right-to-left.** Latin text appears only for
the logo lettering ("GOK / GLOBAL ORTHODOX / KOSHER") and for technical data labels
(hex codes, font names, "Heading 1 / Body / Button"), which are set in **League Spartan, all-caps**.

**Voice.** Plain, confident, instructional — the guidelines speak to a *designer/implementer*,
not a consumer. They describe rules ("we will use the colored logo when it appears over…"),
not slogans. Sentences are short and declarative. No exclamation, no hype, no emoji.

**Casing.**
- Hebrew has no case; weight (Bold/SemiBold) and size carry hierarchy instead.
- Latin labels are **UPPERCASE** with positive tracking (`PRIMARY/GREEN`, `SECONDARY/DARK`).
- Hex values are uppercase, no `#` in the spec chips (`C8FE94`, `234F47`).

**Person.** Guideline voice is first-person-plural / impersonal ("נשתמש…" — *we will use*).
For product/marketing copy lean on a calm, direct second person ("אתם").

**Sample voice (from the file):**
- Cover: **"שפת מותג"** (*Brand Language*) over **"ארגון הכשרות העולמי"** (*World Kashrut Organization*).
- Logo rule: *"צבע הכיתוב הקטן יהיה בצבע ירוק מותג בהיר (C8FE94), הכיתוב GOK… יהיו בצבע לבן."*
  (The small text is brand-light-green; the GOK lettering is white.)
- Type intro: *"ל-GOK יש היררכיית טיפוגרפיה דינמית."* (*GOK has a dynamic type hierarchy.*)
- Graphic elements: *"אלמנטים גרפיים שישמשו כקישוט בחומרי מרקטינג - Print ו-Web."*

**Vibe in one line:** *certified-clean, quietly premium, organic-modern.*

---

## VISUAL FOUNDATIONS

**Color.** A tight, high-contrast palette built on **two greens**:
- **Deep pine `#234F47`** is the hero — backgrounds, seals, large fields, primary buttons.
- **Pistachio `#C8FE94`** is the spark — accents, highlights, the sparkle motif, knockout type
  on green, small CTAs. Used in *small-to-medium* doses against the deep green or white.
- Neutral spine: **ink `#262626`**, **mist `#EDF1F0`** (cool pale green-grey), pure **white**,
  page background **`#FAFAFA`**. The colored logo is approved on only three backgrounds:
  white, mist, and pistachio.
- Reserve accents (navy `#001B59`, cream `#FFF5E5`, gold `#BE914D`) appear rarely.
- Semantic: success `#4AAE20`, danger `#A62122` / `#F12626`, info `#2641F1`, warning/gold `#BE914D`.

**Type.** **Assistant** does nearly all the work — a humanist Hebrew+Latin sans, set across
Light→ExtraBold. Hierarchy is **dynamic**: Bold for H1/H2, SemiBold for H3/H4 & buttons,
Medium for quotes, Regular for body. **League Spartan** is the *condensed all-caps voice* used
for the wordmark and for spec/data labels only — never for running text. Display sizes run very
large (cover 128px); body sits at 18px with generous 1.5–1.6 line-height.

**Shape language.** Everything leans **rounded and soft**: the logo is a **superellipse oval
seal**; decorative shapes are **pill / lozenge superellipses**; cards use `24px` radius;
chips/buttons go fully pill (`999px`). Large rounded shapes are allowed to **bleed off the canvas
edge** (see the cover, where a giant pistachio lozenge is rotated off-frame).

**Backgrounds.** Mostly flat — `#FAFAFA` light pages or full-bleed **deep-green** fields. Two
recurring textures: (1) a **halftone dot field** (subtle tonal dots) used on posters, and (2)
**full-bleed product/food photography** behind the seal. **No gradients** as a brand device
(only faint photo-darkening overlays). Imagery skews **fresh, natural, slightly warm** — produce,
food, greenery — never cold or corporate-blue.

**Motif — the sparkle.** A **4-point concave star / sparkle** (`assets/sparkle-*.svg`) is the
brand's decorative spark, shown in three tones (pine / mist / ink) often seated on rounded pills.
Use it as a bullet, a divider accent, or a "certified" flourish — sparingly.

**Borders & elevation.** Hairlines are `#E3E3E3`. Elevation is **soft and low-contrast**, tinted
toward the deep-green/`#0F2430` rather than pure black (`--shadow-md: 0 8px 24px rgba(15,36,48,.08)`).
The seal carries a thin ring/stroke around the pill. No hard 1px borders on primary cards — they
float on soft shadow instead.

**Hover / press.** Calm and physical, not flashy. Hover = slight **darken** (green→`#1A3B35`) or a
soft shadow lift; lime CTAs darken toward `#B6F076`. Press = a small **scale-down (~0.97)** and/or
a darker shade. Transitions are short and eased: `220ms cubic-bezier(.2,.7,.3,1)` — gentle fades
and lifts, **no bounce, no long animations**.

**Transparency & blur.** Used lightly — photo-overlay scrims (`rgba(0,0,0,.22–.28)`) to seat the
white seal on imagery; occasional frosted header over photography. Not a glassmorphism brand.

**Layout.** Generous margins (the guideline grid insets ~243px on a 1920 canvas ≈ 12.5%),
content right-aligned for RTL, lots of breathing room. Fixed elements: a slim header strip with the
"שפת מותג" wordmark sits top-of-page in the guidelines.

---

## ICONOGRAPHY

The brand guideline frame itself is **icon-light** — its "iconography" is really three things:

1. **The seal/logo** (`assets/logo-mono-*.svg`) — the GOK oval is the dominant graphic device and
   doubles as favicon (a rounded-square lockup). Treat it as the primary brand glyph.
2. **The 4-point sparkle** (`assets/sparkle-*.svg`) — the only bespoke decorative "icon," used as
   a flourish/bullet. Recreated faithfully as clean SVG (the Figma source geometry was degenerate
   and could not be copied directly — **flagged**).
3. **UI icons** — for product/website surfaces the source file uses a **light line-icon set**
   (Material Icons + Hugeicons-style rounded line icons appear in the broader file). There is **no
   bespoke GOK icon font.** For UI kits here we standardize on **[Lucide](https://lucide.dev)**
   (rounded-join line icons, ~1.75 stroke) loaded from CDN — the closest match to the file's line
   style. **This is a substitution; flagged** — swap for the team's chosen set if one exists.

**No emoji.** No decorative unicode dingbats. Icons are line-style, single-color (ink or pine),
sized to the text, never multicolor.

Copied assets live in `assets/` (logos + sparkles). Large source photography and the 7 MB poster
PNG were **not** copied (size); recreate photo treatments with your own imagery + the scrim values
above.

---

## INDEX — what's in this folder

| File / folder | What it is |
|---|---|
| `README.md` | This file — brand context, content + visual foundations, iconography. |
| `colors_and_type.css` | Core design tokens: color vars, type families/scale, radii, spacing, shadows, motion. Import this. |
| `fig-tokens.css` | Raw Figma Variables (auto-generated). Imported by `colors_and_type.css`. |
| `fig-typography.css` | Auto-generated text-style stub (empty — the file had no named text styles). |
| `assets/` | Logos (`logo-mono-*.svg` + raw seal pieces) and sparkle motif (`sparkle-*.svg`). |
| `preview/` | Small HTML cards that populate the **Design System** tab (color, type, logo, components…). |
| `ui_kits/website/` | Website UI kit — brand-applied marketing site (`index.html` + JSX components). |
| `SKILL.md` | Agent-Skill manifest so this system can be used as a downloadable skill. |

**UI kits:** `ui_kits/website` (GOK marketing/certification site).

---

## CAVEATS & next steps

- **Scope:** this pass covered the in-scope **Branding** frame (`/Branding/Frame-1321315144`) only.
  The file also holds `/Website` (25 frames) and App pages (`/New-App-*`) that were **not** explored —
  the Website UI kit here *applies* the brand language rather than pixel-recreating those frames.
  Bring them into scope to make the kit (and an App kit) faithful recreations.
- **Colored logo:** only the **monochrome** seal could be extracted cleanly (single-tone knockout).
  The official **two-tone colored logo** (white "GOK" + light-green curved "GLOBAL ORTHODOX / KOSHER")
  should be supplied as an official export — current "colored" usages approximate it.
- **Sparkle motif** was recreated as clean SVG (the Figma source geometry was degenerate).
- **Icons** use a **Lucide** substitution — no bespoke GOK icon font exists in the file.
- **Fonts** (Assistant, League Spartan) load from **Google Fonts** — both are the brand's actual
  typefaces, so this is a CDN load, not a visual substitution.
- Large source **photography** + the poster PNG were not copied (size); apply your own imagery with
  the documented scrim/treatment values.

