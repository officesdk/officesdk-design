#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// This is a meta-package that bundles all sub-packages
// Copy dist files from sub-packages to this package

const distDir = path.join(__dirname, 'dist');
const packagesDir = path.join(__dirname, '..');

// Clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Create cjs and esm directories
const cjsDir = path.join(distDir, 'cjs');
const esmDir = path.join(distDir, 'esm');
fs.mkdirSync(cjsDir, { recursive: true });
fs.mkdirSync(esmDir, { recursive: true });

// Copy sub-package dist directories
const subPackages = ['components', 'theme', 'utils', 'icons'];

subPackages.forEach((pkg) => {
  const srcCjsDir = path.join(packagesDir, pkg, 'dist', 'cjs');
  const srcEsmDir = path.join(packagesDir, pkg, 'dist', 'esm');
  const destCjsDir = path.join(cjsDir, pkg);
  const destEsmDir = path.join(esmDir, pkg);

  if (fs.existsSync(srcCjsDir)) {
    fs.cpSync(srcCjsDir, destCjsDir, { recursive: true });
    console.log(`Copied ${pkg}/dist/cjs to dist/cjs/${pkg}`);
  } else {
    console.warn(`Warning: ${pkg}/dist/cjs not found`);
  }

  if (fs.existsSync(srcEsmDir)) {
    fs.cpSync(srcEsmDir, destEsmDir, { recursive: true });
    console.log(`Copied ${pkg}/dist/esm to dist/esm/${pkg}`);
  } else {
    console.warn(`Warning: ${pkg}/dist/esm not found`);
  }
});

// Create main index files that re-export from components
const indexEsmContent = `// Re-export all components
export * from './components/index.mjs';
`;

const indexCjsContent = `// Re-export all components
module.exports = require('./components/index.js');
`;

const indexDtsContent = `// Re-export all components
export * from './components/index';
`;

fs.writeFileSync(path.join(esmDir, 'index.mjs'), indexEsmContent);
fs.writeFileSync(path.join(cjsDir, 'index.js'), indexCjsContent);
fs.writeFileSync(path.join(esmDir, 'index.d.ts'), indexDtsContent);
fs.writeFileSync(path.join(esmDir, 'index.d.mts'), indexDtsContent);

console.log('Meta-package build complete');
console.log('Bundled: components, theme, utils, icons');

