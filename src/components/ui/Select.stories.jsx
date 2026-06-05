import Select from './Select';

const SAMPLE_OPTIONS = [
  { value: 'common', label: 'COMMON' },
  { value: 'rare', label: 'RARE' },
  { value: 'super_rare', label: 'SUPER RARE' },
  { value: 'legendary', label: 'LEGENDARY' },
];

const meta = {
  title: 'UI/Select',
  component: Select,
  argTypes: {
    label: {
      control: 'text',
      order: 1,
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      order: 2,
      table: {
        type: { summary: 'string' },
      },
    },
    options: {
      control: 'object',
      description: '{ value, label }[] 형태의 배열',
      order: 3,
      table: {
        type: { summary: '{ value: string; label: string }[]' },
      },
    },
    disabled: {
      control: 'boolean',
      order: 4,
      table: {
        type: { summary: 'boolean' },
      },
    },
    required: {
      control: 'boolean',
      order: 5,
      table: {
        type: { summary: 'boolean' },
      },
    },
    error: {
      control: 'text',
      order: 6,
      table: {
        type: { summary: 'string' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    label: '등급',
    name: 'grade',
    placeholder: '등급을 선택해 주세요',
    options: SAMPLE_OPTIONS,
  },
};

export const Filled = {
  args: {
    ...Default.args,
    value: 'rare',
  },
};

export const WithError = {
  args: {
    ...Default.args,
    value: '',
    error: '등급을 선택해 주세요.',
  },
};

export const Disabled = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
