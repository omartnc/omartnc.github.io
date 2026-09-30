# System Overview — Reverse Engineering (brownfield, proportional)

Static single-page developer portfolio. No build step, no package manifest, no CI pipeline —
GitHub Pages serves `index.html` directly.

## Business Context
The page IS the resume: one flat document whose sections follow the natural reading order of a
CV — About/Hero → Experience → Portfolio (9 employer work cards) → Personal Projects (3 cards
+ `<dialog>` modals with galleries) → Skills (grouped chips) → Education → Contact. Audience:
recruiters and potential clients.

## Structure
| File | Role |
|---|---|
| `index.html` | All markup; SVG icon sprite; skip link; sidebar nav + mobile toggle; 3 project dialogs |
| `css/main.css` | Token-based design system (blue identity), component styles, responsive breakpoints, light/dark via `prefers-color-scheme`, `prefers-reduced-motion` support |
| `js/main.js` | IIFE: mobile menu, scrollspy (IntersectionObserver), dialog open/close/backdrop, footer year |

## Technology Stack
- Plain HTML/CSS/JS (ES5-style). Zero dependencies. No framework, no build.

## Conceptual-Model Fit
- **Fit is good.** One document, sections in business order, markup mirrors the resume model
  directly. No adapter layers, no translation between mismatched representations.
- **Accommodation cost — the one hotspot:** dual light/dark theming. Two full token sets in
  `:root` plus a `prefers-color-scheme: dark` override block, and scattered component-level
  dark overrides (e.g. `.timeline__date` color). Every future style change is paid twice.
  A fixed dark canvas (the GSAP chalkboard direction) collapses this to one token set.
- **Inherited protection-tax:** none material. The site already has the Spry default shape —
  no framework, no build tooling. Do not import one.
- **Optionality:** tokens are centralized (`:root`), so a reskin is cheap. Structural
  decisions that cost: the fixed 16.5rem sidebar layout (HTML nav + several CSS blocks
  depend on it). The `<dialog>` modals and IO scrollspy can be reused as-is.

## Existing motion inventory
- Card hover lift + image zoom; social icon hover; scrollspy highlight. `prefers-reduced-motion`
  already globally reduces animation/transition durations — keep this.

## Current accessibility baseline (keep)
- Skip link, `aria-current` nav state, `aria-expanded` toggle, `aria-labelledby` dialogs,
  `loading="lazy"` images, visible focus rings, contrast-checked token pairs.
