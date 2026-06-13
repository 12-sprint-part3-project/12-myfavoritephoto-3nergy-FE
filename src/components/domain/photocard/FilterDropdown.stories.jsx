import { useState } from 'react';

import { MobileFilterBottomSheet } from './MobileFilterBottomSheet';
import { FilterDropdown } from './FilterDropdown';

const GRADE_OPTIONS = [
  { value: 'common', label: 'COMMON' },
  { value: 'rare', label: 'RARE' },
  { value: 'super-rare', label: 'SUPER RARE' },
  { value: 'legendary', label: 'LEGENDARY' },
];

const SALE_METHOD_OPTIONS = [
  { value: 'sale', label: '판매' },
  { value: 'exchange', label: '교환' },
];

const MOCK_COUNTS = {
  grade: { COMMON: 12, RARE: 21, SUPER_RARE: 34, LEGENDARY: 5 },
  genre: { 여행: 21, 풍경: 34, 인물: 5, 사료: 12 },
  soldOut: { '판매 중': 50, '판매 완료': 22 },
};

const meta = {
  title: 'Domain/Photocard/FilterDropdown',
  component: FilterDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0f0f0f' }],
    },
    viewport: { defaultViewport: 'tablet' },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '선택 전 표시할 라벨',
      order: 1,
      table: { type: { summary: 'string' } },
    },
    options: {
      control: 'object',
      order: 2,
      table: { type: { summary: 'Array<{ value: string; label: string }>' } },
    },
    value: {
      control: 'text',
      description: '제어 컴포넌트로 사용 시 선택된 값',
      order: 3,
      table: { type: { summary: 'string' } },
    },
    onChange: {
      action: 'changed',
      order: 4,
      table: { type: { summary: '(value: string) => void' } },
    },
    onMobileClick: {
      control: false,
      action: 'mobileClicked',
      order: 5,
      description: '모바일에서 필터 버튼 클릭 시 호출 (바텀시트 오픈용)',
      table: { type: { summary: '() => void' } },
    },
    mobileButtonClassName: {
      control: 'text',
      description:
        '모바일 필터 버튼에 적용되는 className. 미지정 시 h-[35px] w-[35px] 적용',
      order: 6,
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;

export const Grade = {
  args: {
    label: '등급',
    options: GRADE_OPTIONS,
  },
};

export const SaleMethod = {
  args: {
    label: '판매 방법',
    options: SALE_METHOD_OPTIONS,
  },
};

export const GradeWithSelected = {
  args: {
    label: '등급',
    options: GRADE_OPTIONS,
    value: 'rare',
  },
};

export const MobileWithBottomSheet = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => {
    const [open, setOpen] = useState(false);
    const [appliedSelection, setAppliedSelection] = useState({});
    return (
      <>
        <FilterDropdown
          label="등급"
          options={GRADE_OPTIONS}
          onMobileClick={() => setOpen(true)}
        />
        {open && (
          <MobileFilterBottomSheet
            tabs={['grade', 'genre', 'soldOut']}
            onClose={() => setOpen(false)}
            onApply={(selection) => setAppliedSelection(selection)}
            counts={MOCK_COUNTS}
            totalPhotos={72}
            initialSelection={appliedSelection}
          />
        )}
      </>
    );
  },
};
