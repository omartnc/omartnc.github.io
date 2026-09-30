# Build and Test Instructions — GSAP Dark-Chalkboard Restyle

## Build
No build step — static site. Open `index.html` directly or via any static server:
- Local: open `index.html` in a browser, or `python -m http.server` in the repo root.
- Deploy: push to `main` (GitHub Pages serves the repo root). Nothing else required.

## Verification checklist (run manually after changes)
1. Hero: `{ FULL-STACK SOFTWARE DEVELOPER }` eyebrow, oversized gradient name, CTA pill visible.
2. Marquee scrolls (36s loop), pauses on hover.
3. Scrolling reveals each section once (fade + rise); work cards/timeline items/chips stagger.
4. Experience timeline draws a green line on reveal.
5. Work-card hover: lift + image zoom + green border/glow.
6. Project dialogs animate open; close button/backdrop animate closed.
7. Mobile (≤991px): hamburger shows, menu expands/collapses; `aria-expanded` toggles.
8. `prefers-reduced-motion`: no animation, all content visible immediately.
9. Tab keyboard: skip link, nav underline focus ring (green outline) visible.

## Tests earned
None. The change is CSS reskin + wiring observers onto existing behavior — no new
branching logic. Browser verification above is the runnable check. (Spry: tests earn
themselves on named risk; no intricate logic was introduced.)

## Common failures
- Stale cache: hard-refresh (Ctrl+F5).
- Fonts missing: requires network for Google Fonts; system fallback still renders.
- Old CSS leftovers: none — blue tokens fully removed.
