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

// Copy sub-package dist directories
const subPackages = ['components', 'theme', 'utils', 'icons'];

subPackages.forEach((pkg) => {
  const srcDir = path.join(packagesDir, pkg, 'dist');
  const destDir = path.join(distDir, pkg);

  if (fs.existsSync(srcDir)) {
    fs.cpSync(srcDir, destDir, { recursive: true });
    console.log(`Copied ${pkg}/dist to dist/${pkg}`);
  } else {
    console.warn(`Warning: ${pkg}/dist not found`);
  }
});

// Create main index files that re-export from components
const indexContent = `// Re-export all components
export * from './components/index.mjs';
`;

const indexCjsContent = `// Re-export all components
module.exports = require('./components/index.js');
`;

const indexDtsContent = `// Re-export all components
export * from './components/index';
`;

fs.writeFileSync(path.join(distDir, 'index.mjs'), indexContent);
fs.writeFileSync(path.join(distDir, 'index.js'), indexCjsContent);
fs.writeFileSync(path.join(distDir, 'index.d.ts'), indexDtsContent);
fs.writeFileSync(path.join(distDir, 'index.d.mts'), indexDtsContent);

console.log('Meta-package build complete');
console.log('Bundled: components, theme, utils, icons');

