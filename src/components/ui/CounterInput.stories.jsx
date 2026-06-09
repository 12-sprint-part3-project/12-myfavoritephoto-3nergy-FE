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
    className: {
      control: false,
      description: '너비 등 추가 스타일 지정',
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;

function CounterInputWithState({ min, max }) {
  const [value, setValue] = useState(min ?? 1);
  return (
    <CounterInput
      value={value}
      onChange={setValue}
      min={min}
      max={max}
      className="w-[144px]"
    />
  );
}
export const Default = {
  parameters: {
    docs: {
      description: {
        story:
          '최솟값/최댓값 제한 없이 자유롭게 수량을 조절할 수 있는 기본 상태입니다.',
      },
    },
  },
  render: (args) => <CounterInputWithState {...args} />,
};

export const WithMax = {
  args: {
    min: 1,
    max: 3,
  },
  parameters: {
    docs: {
      description: {
        story:
          '최솟값 1, 최댓값 3으로 제한된 상태입니다. 판매 등록/수정 모달에서 사용됩니다.',
      },
    },
  },
  render: (args) => <CounterInputWithState {...args} />,
};

export const AtMin = {
  args: {
    min: 1,
    max: 3,
  },
  parameters: {
    docs: {
      description: {
        story: '최솟값에 도달한 상태입니다. 감소 버튼이 비활성화됩니다.',
      },
    },
  },
  render: () => (
    <CounterInput
      value={1}
      onChange={() => {}}
      min={1}
      max={3}
      className="w-[144px]"
    />
  ),
};

export const AtMax = {
  args: {
    min: 1,
    max: 3,
  },
  parameters: {
    docs: {
      description: {
        story: '최댓값에 도달한 상태입니다. 증가 버튼이 비활성화됩니다.',
      },
    },
  },
  render: () => (
    <CounterInput
      value={3}
      onChange={() => {}}
      min={1}
      max={3}
      className="w-[144px]"
    />
  ),
};
