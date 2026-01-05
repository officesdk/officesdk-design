import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    outDir: 'dist/cjs',
    dts: false,
    clean: true,
    sourcemap: true,
    external: ['react/jsx-runtime'],
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
    external: ['react/jsx-runtime'],
    treeshake: true,
    splitting: false,
    minify: false
  },
]);
