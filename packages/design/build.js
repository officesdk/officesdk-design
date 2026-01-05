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


console.log('Meta-package build complete');
console.log('Bundled: components, theme, utils, icons');

