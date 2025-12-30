# Contributing to @officesdk/ui

Thank you for your interest in contributing! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- Yarn >= 4.0.0

### Setup

```bash
# Clone the repository
git clone git@github.com:officesdk/ui.git
cd ui

# Install dependencies
yarn install

# Start development server
yarn dev
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feat/your-feature-name
```

Branch naming convention:

- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test updates
- `chore/` - Build/tooling changes

### 2. Make Changes

- Follow the [coding standards](#coding-standards)
- Add tests for new features
- Update Storybook stories
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with UI
yarn test:ui

# Check test coverage
yarn test:coverage

# Validate everything
yarn validate
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: your commit message"
```

**Commit Message Format** (Conventional Commits):

```
<type>(<scope>): <subject>

Examples:
feat(Button): add loading state
fix(Input): resolve focus issue
docs: update README
test(Dropdown): add interaction tests
```

Pre-commit hooks will automatically:

- Lint and format your code
- Run type checking
- Check for Chinese characters
- Validate commit message format

### 5. Add Changeset

```bash
yarn changeset
```

Follow the prompts:

1. Select `@officesdk/ui`
2. Choose version bump type (patch/minor/major)
3. Write a clear summary of changes

### 6. Push and Create PR

```bash
git push origin feat/your-feature-name
```

Create a pull request on GitHub with:

- Clear description of changes
- Screenshots/GIFs if applicable
- Link to related issues

## Coding Standards

### Component Structure

Each component must include:

```
ComponentName/
 index.ts              # Exports
 ComponentName.tsx     # Component logic
 ComponentName.stories.tsx  # Storybook stories
 __tests__/
     ComponentName.test.tsx  # Tests
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `SearchInput`)
- **Directories**: PascalCase or kebab-case (e.g., `Button`, `ui-config-provider`)
- **Files**: Match component name
- **Props interfaces**: `ComponentNameProps`

### Export Convention

**Always use Named Exports**, never Default Export:

```typescript
//  Good
export const Button = () => { ... };
export type ButtonProps = { ... };

// Bad
export default Button;
```

### TypeScript

- Use TypeScript for all code
- Define proper types for props
- Avoid `any` when possible (warnings are okay)
- Use `forwardRef` for components that need ref access

### Styling

- Use `styled-components`
- Access theme via `theme` prop
- Support all theme tokens
- Ensure responsive design

### Testing

- Write tests for all components
- Aim for >80% coverage
- Test user interactions
- Test accessibility
- Test edge cases

### Documentation

- Add JSDoc comments to components
- Include usage examples
- Document all props
- Create comprehensive Storybook stories

## Testing Guidelines

### Test Structure

```typescript
describe('ComponentName', () => {
  describe('Rendering', () => {
    it('should render with default props', () => {
      // ...
    });
  });

  describe('Interactions', () => {
    it('should handle click events', async () => {
      // ...
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      // ...
    });
  });
});
```

### What to Test

1. **Rendering**: Component renders correctly
2. **Props**: All props work as expected
3. **States**: Different states (disabled, error, etc.)
4. **Interactions**: User interactions work
5. **Accessibility**: Keyboard navigation, ARIA attributes
6. **Edge Cases**: Boundary conditions

## Documentation Guidelines

### Component Documentation

```typescript
/**
 * Button Component
 *
 * @example
 * // Basic button
 * <Button>Click me</Button>
 *
 * @example
 * // Button with icon
 * <Button iconBefore={<Icon />}>Click me</Button>
 */
export const Button: React.FC<ButtonProps> = ({ ... }) => {
  // ...
};
```

### Storybook Stories

Include these stories:

- `Default` - Basic usage
- `Sizes` - All size variants
- `States` - All states
- `Variants` - All variants
- `Playground` - Interactive playground

## Code Review Checklist

Before requesting review, ensure:

- [ ] Code follows style guidelines
- [ ] Tests added and passing
- [ ] Storybook stories added
- [ ] Types are properly defined
- [ ] Documentation updated
- [ ] Changeset added
- [ ] No Chinese characters in code
- [ ] No console.log statements
- [ ] Pre-commit hooks pass
- [ ] CI checks pass

## Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, package version
6. **Screenshots**: If applicable

## Suggesting Features

When suggesting features:

1. **Use Case**: Describe the use case
2. **Proposed Solution**: How it should work
3. **Alternatives**: Other solutions considered
4. **Examples**: Code examples or mockups

## Getting Help

- [Documentation](./docs/)
- [GitHub Discussions](https://github.com/officesdk/ui/discussions)
- [Issues](https://github.com/officesdk/ui/issues)

## Thank You

Thank you for contributing to @officesdk/ui!
