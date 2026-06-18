import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MobileFilterBottomSheet } from './MobileFilterBottomSheet';

const MOCK_COUNTS = {
  grade: {
    common: 12,
    rare: 21,
    super_rare: 34,
    legendary: 5,
  },
  genre: {
    album: 21,
    special: 34,
    landscape: 5,
    concert: 12,
    md: 8,
    collage: 3,
    branding: 7,
    season_greeting: 4,
    fan_meeting: 6,
    etc: 2,
  },
  soldOut: {
    SALE: 50,
    SOLD_OUT: 22,
  },
  method: {
    SALE: 30,
    TRADE: 42,
  },
};

const meta = {
  title: 'Domain/Photocard/MobileFilterBottomSheet',
  component: MobileFilterBottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
모바일 환경에서 필터 조건을 선택하기 위한 BottomSheet 컴포넌트입니다.

> **주의:** 이 컴포넌트는 단독으로 사용하지 않고 \`useFilterSelection\` 훅과 함께 사용합니다.
> \`draftSelection\`, \`onDraftChange\`, \`displayCount\`, \`isCountLoading\`은 모두 훅에서 반환됩니다.
        `,
      },
    },
  },
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
  draftSelection: {
    control: 'object',
    description: '확인 전 선택 상태 (상위에서 관리)',
    table: { type: { summary: 'Record<string, string | null>' } },
  },
  onDraftChange: {
    control: false,
    description: '선택 상태 변경 핸들러',
    table: { type: { summary: '(selection: object) => void' } },
  },
  isCountLoading: {
    control: 'boolean',
    description: '2개 이상 선택 시 API 호출 중 여부',
    table: { type: { summary: 'boolean' } },
  },
  displayCount: {
    control: 'number',
    description: '버튼 비활성화 조건 판단용 (필터링 결과가 0개면 비활성화)',
    table: { type: { summary: 'number' } },
  },
};

export default meta;

function MobileFilterBottomSheetWithTrigger(args) {
  const [open, setOpen] = useState(false);
  const [draftSelection, setDraftSelection] = useState(
    args.tabs.reduce((acc, key) => ({ ...acc, [key]: null }), {}),
  );

  // 선택된 필터 기준으로 displayCount 계산
  const selectedEntries = args.tabs.filter((key) => !!draftSelection[key]);
  const selectedCount = selectedEntries.length;

  const displayCount =
    selectedCount === 0
      ? args.totalPhotos
      : selectedCount === 1
        ? (args.counts?.[selectedEntries[0]]?.[
            draftSelection[selectedEntries[0]]
          ] ?? 0)
        : args.displayCount; // 2개 이상은 실제로는 API 호출이라 mock에선 args 그대로

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-[10rem]">
        바텀시트 열기
      </Button>
      {open && (
        <MobileFilterBottomSheet
          {...args}
          onClose={() => setOpen(false)}
          onApply={() => setOpen(false)}
          draftSelection={draftSelection}
          onDraftChange={setDraftSelection}
          totalPhotos={displayCount}
          displayCount={displayCount}
          isCountLoading={args.isCountLoading}
        />
      )}
    </>
  );
}

// 기본 (등급/장르)
export const Default = {
  args: {
    tabs: ['grade', 'genre'],
    counts: MOCK_COUNTS,
    totalPhotos: 72,
    isCountLoading: false,
    displayCount: 72,
  },
  render: (args) => <MobileFilterBottomSheetWithTrigger {...args} />,
  parameters: {
    docs: {
      source: {
        code: `
const { draftSelection, setDraftSelection, initialCounts, displayCount, isCountLoading } =
  useFilterSelection(data, ['grade', 'genre']);

<MobileFilterBottomSheet
  tabs={['grade', 'genre']}
  onClose={() => setIsFilterOpen(false)}
  draftSelection={draftSelection}
  onDraftChange={setDraftSelection}
  totalPhotos={displayCount}
  isCountLoading={isCountLoading}
  counts={initialCounts}
  displayCount={displayCount}
  onApply={(selected) => {
    setParams((prev) => ({
      ...prev,
      grade: selected.grade ?? '',
      genre: selected.genre ?? '',
    }));
  }}
/>
        `,
      },
    },
  },
};

// 조회 중 (2개 이상 선택 시 API 호출 중)
export const Loading = {
  args: {
    tabs: ['grade', 'genre'],
    counts: MOCK_COUNTS,
    totalPhotos: 72,
    isCountLoading: true,
    displayCount: 72,
  },
  render: (args) => <MobileFilterBottomSheetWithTrigger {...args} />,

  parameters: {
    docs: {
      description: {
        story:
          '여러 필터를 선택 시 API를 호출헤 결과 개수를 조회 중인 상태입니다. 버튼은 비활성화되며 "조회 중..." 텍스트가 표시됩니다.',
      },
      source: {
        code: `
// isCountLoading이 true이면 버튼 비활성화 및 '조회 중...' 표시
const { draftSelection, setDraftSelection, initialCounts, displayCount, isCountLoading } =
  useFilterSelection(data, ['grade', 'genre']);

<MobileFilterBottomSheet
  tabs={['grade', 'genre']}
  isCountLoading={isCountLoading} // true
  displayCount={displayCount}
  ...
/>
        `,
      },
    },
  },
};

// 결과 0개 (버튼 비활성화)
export const Empty = {
  args: {
    tabs: ['grade', 'genre'],
    counts: MOCK_COUNTS,
    totalPhotos: 0,
    isCountLoading: false,
    displayCount: 0,
  },
  render: (args) => <MobileFilterBottomSheetWithTrigger {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          '선택한 필터 조합에 해당하는 포토카드가 없는 상태입니다. 결과가 0개이므로 조회 버튼은 비활성화됩니다.',
      },
      source: {
        code: `
// 필터 조합 결과가 0개인 경우 버튼 비활성화
<MobileFilterBottomSheet
  tabs={['grade', 'genre']}
  totalPhotos={0}
  displayCount={0} // 0개면 버튼 비활성화
  isCountLoading={false}
  ...
/>
        `,
      },
    },
  },
};
