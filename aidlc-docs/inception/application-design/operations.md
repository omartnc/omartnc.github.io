# Operations — static portfolio site

No API, no services, no server. The site's "operations" are its page-level verbs, all
client-side:

| Verb | Shape | Notes |
|---|---|---|
| Navigate | top-bar section links → anchors (`#about`…`#contact`) | scrollspy highlights current section |
| ViewProject | work card / project card → `<dialog>` gallery modal | Esc, backdrop click, and ✕ all close |
| ViewPortfolio | hero CTA "View Portfolio" → scrolls to `#portfolio` | gradient-stroked ghost pill |
| Contact | email card (`mailto:`), LinkedIn / GitHub links | unchanged |
