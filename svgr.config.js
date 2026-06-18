const svgrOptions = {
  icon: true, // viewBox 기준 크기 조절 활성화
  svgProps: {
    width: 24, // 기본 width 설정
    height: 24, // 기본 height 설정
    className: 'text-white', // 기본 색상 white 설정
    focusable: 'false', // 스크린리더에서 SVG 무시
  },
  svgoConfig: {
    plugins: [
      {
        name: 'convertColors',
        params: { currentColor: true }, // 모든 색상을 currentColor로 변환
      },
    ],
  },
};

export { svgrOptions };
