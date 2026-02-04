import { defineConfig } from 'tsup';
import { transform } from '@svgr/core';
import fs from 'fs';

/**
 * Custom esbuild plugin that transforms SVG files into React components
 * using @svgr/core. Preserves all original SVG attributes (width, height, colors).
 */
const svgrPlugin = {
  name: 'svgr',
  setup(build: any) {
    build.onLoad({ filter: /\.svg$/ }, async (args: any) => {
      const svg = await fs.promises.readFile(args.path, 'utf8');
      const contents = await transform(
        svg,
        {
          plugins: ['@svgr/plugin-jsx'],
          typescript: true,
          jsxRuntime: 'automatic',
          // Preserve all original attributes
          icon: false,
          svgo: false,
          exportType: 'named',
          namedExport: 'ReactComponent',
        },
        { filePath: args.path },
      );
      return {
        contents,
        loader: 'tsx',
      };
    });
  },
};

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    outDir: 'dist/cjs',
    sourcemap: true,
    clean: true,
    treeshake: true,
    esbuildPlugins: [svgrPlugin],
  },
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    outDir: 'dist/esm',
    sourcemap: true,
    clean: false,
    treeshake: true,
    esbuildPlugins: [svgrPlugin],
    outExtension() {
      return {
        js: '.js',
      };
    },
  },
]);
