import { SearchBar } from './SearchBar';

const meta = {
  title: 'UI/SearchBar',
  component: SearchBar,
  argTypes: {},
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '너비는 `w-full`이므로 래퍼 요소의 크기로 조절합니다.',
      },
    },
  },
};

export default meta;

export const Default = {
  args: {},
};

export const WithWrapper = {
  name: '너비 조절 예시',
  render: () => (
    <div className="w-[320px]">
      <SearchBar />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<div className="w-[320px]">
  <SearchBar />
</div>
        `,
      },
    },
  },
};
