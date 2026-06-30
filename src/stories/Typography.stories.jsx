const meta = {
  title: 'Foundation/Typography',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `프로젝트에서 사용하는 Typography Token 목록입니다.

**네이밍 규칙**
\`\`\`
text-{font}-{size}-{weight}
\`\`\`

**사용 예시**
\`\`\`jsx
{/* Baskin 폰트: font-baskin-base와 함께 사용 */}
<h1 className="font-baskin-base text-baskin-62-bold">제목</h1>

{/* Noto Sans: body에 기본 적용되어 있으므로 토큰만 사용 */}
<p className="text-noto-24-regular">본문</p>
\`\`\`

**주의사항**
> Baskin 폰트는 반드시 \`font-baskin-base\` 클래스와 함께 사용해야 합니다. \`font-baskin-base\`에 \`font-family\`와 \`letter-spacing: -0.03em\`이 포함되어 있습니다.
`,
      },
    },
  },
};

export default meta;

const baskinTokens = [
  { token: 'text-baskin-62-bold', size: '62px / 3.875rem', weight: 'Bold' },
  { token: 'text-baskin-48-bold', size: '48px / 3rem', weight: 'Bold' },
  { token: 'text-baskin-46-bold', size: '46px / 2.875rem', weight: 'Bold' },
  { token: 'text-baskin-40-bold', size: '40px / 2.5rem', weight: 'Bold' },
  { token: 'text-baskin-32-bold', size: '32px / 2rem', weight: 'Bold' },
  { token: 'text-baskin-28-bold', size: '28px / 1.75rem', weight: 'Bold' },
  { token: 'text-baskin-24-bold', size: '24px / 1.5rem', weight: 'Bold' },
  { token: 'text-baskin-20-bold', size: '20px / 1.25rem', weight: 'Bold' },
  { token: 'text-baskin-18-bold', size: '18px / 1.125rem', weight: 'Bold' },
];

const notoTokens = [
  { token: 'text-noto-40-bold', size: '40px / 2.5rem', weight: 'Bold' },
  { token: 'text-noto-32-bold', size: '32px / 2rem', weight: 'Bold' },
  { token: 'text-noto-28-bold', size: '28px / 1.75rem', weight: 'Bold' },
  { token: 'text-noto-24-bold', size: '24px / 1.5rem', weight: 'Bold' },
  { token: 'text-noto-24-regular', size: '24px / 1.5rem', weight: 'Regular' },
  { token: 'text-noto-22-bold', size: '22px / 1.375rem', weight: 'Bold' },
  { token: 'text-noto-20-bold', size: '20px / 1.25rem', weight: 'Bold' },
  { token: 'text-noto-20-regular', size: '20px / 1.25rem', weight: 'Regular' },
  { token: 'text-noto-18-bold', size: '18px / 1.125rem', weight: 'Bold' },
  { token: 'text-noto-18-regular', size: '18px / 1.125rem', weight: 'Regular' },
  { token: 'text-noto-18-light', size: '18px / 1.125rem', weight: 'Light' },
  { token: 'text-noto-16-bold', size: '16px / 1rem', weight: 'Bold' },
  { token: 'text-noto-16-regular', size: '16px / 1rem', weight: 'Regular' },
  { token: 'text-noto-16-light', size: '16px / 1rem', weight: 'Light' },
  { token: 'text-noto-14-bold', size: '14px / 0.875rem', weight: 'Bold' },
  { token: 'text-noto-14-regular', size: '14px / 0.875rem', weight: 'Regular' },
  { token: 'text-noto-14-light', size: '14px / 0.875rem', weight: 'Light' },
  { token: 'text-noto-12-bold', size: '12px / 0.75rem', weight: 'Bold' },
  { token: 'text-noto-12-regular', size: '12px / 0.75rem', weight: 'Regular' },
  { token: 'text-noto-12-light', size: '12px / 0.75rem', weight: 'Light' },
  { token: 'text-noto-10-regular', size: '10px / 0.625rem', weight: 'Regular' },
  { token: 'text-noto-10-light', size: '10px / 0.625rem', weight: 'Light' },
];

const TypographyRow = ({ token, size, weight, isBaskin = false }) => (
  <div className="flex items-center gap-8 border-b border-gray-500 py-4">
    <div className="w-64 shrink-0">
      <span className="text-noto-12-regular text-gray-300">{token}</span>
      <div className="mt-0.5 text-noto-12-regular text-gray-400">
        {size} · {weight}
      </div>
    </div>
    <p className={`${token} text-white ${isBaskin ? 'font-baskin-base' : ''}`}>
      가나다라마바사 ABCDEFabcdef 123456
    </p>
  </div>
);

export const Baskin = {
  parameters: {
    docs: {
      source: { code: null },
      description: {
        story:
          'Baskin 폰트 토큰 목록입니다. 반드시 `font-baskin-base`와 함께 사용하세요.',
      },
    },
  },
  render: () => (
    <div className="bg-black p-8">
      {baskinTokens.map((item) => (
        <TypographyRow key={item.token} {...item} isBaskin />
      ))}
    </div>
  ),
};

export const NotoSans = {
  parameters: {
    docs: {
      source: { code: null },
      description: {
        story:
          'Noto Sans 폰트 토큰 목록입니다. body에 기본 적용되어 있으므로 토큰 클래스만 사용하면 됩니다.',
      },
    },
  },
  render: () => (
    <div className="bg-black p-8">
      {notoTokens.map((item) => (
        <TypographyRow key={item.token} {...item} />
      ))}
    </div>
  ),
};
