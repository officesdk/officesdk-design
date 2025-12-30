# Quick Start Guide

## For Developers

### Setup

```bash
# Clone repository
git clone git@github.com:officesdk/ui.git
cd ui

# Install dependencies
yarn install

# Start development
yarn dev
```

### Daily Development

```bash
# 1. Create branch
git checkout -b feat/your-feature

# 2. Develop (Storybook auto-reloads)
yarn dev

# 3. Test
yarn test:ui

# 4. Commit (auto-validates)
git commit -m "feat: your feature"

# 5. Add changeset
yarn changeset

# 6. Push and create PR
git push origin feat/your-feature
```

### Available Commands

```bash
# Development
yarn dev                # Start Storybook
yarn test              # Run tests
yarn test:ui           # Test with UI
yarn test:coverage     # Coverage report

# Validation
yarn lint              # Check code
yarn lint:fix          # Fix issues
yarn format            # Format code
yarn type-check        # Check types
yarn validate          # Run all checks

# Build
yarn build             # Build all packages

# Release (maintainers only)
yarn changeset         # Add changeset
yarn changeset:version # Update versions
yarn changeset:publish # Publish to NPM
```

## For Maintainers

### First Time Setup

1. **Setup NPM Token**

   - Create automation token on npmjs.com
   - Add to GitHub Secrets as `NPM_TOKEN`
   - See [NPM Setup Guide](./docs/NPM-Setup.md)

2. **Enable GitHub Pages**

   - Go to Settings > Pages
   - Source: GitHub Actions
   - Save

3. **Test Release Workflow**
   - Create a test changeset
   - Push to main
   - Verify CI runs successfully

### Release Process

**Automatic (Recommended)**:

1. Contributors add changesets with their PRs
2. Merge PRs to main
3. Changesets bot creates "Version Packages" PR
4. Review and merge version PR
5. GitHub Actions publishes automatically

**Manual (Emergency)**:

```bash
git checkout main
git pull
yarn changeset:version
git add .
git commit -m "chore: version packages"
git push
yarn changeset:publish
git push --follow-tags
```

### Monitoring

- NPM: https://www.npmjs.com/package/@officesdk/ui
- Storybook: https://officesdk.github.io/ui
- CI/CD: https://github.com/officesdk/ui/actions

## Troubleshooting

### Pre-commit fails

```bash
# Skip hooks (emergency only)
git commit --no-verify

# Or fix the issues
yarn lint:fix
yarn format
```

### Tests fail

```bash
# Run specific test
yarn test ComponentName

# Debug with UI
yarn test:ui

# Check coverage
yarn test:coverage
```

### Build fails

```bash
# Clean and rebuild
yarn clean
yarn install
yarn build
```

### Type errors

```bash
# Check types
yarn type-check

# Rebuild theme (if theme types changed)
cd packages/theme
yarn build
```

## Quick Links

- [Contributing Guide](./CONTRIBUTING.md)
- [Release Process](./docs/Release.mdx)
- [NPM Setup](./docs/NPM-Setup.md)
- [Development Guide](./docs/Development.mdx)
