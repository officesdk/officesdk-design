# NPM Publishing Setup Guide

This guide helps you set up NPM publishing for @officesdk/design.

## Prerequisites

- NPM account (https://www.npmjs.com/)
- GitHub repository with admin access
- Node.js and Yarn installed locally

## Step 1: Create NPM Account

1. Go to https://www.npmjs.com/signup
2. Create an account or login
3. Verify your email address

## Step 2: Create NPM Organization (Optional)

If publishing under `@officesdk` scope:

1. Go to https://www.npmjs.com/org/create
2. Create organization named `officesdk`
3. Or request access if it already exists

## Step 3: Generate NPM Token

### Option A: Using NPM CLI

```bash
# Login to NPM
npm login

# Create automation token
npm token create --type automation

# Copy the token (starts with npm_...)
```

### Option B: Using NPM Website

1. Go to https://www.npmjs.com/settings/YOUR_USERNAME/tokens
2. Click "Generate New Token"
3. Select "Automation" type
4. Copy the token

**Important**: Save this token securely, you won't see it again!

## Step 4: Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to: Settings Secrets and variables Actions
3. Click "New repository secret"
4. Name: `NPM_TOKEN`
5. Value: Paste your NPM token
6. Click "Add secret"

## Step 5: Verify Package Configuration

Check `package.json`:

```json
{
  "name": "@officesdk/design",
  "version": "0.1.0",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "files": [
    "packages/components/dist",
    "packages/theme/dist",
    "packages/utils/dist",
    "packages/icons/dist",
    "packages/*/package.json",
    "packages/*/README.md",
    "LICENSE"
  ]
}
```

## Step 6: Test Local Publishing (Dry Run)

```bash
# Build packages
yarn build

# Test what will be published
npm pack --dry-run

# Check the output
# Should include all dist folders and necessary files
```

## Step 7: Manual First Publish (Optional)

For the first publish, you might want to do it manually:

```bash
# 1. Ensure you're on main branch
git checkout main
git pull

# 2. Build everything
yarn build

# 3. Login to NPM
npm login

# 4. Publish
npm publish --access public

# 5. Verify
npm info @officesdk/design
```

## Step 8: Enable GitHub Pages (for Storybook)

1. Go to: Settings Pages
2. Source: GitHub Actions
3. Save

After the next push to main, Storybook will be deployed to:
`https://officesdk.github.io/officesdk-design`

## Step 9: Test Automated Release

```bash
# 1. Create a test changeset
yarn changeset
# Select: @officesdk/design
# Type: patch
# Summary: "Test automated release"

# 2. Commit and push
git add .
git commit -m "chore: test automated release"
git push origin main

# 3. Check GitHub Actions
# Go to: Actions tab in GitHub
# Watch the "Release" workflow

# 4. Verify
# - Version PR should be created
# - Merge it to trigger publish
# - Check NPM for new version
```

## Troubleshooting

### Issue: "You do not have permission to publish"

**Solution**:

- Verify you're a member of @officesdk organization
- Check package name is available
- Ensure `publishConfig.access` is "public"

### Issue: "Invalid token"

**Solution**:

- Regenerate NPM token
- Update GitHub secret
- Ensure token type is "Automation"

### Issue: "Package name already exists"

**Solution**:

- Choose a different package name
- Or request access to existing package

### Issue: GitHub Actions fails

**Solution**:

- Check NPM_TOKEN secret is set correctly
- Verify token has publish permissions
- Check build succeeds locally
- Review GitHub Actions logs

## Security Best Practices

1. **Never commit NPM tokens** to git
2. **Use automation tokens** for CI/CD
3. **Enable 2FA** on NPM account
4. **Regularly rotate tokens** (every 90 days)
5. **Limit token scope** to specific packages if possible

## Monitoring

After setup, monitor:

- NPM download stats: https://npm-stat.com/charts.html?package=@officesdk/design
- GitHub Actions: Check for failed workflows
- NPM package page: https://www.npmjs.com/package/@officesdk/design

## Next Steps

After successful setup:

1.  Test the full release workflow
2.  Document the process for team
3.  Set up monitoring/alerts
4.  Plan release schedule
5.  Announce first release

## Support

For issues with NPM publishing:

- NPM Support: https://www.npmjs.com/support
- GitHub Actions Docs: https://docs.github.com/en/actions
- Changesets Docs: https://github.com/changesets/changesets
