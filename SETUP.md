# Project Setup Guide

## Prerequisites

- Node.js >= 20.0.0
- Yarn >= 4.0.0

## Installation

### 1. Enable Corepack

```bash
corepack enable
```

### 2. Install Dependencies

```bash
yarn install
```

## Development

### Start Development Server

```bash
yarn dev
```

This will start Storybook at http://localhost:6006

### Build Packages

```bash
yarn build
```

### Type Check

```bash
yarn type-check
```

### Lint Code

```bash
yarn lint
```

### Clean Build Artifacts

```bash
yarn clean
```

## Troubleshooting

### Issue 1: Yarn Version Mismatch

**Problem**: Error about packageManager version mismatch

**Solution**:

```bash
corepack enable
corepack prepare yarn@4.9.1 --activate
```

### Issue 2: Module Resolution Errors

**Problem**: Storybook fails to resolve modules

**Solution**:

- Make sure `nodeLinker: node-modules` is set in `.yarnrc.yml`
- Clean and reinstall:

```bash
rm -rf node_modules
yarn install
```

### Issue 3: Peer Dependencies Warnings

**Problem**: Missing peer dependencies warnings

**Solution**:
Ensure all packages have correct `peerDependencies` declared in their `package.json`.

### Issue 4: Build Errors

**Problem**: TypeScript compilation errors during build

**Solution**:

1. Make sure all dependencies are installed
2. Build packages in order:

```bash
cd packages/utils && yarn build
cd ../theme && yarn build
cd ../components && yarn build
```

## Configuration

### Yarn Configuration (.yarnrc.yml)

```yaml
nodeLinker: node-modules
enableGlobalCache: false
yarnPath: .yarn/releases/yarn-4.9.1.cjs
```

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. Each package has its own `tsconfig.json` that extends the root configuration.

## Package Structure

```
officesdk-ui/
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] packages/
[EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] components/     # UI components
[EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] theme/          # Theme system
[EMOJI][EMOJI]�   [EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] utils/          # Utilities
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] docs/               # Documentation
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] .storybook/         # Storybook config
[EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI][EMOJI] package.json        # Root config
```

## Publishing

See [Publishing Guide](./PUBLISHING.md) for details on how to publish packages to npm.
