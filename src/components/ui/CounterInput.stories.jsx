import { useState } from 'react';
import { CounterInput } from '@/components/ui/CounterInput';

const meta = {
  title: 'UI/CounterInput',
  component: CounterInput,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: '현재 수량 값',
      table: { type: { summary: 'number' } },
    },
    onChange: {
      control: false,
      description: '수량 변경 핸들러',
      table: { type: { summary: '(value: number) => void' } },
    },
    min: {
      control: 'number',
      description: '최솟값 (기본값: 1)',
      table: { type: { summary: 'number' }, defaultValue: { summary: '1' } },
    },
    max: {
      control: 'number',
      description: '최댓값',
      table: { type: { summary: 'number' } },
    },
    label: {
      control: 'text',
      description: '수량 입력 라벨',
      table: { type: { summary: 'string' } },
    },
    showMaxLabel: {
      control: 'boolean',
      description:
        'max 값과 함께 "/max 최대 {max}장" 텍스트 표시 여부 (판매 등록/수정 모달에서 사용)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;

function CounterInputWithState(args) {
  const [value, setValue] = useState(args.min ?? 1);
  return <CounterInput {...args} value={value} onChange={setValue} />;
}

export const Default = {
  parameters: {
    docs: {
      source: {
        code: `
const [value, setValue] = useState(1);

<CounterInput
  label="구매 수량"
  value={value}
  onChange={setValue}
  min={1}
  max={3}
/>`,
      },
    },
  },
  args: {
    label: '구매 수량',
    min: 1,
    max: 3,
  },
  render: (args) => <CounterInputWithState {...args} />,
};

export const WithMaxLabel = {
  parameters: {
    docs: {
      description: {
        story:
          'showMaxLabel이 true일 때 "/max 최대 {max}장" 텍스트가 표시됩니다. 판매 등록/수정 모달에서 사용됩니다.',
      },
      source: {
        code: `
const [value, setValue] = useState(1);

<CounterInput
  label="총 판매 수량"
  value={value}
  onChange={setValue}
  min={1}
  max={3}
  showMaxLabel
/>`,
      },
    },
  },
  args: {
    label: '총 판매 수량',
    min: 1,
    max: 3,
    showMaxLabel: true,
  },
  render: (args) => <CounterInputWithState {...args} />,
};
