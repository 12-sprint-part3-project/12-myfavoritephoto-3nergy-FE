const meta = {
  title: 'Foundation/Colors',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `프로젝트에서 사용하는 Color Token 목록입니다.

**사용 원칙**
- 사전에 정의된 Token만 사용한다.
- 새로운 색상이 필요할 경우 임의의 HEX 값 대신 Token을 추가한다.
- 컴포넌트 내부에서 색상값을 직접 작성하지 않는다.

**사용 예시**
\`\`\`jsx
<div className="bg-main text-black" />
<div className="text-gray-300" />
\`\`\`
`,
      },
    },
  },
};

export default meta;

const colors = [
  { name: 'black', variable: '--color-black', hex: '#0f0f0f' },
  { name: 'gray-500', variable: '--color-gray-500', hex: '#161616' },
  { name: 'gray-400', variable: '--color-gray-400', hex: '#5a5a5a' },
  { name: 'gray-300', variable: '--color-gray-300', hex: '#a4a4a4' },
  { name: 'gray-200', variable: '--color-gray-200', hex: '#dddddd' },
  { name: 'gray-100', variable: '--color-gray-100', hex: '#eeeeee' },
  { name: 'white', variable: '--color-white', hex: '#ffffff' },
  { name: 'main', variable: '--color-main', hex: '#efff04' },
  { name: 'pink', variable: '--color-pink', hex: '#ff2a6a' },
  { name: 'purple', variable: '--color-purple', hex: '#a77eff' },
  { name: 'blue', variable: '--color-blue', hex: '#29c9f9' },
  { name: 'red', variable: '--color-red', hex: '#ff483d' },
];

const ColorSwatch = ({ name, variable, hex }) => (
  <div className="flex flex-col gap-2">
    <div
      className="h-16 w-full rounded-sm border border-gray-500"
      style={{ backgroundColor: hex }}
    />
    <div className="flex flex-col gap-0.5">
      <span className="text-noto-14-bold text-white">{name}</span>
      <span className="text-noto-12-regular text-gray-300">{variable}</span>
      <span className="text-noto-12-regular text-gray-300">{hex}</span>
    </div>
  </div>
);

export const AllColors = {
  parameters: {
    docs: {
      source: { code: null },
    },
  },
  render: () => (
    <div className="bg-black p-8">
      <div className="grid grid-cols-4 gap-6">
        {colors.map((color) => (
          <ColorSwatch key={color.name} {...color} />
        ))}
      </div>
    </div>
  ),
};
