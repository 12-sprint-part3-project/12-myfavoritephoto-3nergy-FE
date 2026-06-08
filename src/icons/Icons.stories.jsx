import * as Icons from '@/icons';

const meta = {
  title: 'Assets/Icons',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `프로젝트에서 사용하는 아이콘 목록입니다.

**import 방법**
\`\`\`jsx
// 인덱스 파일에서 import (권장)
import { CloseIcon, SearchIcon } from '@/icons';

// 개별 파일에서 import
import CloseIcon from '@/icons/close.svg';
\`\`\`

- 기본 크기: 24x24 / 기본 색상: white
- 크기 변경: \`width\`, \`height\` prop 사용 (예: \`<CloseIcon width={32} height={32} />\`)
- 색상 변경: \`className\`으로 토큰 지정 (예: \`<CloseIcon className="text-main" />\`)`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-black p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const AllIcons = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      {Object.entries(Icons).map(([name, Icon]) => (
        <div key={name} className="flex flex-col items-center gap-2">
          <Icon />
          <span className="text-noto-12-regular text-gray-300">{name}</span>
        </div>
      ))}
    </div>
  ),
};
