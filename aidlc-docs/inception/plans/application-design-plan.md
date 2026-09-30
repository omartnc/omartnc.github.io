# Application Design Plan — GSAP Dark-Chalkboard Restyle

## Proposed shape (Spry default held)
One static single-page unit (`portfolio-site`). No new files beyond the existing three —
`index.html`, `css/main.css`, `js/main.js` — modified in place. No build step, no runtime
dependency, no decomposition. The "structure" question is answered: the default fits.

## Component inventory (restyled in place)
TopBar nav · Hero · Sections (Experience, Portfolio, Personal Projects, Skills, Education,
Contact) · WorkCard · SkillChip · AwardCard · ContactCard · Marquee · ProjectDialog · Footer.

## Token system (mapped from GSAP's DESIGN.md)
| Token | Value | Use |
|---|---|---|
| `--canvas` | `#0e100f` | page background |
| `--panel` | `#191919` | alternating band surfaces |
| `--line` | `#42433d` | hairline dividers, borders |
| `--muted` | `#7c7c6f` | secondary text |
| `--cream` | `#fffce1` | primary text, ghost-pill borders |
| `--accent` / `--accent-soft` | `#88e788` → `#dfffd1` | CTA gradient stroke, hover accents |
| Radius | cards 8px · tags 8px · buttons 100px | ghost pills everywhere |
| Type | Inter Tight (display, tight tracking) · Inter (body 16–19px, lh 1.15) | Google Fonts |
| Signature | `{ }` curly-bracket section eyebrows (CSS-only, no markup change) | GSAP's recurring motif |

## Animation contract (native, zero-dep)
1. Hero entrance — name/lead rise with stagger on load (CSS animation).
2. Scroll reveals — `.reveal` elements fade+rise via IntersectionObserver; stagger via
   `--reveal-delay` custom property.
3. Timeline draw — dedicated line element grows (scaleY) when section enters view.
4. Card hovers — lift + image zoom + green border glow (CSS transitions).
5. Chip stagger — skills chips reveal in sequence when their section enters view.
6. Marquee — duplicated content, CSS `translateX` loop, pause on hover.
7. Modal transitions — open + close animations on the existing `<dialog>`s (small JS helper
   for close; open is pure CSS).
8. All of the above disabled under `prefers-reduced-motion` (existing rule kept; reveals fall
   back to fully visible).

## HTML changes
- Sidebar → slim top bar (keep ids `sideNav`, `navToggle`, `siteNavMenu` so existing JS holds).
- Google Fonts link (Inter Tight + Inter).
- `.reveal` attributes on sections/cards; marquee markup; timeline line element.

## JS changes (`js/main.js`)
- Add: reveal observer, timeline-draw observer, dialog close-animation helper. Keep: menu
  toggle, scrollspy, backdrop close, footer year.

## Removed
- Blue token set, fixed-sidebar layout CSS, `prefers-color-scheme` dark override block,
  `.section--blue` band, old card shadows/radius.

## Load-bearing commitments (recorded in design-decisions.md)
1. Always-dark, single token set. 2. Zero runtime dependencies (native animation only).
3. Content preserved. 4. One unit, 3 files, no build step. 5. Top-bar replaces sidebar.
6. Inter Tight + Inter. 7. Seven animation pieces, all reduced-motion gated. 8. WCAG AA +
existing ARIA patterns.

## Questions (answer changes the design)
- **[Answer] Q1 — Marquee content:** A) technologies from the Skills section (C#, ASP.NET,
  React, SQL, Node.js…) — recommended; B) identity phrases ("Full-Stack Developer • Toronto •
  8+ Years"); C) both, alternating rows.
- **[Answer] Q2 — Skills band:** A) keep a distinct off-black panel band for rhythm (GSAP
  alternates surfaces) — recommended; B) continuous canvas, hairline dividers only.
- **[Answer] Q3 — Hero CTA:** A) add a ghost-pill CTA with gradient stroke ("View Portfolio"
  → scrolls to #portfolio) — recommended, the design's only filled interaction; B) text-only
  hero, no CTA.
