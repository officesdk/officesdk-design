---
'@officesdk/design': patch
---

Refactor icon system and add 60+ new icons

- Add 60+ SVG icons (arrows, text, table, status, utility, etc.)
- Improve icon registry with `createIconRegistry` for tree-shaking support
- Improve component icon registration with `registerComponentIcons`
- Improve SVG import support with vite-plugin-svgr
- Standardize icon size from 16x16 to 20x20 (check, undo, redo)
