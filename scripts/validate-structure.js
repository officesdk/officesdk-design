#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const COMPONENTS_DIR = path.join(__dirname, '../packages/components/src');

function validateComponentStructure() {
  const errors = [];
  const warnings = [];

  // Get all component directories
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
  const componentDirs = entries.filter(entry =>
    entry.isDirectory() &&
    !entry.name.startsWith('_') &&
    entry.name !== '__tests__'
  );

  componentDirs.forEach(dir => {
    const componentPath = path.join(COMPONENTS_DIR, dir.name);
    const componentName = dir.name;

    // Check naming convention: directories should be PascalCase or kebab-case
    if (!/^[A-Z][a-zA-Z]*$/.test(componentName) && !/^[a-z]+(-[a-z]+)*$/.test(componentName)) {
      errors.push(`[ERROR] ${componentName}: Directory name must be PascalCase or kebab-case`);
    }

    // Check required files
    const requiredFiles = [
      'index.ts',
      `${componentName}.tsx`,
      `${componentName}.stories.tsx`,
      '__tests__'
    ];

    requiredFiles.forEach(file => {
      const filePath = path.join(componentPath, file);
      if (!fs.existsSync(filePath)) {
        warnings.push(`[WARN] ${componentName}: Missing ${file}`);
      }
    });

    // Check for default exports in component files
    const componentFile = path.join(componentPath, `${componentName}.tsx`);
    if (fs.existsSync(componentFile)) {
      const content = fs.readFileSync(componentFile, 'utf-8');
      if (/export\s+default\s+/m.test(content)) {
        errors.push(`[ERROR] ${componentName}.tsx: Default export is prohibited. Use named exports only.`);
      }
    }

    // Check test files
    const testsDir = path.join(componentPath, '__tests__');
    if (fs.existsSync(testsDir)) {
      const testFiles = fs.readdirSync(testsDir).filter(f => f.endsWith('.test.tsx'));
      if (testFiles.length === 0) {
        warnings.push(`[WARN] ${componentName}: No test files found in __tests__/`);
      }
    }
  });

  return { errors, warnings };
}

// Run validation
console.log('Validating component structure...\n');

const { errors, warnings } = validateComponentStructure();

if (warnings.length > 0) {
  console.log('Warnings:');
  warnings.forEach(w => console.log(w));
  console.log('');
}

if (errors.length > 0) {
  console.log('Errors:');
  errors.forEach(e => console.log(e));
  console.log('');
  console.log('[FAILED] Component structure validation failed!');
  process.exit(1);
}

console.log('[PASSED] Component structure validation passed!');

