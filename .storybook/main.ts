import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import svgr from 'vite-plugin-svgr';

// Safely get directory path, works in both ESM and CommonJS
const getDirname = () => {
  if (typeof __dirname !== 'undefined') {
    return __dirname;
  }
  return dirname(fileURLToPath(import.meta.url));
};

const currentDir = getDirname();

const config: StorybookConfig = {
  stories: ['../docs/**/*.mdx', '../packages/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      base: process.env.NODE_ENV === 'production' ? '/officesdk-design/' : '/',
      plugins: [
        svgr({
          include: '**/*.svg',
          svgrOptions: {
            exportType: 'named',
            namedExport: 'ReactComponent',
            icon: false,
            svgo: false,
          },
        }),
      ],
      resolve: {
        preserveSymlinks: true,
        dedupe: ['react', 'react-dom', 'styled-components'],
        alias: {
          'styled-components': path.resolve(currentDir, '../node_modules/styled-components'),
          react: path.resolve(currentDir, '../node_modules/react'),
          'react-dom': path.resolve(currentDir, '../node_modules/react-dom'),
          'react/jsx-runtime': path.resolve(currentDir, '../node_modules/react/jsx-runtime'),
          // Resolve workspace packages to their source files for Storybook
          '@officesdk/design/theme': path.resolve(currentDir, '../packages/theme/src/index.ts'),
          '@officesdk/design/utils': path.resolve(currentDir, '../packages/utils/src/index.ts'),
          '@officesdk/design/icons': path.resolve(currentDir, '../packages/icons/src/index.ts'),
        },
      },
    });
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return !prop.parent.fileName.includes('node_modules');
        }
        return true;
      },
    },
  },
};

export default config;
