import { EmptyPhotocardList } from './EmptyPhotocardList';

const meta = {
  title: 'Domain/Photocard/EmptyPhotocardList',
  component: EmptyPhotocardList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full bg-black">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '포토카드 목록이 비어있을 때 표시하는 컴포넌트입니다. 검색/필터 적용 여부에 따라 문구가 달라집니다.',
      },
    },
  },
  argTypes: {
    isFiltered: {
      description: '검색 또는 필터 적용 여부',
      control: 'boolean',
    },
    emptyTitle: {
      description: '필터 미적용 상태의 제목',
      control: 'text',
    },
    emptyDescription: {
      description: '필터 미적용 상태의 설명',
      control: 'text',
    },
  },
};

export default meta;

export const EmptySearchResult = {
  args: {
    isFiltered: true,
    emptyTitle: '',
    emptyDescription: '',
  },
};

export const EmptySaleCandidate = {
  args: {
    isFiltered: false,
    emptyTitle: '판매 가능한 포토카드가 없습니다.',
    emptyDescription: '마이갤러리에서 포토카드를 생성해보세요.',
  },
};

export const EmptyMySales = {
  args: {
    isFiltered: false,
    emptyTitle: '등록된 판매 포토카드가 없습니다.',
    emptyDescription: '포토카드를 판매 등록해보세요.',
  },
};
