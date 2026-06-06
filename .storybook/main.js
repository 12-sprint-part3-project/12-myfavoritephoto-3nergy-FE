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

    const svgrLoader = {
      loader: '@svgr/webpack',
      options: {
        // viewBox 기준 크기 조절 활성화
        icon: true,
        svgProps: {
          width: 24, // 기본 width 설정
          height: 24, // 기본 height 설정
          focusable: 'false', // 스크린리더에서 SVG 무시
        },
        svgoConfig: {
          plugins: [
            {
              name: 'convertColors',
              params: {
                // 모든 색상을 currentColor로 변환
                currentColor: true,
              },
            },
          ],
        },
      },
    };

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
          use: [svgrLoader],
        },
      );
    } else {
      // SVG 룰 자체가 없으면 바로 추가
      config.module.rules.push({
        test: /\.svg$/i,
        use: [svgrLoader],
      });
    }

    return config;
  },
};
export default config;
