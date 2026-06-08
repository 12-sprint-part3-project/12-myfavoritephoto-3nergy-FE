import { MobileFilterBottomSheet } from './MobileFilterBottomSheet';

const MOCK_COUNTS = {
  grade: {
    COMMON: 12,
    RARE: 21,
    SUPER_RARE: 34,
    LEGENDARY: 5,
  },
  genre: {
    여행: 21,
    풍경: 34,
    인물: 5,
    사료: 12,
  },
  soldOut: {
    '판매 중': 50,
    '판매 완료': 22,
  },
  method: {
    교환: 30,
    판매: 42,
  },
};

const meta = {
  title: 'Common/MobileFilterBottomSheet',
  component: MobileFilterBottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '모바일 환경에서 필터 조건을 선택하기 위한 BottomSheet 컴포넌트입니다. tabs prop으로 표시할 필터 탭을 지정합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex min-h-screen items-end bg-black/80">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    tabs: {
      control: 'object',
      description: '표시할 필터 탭 목록',
      table: {
        type: { summary: "('grade' | 'genre' | 'soldOut' | 'method')[]" },
      },
    },
    onClose: {
      control: false,
      description: '닫기 핸들러',
      table: { type: { summary: '() => void' } },
    },
    onApply: {
      control: false,
      description: '필터 적용 핸들러',
      table: { type: { summary: '(filters: object) => void' } },
    },
    counts: {
      control: 'object',
      description: '각 필터 항목별 포토카드 개수',
      table: { type: { summary: 'Record<string, Record<string, number>>' } },
    },
    totalPhotos: {
      control: 'number',
      description: '전체 포토카드 개수 (필터 미선택 시 버튼에 표시)',
      table: { type: { summary: 'number' } },
    },
  },
};

export default meta;

// 기본 (등급/장르/매진여부)
export const Default = {
  args: {
    tabs: ['grade', 'genre', 'soldOut'],
    counts: MOCK_COUNTS,
    totalPhotos: 72,
  },
  render: (args) => (
    <MobileFilterBottomSheet
      {...args}
      onClose={() => {}}
      onApply={(filters) => console.log(filters)}
    />
  ),
};
