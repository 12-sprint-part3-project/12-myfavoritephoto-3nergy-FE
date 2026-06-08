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

const meta = {
  title: 'Domain/Photocard/FilterDropdown',
  component: FilterDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
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
