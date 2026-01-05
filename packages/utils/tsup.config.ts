import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    outDir: 'dist/cjs',
    dts: {
      resolve: true,
    },
    clean: true,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    minify: false,
  },
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    outDir: 'dist/esm',
    dts: {
      resolve: true,
    },
    clean: false,
    sourcemap: true,
    treeshake: true,
    splitting: false,
    minify: false,
    outExtension() {
      return {
        js: '.js',
      };
    },
  },
]);



