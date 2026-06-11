import { svgrOptions } from './svgr.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack(config) {
    // 기존 webpack 규칙 중 SVG를 처리하는 규칙을 찾음
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // ?url 형태로 svg를 import하는 경우에만 기존 규칙(URL) 적용
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // 그 외 SVG import는 SVGR로 React 컴포넌트로 변환
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [{ loader: '@svgr/webpack', options: svgrOptions }],
      },
    );

    // 기존 SVG 규칙은 위 두 규칙이 대신 처리하므로 제외
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
