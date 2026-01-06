---
"@officesdk/design": patch
"@officesdk/design-components": patch
---

Add custom styled utility with automatic global theme injection

- Implement styled utility that automatically injects global theme via defaultProps getter
- Theme is accessible even outside UIConfigProvider (e.g., in portals, separate React.render)
- Migrate all components to use custom styled utility instead of direct styled-components import
- Add comprehensive tests for styled utility
- Export styled and getGlobalTheme utilities

