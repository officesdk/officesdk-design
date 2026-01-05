import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    outDir: 'dist/cjs',
    dts: false,
    sourcemap: true,
    clean: true,
    treeshake: true,
  },
  {
    entry: ['src/index.ts'],
    format: ['esm'],
    outDir: 'dist/esm',
    dts: {
      resolve: true,
    },
    sourcemap: true,
    clean: false,
    treeshake: true
  },
]);



