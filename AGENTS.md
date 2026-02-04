# Repository Guidelines

## Project Structure & Module Organization

- `packages/components/` houses the React component library (source in `packages/components/src/`).
- `packages/theme/`, `packages/icons/`, `packages/utils/`, and `packages/design/` hold shared theming, icon assets, utilities, and the bundled design package.
- `docs/` contains MDX documentation; `.storybook/` contains Storybook configuration.
- Component tests live next to components, e.g. `packages/components/src/Button/__tests__/`.

## Build, Test, and Development Commands

- `yarn dev`: run Storybook at `http://localhost:6006`.
- `yarn build`: build all workspace packages; also builds `packages/design`.
- `yarn test`: run Vitest once; `yarn test:watch` for watch mode; `yarn test:ui` for the UI runner.
- `yarn lint` / `yarn lint:fix`: run ESLint (TypeScript/React).
- `yarn format` / `yarn format:check`: run Prettier for `ts/tsx/json/md/mdx`.
- `yarn type-check`: run `tsc --noEmit`.
- `yarn validate`: lint + type-check + tests in one pass.

## Coding Style & Naming Conventions

- Indentation: 2 spaces (see `.editorconfig` and `.prettierrc.json`).
- Language: TypeScript + React; styling via `styled-components`.
- File naming: component folders in PascalCase (e.g. `Button/`), component files in PascalCase (e.g. `Button.tsx`).
- Prefer named exports from each package `index.ts`.

## Testing Guidelines

- Framework: Vitest with Testing Library and `jsdom`.
- Name tests using `*.test.tsx` or `__tests__/` patterns alongside components.
- For UI changes, add or update stories in `*.stories.tsx` and keep tests colocated.

## Commit & Pull Request Guidelines

- Commit style follows Conventional Commits with optional scope, e.g. `feat(Modal): add variant support` or `fix(Button): align icon sizes`.
- Add a Changeset for user-facing changes: `yarn changeset` adds files in `.changeset/`.
- PRs should include: a clear description, linked issues if applicable, and screenshots or Storybook links for UI changes.

## Environment & Tooling

- Node >= 20 and Yarn >= 4 are required (`package.json` engines).
- Husky + lint-staged run formatting and lint fixes on staged files.
