import { defineConfig } from 'tsup';

const assetLoaders = {
  '.gif': 'dataurl' as const,
};

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs'],
    outDir: 'dist/cjs',
    dts: {
      resolve: true,
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@officesdk/editor-sdk-core/shared': [
            '../../node_modules/@officesdk/editor-sdk-core/types/shared.d.ts'
          ],
          '@officesdk/design/theme': ['../theme/src/index.ts'],
          '@officesdk/design/utils': ['../utils/src/index.ts'],
          '@officesdk/design/icons': ['../icons/src/index.ts'],
        },
      },
    },
    clean: true,
    sourcemap: true,
    loader: assetLoaders,
    external: [
      'react',
      'react-dom',
      'styled-components',
      'react/jsx-runtime',
      '@officesdk/design/theme',
      '@officesdk/design/utils',
      '@officesdk/design/icons',
    ],
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
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@officesdk/editor-sdk-core/shared': [
            '../../node_modules/@officesdk/editor-sdk-core/types/shared.d.ts'
          ],
          '@officesdk/design/theme': ['../theme/src/index.ts'],
          '@officesdk/design/utils': ['../utils/src/index.ts'],
          '@officesdk/design/icons': ['../icons/src/index.ts'],
        },
      },
    },
    clean: false,
    sourcemap: true,
    loader: assetLoaders,
    external: [
      'react',
      'react-dom',
      'styled-components',
      'react/jsx-runtime',
      '@officesdk/design/theme',
      '@officesdk/design/utils',
      '@officesdk/design/icons',
    ],
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
