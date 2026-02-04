import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent',
        icon: false,
        svgo: false,
      },
    }),
  ] as any,
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.stories.tsx',
        '**/*.d.ts',
        '**/index.ts',
        '**/__tests__/**',
        '**/test-utils.tsx',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 65,
        statements: 70,
      },
    },
  },
  resolve: {
    alias: {
      '@officesdk/design/theme': path.resolve(__dirname, './packages/theme/src/index.ts'),
      '@officesdk/design/utils': path.resolve(__dirname, './packages/utils/src/index.ts'),
      '@officesdk/design/icons': path.resolve(__dirname, './packages/icons/src/index.ts'),
      '@officesdk/design': path.resolve(__dirname, './packages/components/src'),
    },
  },
});

