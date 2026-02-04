# @officesdk/design-icons

Built-in icon resources for OfficeSdk Design.

## Installation

This package is included in `@officesdk/design` and doesn't need to be installed separately.

## Usage

```typescript
import { Icon, IconProvider } from '@officesdk/design';
import { iconRegistry } from '@officesdk/design/icons';

// Use with IconProvider
<IconProvider icons={iconRegistry}>
  <Icon name="close" size={16} />
</IconProvider>
```

## Adding New Icons

### Step 1: Add SVG File

Place your SVG file in the appropriate category folder under `src/svg/`:

```bash
src/svg/
├── arrows/       # Directional icons (arrow-*, chevron-*)
├── general/      # Common actions (check, close, copy, delete, etc.)
├── image/        # Image manipulation (rotate, flip, etc.)
├── main-site/    # Navigation icons (menu, settings, etc.)
├── status/       # Status indicators (success, error, warning, etc.)
├── table/        # Table operations (freeze, merge-cells, etc.)
├── text/         # Text formatting (bold, italic, align-*, etc.)
└── utility/      # Utility icons (fullscreen, refresh, more, etc.)
```

**SVG Requirements:**

- Use `kebab-case` for filenames (e.g., `arrow-down.svg`, `align-center.svg`)
- Use `currentColor` for stroke/fill to support color customization
- Keep consistent viewBox dimensions (typically 16x16 or 20x20)
- Use `fill="none"` on root `<svg>` element for stroke-based icons

**Auto-normalization:**

The `generate:registry` script automatically normalizes SVG files:

| Original | Normalized | Purpose |
|----------|------------|---------|
| `fill="#52C41A"` | `fill="var(--icon-fill, #52C41A)"` | Enable color override via `color` prop |
| `fill="#41464B" fill-opacity="0.3"` | `fill="var(--icon-fill, rgba(65, 70, 75, 0.3))"` | Merge opacity into RGBA |
| `fill="none"` | *(preserved)* | Stroke-based icons |
| `fill="currentColor"` | *(preserved)* | Standard color inheritance |
| `fill="white"` / `#ffffff` | *(preserved)* | Inner elements (checkmarks, etc.) |

This allows icons with hardcoded colors to support the `color` prop while preserving their default appearance.

### Step 2: Generate Registry

Run the registry generator to update all related files:

```bash
yarn workspace @officesdk/design-icons generate:registry
```

This script automatically:

1. **Normalizes SVG files** - Applies the auto-normalization rules above
2. **Updates generated files:**
   - `src/icons.ts` - Icon component exports
   - `src/allIconRegistry.ts` - Complete registry for Storybook
   - `src/registry.ts` - Category arrays (ARROWS_ICONS, etc.)
   - `src/types.generated.ts` - TypeScript types
   - `src/index.ts` - Package exports
   - `Icon.stories.tsx` - Storybook imports and renders

### Step 3: Build and Verify

```bash
yarn build
yarn dev  # Check in Storybook
```

## Directory Structure

```bash
packages/icons/
├── src/
│   ├── svg/                    # SVG source files by category
│   ├── icons.ts                # [Generated] All icon component exports
│   ├── allIconRegistry.ts      # [Generated] Complete registry
│   ├── registry.ts             # Internal registry + category arrays
│   ├── createIconRegistry.ts   # Helper for tree-shakeable registries
│   ├── types.ts                # Core type definitions
│   ├── types.generated.ts      # [Generated] Icon name types
│   └── index.ts                # [Generated] Package exports
└── scripts/
    └── generate-registry.ts    # Registry generator script
```
