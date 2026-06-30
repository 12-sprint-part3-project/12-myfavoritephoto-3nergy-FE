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
- 색상 변경: \`className\`으로 토큰 지정 (예: \`<CloseIcon className="text-main" />\`)

**주의사항**
> viewBox가 24보다 작은 아이콘 (예: CloseIcon - 14x14)은 기본 크기 설정으로 인해 디자인 시안보다 크게 보일 수 있습니다. 이 경우 width, height prop으로 직접 크기를 지정해주세요.

---


> **부모의 상태 기반 클래스는 SVG에 상속되지 않습니다**: \`disabled:\`, \`hover:\`, \`group-hover:\` 등 상태 기반 클래스는 부모에서 자식 SVG로 상속되지 않습니다. SVG에 직접 조건부 className을 적용해주세요.

\`\`\`jsx
// 부모의 상태 기반 클래스는 SVG에 미적용
<button disabled className="disabled:text-gray-400">
  <Icon />
</button>
\`\`\`

\`\`\`jsx
// 아이콘에 직접 조건부 className 적용
<button disabled>
  <Icon className={isDisabled ? 'text-gray-400' : 'text-white'} />
</button>
\`\`\`

`,
      },
    },
  },
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
