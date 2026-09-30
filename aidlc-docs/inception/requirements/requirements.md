# Requirements — GSAP Dark-Chalkboard Restyle (minimal depth)

## Intent
Restyle the static portfolio to the GSAP dark-chalkboard design (styles.refero.design, GSAP
style) with a full native-animation layer. Reskin + motion pass — content is unchanged.

## Core Requirements
1. **Token reskin to GSAP chalkboard:** near-black canvas `#0e100f`, warm cream text `#fffce1`,
   off-black panel `#191919`, hairline dividers `#42433d`, muted text `#7c7c6f`, green accent
   (gradient `#88e788→#dfffd1` used for the CTA stroke and small accents only). Always dark —
   remove the `prefers-color-scheme` light/dark dual theming.
2. **Typography:** Google Fonts `Inter Tight` for display (oversized hero, tight tracking) and
   `Inter` for body/UI — closest free match to GSAP's Mori.
3. **Layout:** replace the fixed blue sidebar with a GSAP-style slim top bar; links spread
   across the full width; keep mobile toggle behavior.
4. **Animations (native CSS + IntersectionObserver, zero dependencies):**
   - Hero entrance (oversized name rises/slides in)
   - Scroll-reveal sections (fade + rise)
   - Timeline draw-in (experience line grows on scroll)
   - Card hovers (lift + image zoom + green border glow)
   - Skills chip stagger reveal
   - Marquee strip of technologies
   - Modal open/close transitions
   - All gated by the existing `prefers-reduced-motion` handling
5. **Content preserved:** all sections, copy, images, dialogs, external links stay as-is.
6. **Accessibility kept:** WCAG AA contrast (cream-on-black is high-contrast; green used for
   decoration/accents, never for sole meaning), visible focus rings, skip link, existing ARIA
   patterns unchanged.

## "Make it less dumb" findings (Step 2)
- GSAP's five-discipline color taxonomy (green/orange/pink/violet/blue) organizes GSAP's own
  product categories; it has no mapping to a resume. Collapsed to the single green accent.
- GSAP the *library* not needed — user chose zero-dependency native animation (site stays
  dependency-free, its current Spry-default shape).
- Dual light/dark theming collapsed to always-dark: deletes ~30 lines of token overrides plus
  scattered component-level dark rules — the accommodation-cost hotspot from reverse engineering.
- Marquee is decorative reinforcement of content already on the page (skills list); it is not
  the only place that content lives.

## Non-requirements (explicitly out)
- No build step, no package.json, no JS framework, no GSAP/other runtime library.
- No content/SEO copy changes, no new sections, no analytics.
- No light theme.
