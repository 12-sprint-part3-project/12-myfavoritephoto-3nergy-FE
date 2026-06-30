import { ScrollTopButton } from '@/components/layout/ScrollTopButton';

const meta = {
  title: 'Layout/ScrollTopButton',
  component: ScrollTopButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '페이지를 최상단으로 부드럽게 스크롤하는 플로팅 버튼입니다. 클릭 시 `window.scrollTo({ top: 0, behavior: "smooth" })`를 호출합니다.',
      },
    },
  },
};

export default meta;

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `<ScrollTopButton />`,
      },
    },
  },
  render: () => (
    <div className="flex h-[300px] items-end justify-end p-6">
      <ScrollTopButton />
    </div>
  ),
};
