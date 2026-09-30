# Application Design — GSAP Dark-Chalkboard Restyle

## Why this shape

The site is a resume rendered as one flat page. It already has the Spry default shape: plain
HTML/CSS/JS, no build, no framework, no dependencies. A restyle needs no new structure — the
simplest design that fits is "the same three files, with a new visual system." Nothing earned
a decomposition, a new file layout, or a runtime library, so none is added. This keeps the
change small and fully reversible: the diff is a token swap, a nav restructure, and an
animation layer wired onto existing hooks.

## Visual system (from GSAP's DESIGN.md, adapted)

Dark chalkboard stage: near-black canvas `#0e100f`, warm cream text `#fffce1` (deliberately
not pure white — GSAP's warmth), hairline dividers `#42433d`, muted `#7c7c6f`, off-black
panels `#191919` for alternating rhythm. One chromatic voice: the green gradient
`#88e788→#dfffd1`, reserved for the CTA stroke and hover accents — color as punctuation, not
decoration. Ghost-pill controls (100px radius, 1px cream border), cards at 8px, tags at 8px,
no drop shadows except the CTA's glow.

Type is the hero: Inter Tight for display, oversized with aggressive negative tracking so the
name reads carved rather than laid out; Inter for body at 16–19px with ~1.15 line-height.
Section eyebrows render as `{ About }`, `{ Experience }` — GSAP's curly-bracket motif, done in
CSS so the HTML stays clean.

## Layout

The fixed blue sidebar becomes a slim full-width top bar: monogram + name on the left, section
links spread across the width, socials at the end. Mobile collapses into the existing toggle
menu (same ids, same JS). Main content spans the viewport with the same max-width rhythm as
today (~1180px), 80px section gaps, alternating `#0e100f`/`#191919` bands.

## Animation contract

All animation is native CSS + one IntersectionObserver in `js/main.js`; every piece is killed
by the existing `prefers-reduced-motion` rule.

1. **Hero entrance** — eyebrow, name, lead, meta, CTA rise with staggered delays on load.
2. **Scroll reveals** — `.reveal` elements fade + rise 24px when 15% visible; stagger through
   a `--reveal-delay` custom property so cards cascade.
3. **Timeline draw** — a dedicated line element scales from 0 as the Experience section
   scrolls into view.
4. **Card hovers** — lift 6px, image zoom 1.05, border + soft glow shifts to the green accent.
5. **Chip stagger** — skills chips reveal in sequence after their band reveals.
6. **Marquee** — technologies strip, duplicated for a seamless loop, pauses on hover.
7. **Modal transitions** — dialog fades/scales in via CSS on `[open]`; close gets a small JS
   helper (add class → wait animationend → `close()`), keeping the existing backdrop-click and
   Escape behavior intact.

## What is removed

The blue token set, the fixed-sidebar layout rules, the `prefers-color-scheme` dark override
block and its scattered component-level dark rules, `.section--blue`, old shadows and radii.

## Why no component/service files

The design produced exactly one deployable page with no internal service boundaries —
`components.md` / `component-dependency.md` / `services.md` are not generated because there
are no components as separately-deployed units to document. (GSAP-style single canvas.)
