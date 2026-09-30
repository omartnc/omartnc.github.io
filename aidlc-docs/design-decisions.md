# Design Decisions — the spine (keyhole over the design chain)

Downstream design stages read this file first; appends only.

## Brownfield starting context (from Reverse Engineering, 2026-09-30)
- Existing system: static single-page portfolio; plain HTML/CSS/JS; zero dependencies; GitHub Pages.
- **Accommodation-cost hotspot:** dual light/dark theming — two token sets + scattered component overrides. Cost paid on every future style change. Candidate to collapse to a single (dark) canvas.
- **Protection-tax candidates:** none. Do not import a framework, build step, or animation dependency without a named present need.
- **Structural decisions that cost:** fixed sidebar nav (HTML + CSS coupling). Top-bar nav is a real layout change, not a reskin.
- **Reusable as-is:** `<dialog>` modals, IO scrollspy, mobile menu JS, reduced-motion handling.

## Decisions (this cycle)

### 2026-09-30 — Application Design: GSAP dark-chalkboard restyle (APPROVED)
**Shape:** one static single-page unit; `index.html` + `css/main.css` + `js/main.js` modified
in place; no new files, no build step, no runtime dependency. The compass default held — no
departure was earned.

**Decisions:**
- Always-dark single token set (GSAP palette mapped to CSS custom properties): canvas
  `#0e100f`, panel `#191919`, line `#42433d`, muted `#7c7c6f`, cream `#fffce1`, accent
  `#88e788→#dfffd1` gradient (CTA stroke + hover accents only). Dual light/dark theming removed.
- Typography: Inter Tight (display, tight tracking) + Inter (body 16–19px / lh 1.15), Google
  Fonts. `{ }` curly-bracket section eyebrows as the recurring signature (CSS-only).
- Slim full-width top bar replaces the fixed sidebar; ids `sideNav`/`navToggle`/`siteNavMenu`
  kept so existing JS holds.
- Seven native animation pieces (hero entrance, scroll reveals, timeline draw, card hover,
  chip stagger, tech marquee, modal open/close), all gated by `prefers-reduced-motion`.
- Marquee = technologies from Skills (duplicate list, `aria-hidden`, pause on hover).
- Skills section = off-black panel band (alternating-surface rhythm).
- Hero gets a gradient-stroked ghost-pill CTA "View Portfolio" → `#portfolio`.
- Content, dialogs, links, ARIA patterns preserved.

**Load-bearing commitments (departing = reversal, must surface):**
1. Always-dark; no light theme, no `prefers-color-scheme` theming.
2. Zero runtime dependencies — native CSS + IntersectionObserver only. Adding any JS library
   (GSAP, etc.) is a reversal.
3. Existing content (sections, copy, links, images) preserved — removing a section is a reversal.
4. One unit: exactly the 3 existing files; no build step, no component-file splitting.
5. Top-bar nav replaces sidebar (markup + CSS).
6. Inter Tight + Inter via Google Fonts.
7. The 7 animation pieces, all reduced-motion gated (WCAG).
8. WCAG AA contrast + existing ARIA/skip-link patterns hold.
