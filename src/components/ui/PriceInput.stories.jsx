import { useState } from 'react';
import { PriceInput } from '@/components/ui/PriceInput';

const meta = {
  title: 'UI/Input/PriceInput',
  component: PriceInput,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#0f0f0f' }],
    },
    docs: {
      description: {
        component:
          '숫자만 입력 가능한 가격 입력 컴포넌트입니다. 입력값 우측에 P가 표시됩니다.',
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      description: '현재 입력값',
      table: { type: { summary: 'number | string' } },
    },
    onChange: {
      control: false,
      description: '값 변경 핸들러',
      table: { type: { summary: '(value: number) => void' } },
    },
    label: {
      control: 'text',
      description: '입력 라벨',
      table: { type: { summary: 'string' } },
    },
    labelClassName: {
      control: false,
      description: '라벨 추가 스타일 지정',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;

function PriceInputWithState(args) {
  const [value, setValue] = useState('');
  return <PriceInput {...args} value={value} onChange={setValue} />;
}

// 기본 상태
export const Default = {
  parameters: {
    docs: {
      description: {
        story:
          '기본 상태입니다. 숫자만 입력 가능하며 입력값 우측에 P가 표시됩니다.',
      },
      source: {
        code: `
const [price, setPrice] = useState('');

<PriceInput
  label="장당 가격"
  value={price}
  onChange={setPrice}
/>`,
      },
    },
  },
  args: {
    label: '장당 가격',
  },
  render: (args) => <PriceInputWithState {...args} />,
};

// 값이 입력된 상태
export const WithValue = {
  parameters: {
    docs: {
      description: {
        story: '값이 입력된 상태입니다.',
      },
    },
  },
  args: {
    label: '장당 가격',
  },
  render: (args) => {
    const [value, setValue] = useState(1000);
    return <PriceInput {...args} value={value} onChange={setValue} />;
  },
};
