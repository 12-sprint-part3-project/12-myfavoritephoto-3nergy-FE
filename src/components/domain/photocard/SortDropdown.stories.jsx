import { SortDropdown } from './SortDropdown';

const meta = {
  title: 'Domain/Photocard/SortDropdown',
  component: SortDropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['low-price', 'high-price', 'latest'],
      description: '제어 컴포넌트로 사용 시 선택된 값',
      order: 1,
      table: { type: { summary: 'low-price | high-price | latest' } },
    },
    onChange: {
      action: 'changed',
      order: 2,
      table: { type: { summary: '(value: string) => void' } },
    },
    className: {
      control: 'text',
      description: '너비는 className으로 직접 지정 (예: w-[12rem])',
      order: 3,
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;

export const Default = {
  args: {
    className: 'w-[12rem]',
  },
};

export const WithSelected = {
  args: {
    value: 'high-price',
    className: 'w-[12rem]',
  },
};
