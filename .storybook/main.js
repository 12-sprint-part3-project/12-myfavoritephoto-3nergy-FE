import { svgrOptions } from '../svgr.config.js';

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/nextjs',
  staticDirs: ['../public', '../src/app/fonts'],

  webpackFinal: async (config) => {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;

      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          resourceQuery: { not: [/url/] }, // ← fileLoaderRule.resourceQuery 안 씀
          use: [{ loader: '@svgr/webpack', options: svgrOptions }],
        },
      );
    } else {
      // SVG 룰 자체가 없으면 바로 추가
      config.module.rules.push({
        test: /\.svg$/i,
        use: [{ loader: '@svgr/webpack', options: svgrOptions }],
      });
    }

    return config;
  },
};
export default config;
