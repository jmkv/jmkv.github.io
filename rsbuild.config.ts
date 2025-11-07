import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  output: {
    distPath: {
      root: '',
    }
  },
  plugins: [pluginReact(), pluginSass(), pluginTailwindCSS()],
  tools: {
    postcss: {
      postcssOptions: {
        plugins: [
          tailwindcss({
            content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
          }),
        ],
      },
    },
  },
});
