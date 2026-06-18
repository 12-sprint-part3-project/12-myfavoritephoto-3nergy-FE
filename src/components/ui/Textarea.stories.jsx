import { useState } from 'react';
import { Textarea } from './Textarea';

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      order: 1,
      table: {
        type: { summary: 'string' },
      },
    },
    labelClassName: {
      control: 'text',
      description: '라벨 텍스트 크기 등 추가 스타일 지정',
      order: 2,
      table: { type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      order: 3,
      table: {
        type: { summary: 'string' },
      },
    },
    labelClassName: {
      control: 'text',
      description: 'label 텍스트 스타일',
      order: 3,
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: false,
      description: '현재 입력값',
      order: 4,
      table: { type: { summary: 'string' } },
    },
    onChange: {
      control: false,
      description: '값 변경 핸들러',
      order: 5,
      table: { type: { summary: '(e: ChangeEvent) => void' } },
    },
    name: {
      control: 'text',
      description: 'textarea name 속성 (label htmlFor 연결에 사용)',
      order: 6,
      table: { type: { summary: 'string' } },
    },
  },
};

export default meta;

function TextareaWithState(args) {
  const [value, setValue] = useState(args.value ?? '');
  return (
    <Textarea
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export const Default = {
  args: {
    label: '카드 설명',
    name: 'description',
    placeholder: '카드 설명을 입력해 주세요',
    labelClassName: 'text-noto-18-regular',
  },
  parameters: {
    docs: {
      source: {
        code: `
const [value, setValue] = useState('');

<Textarea
  label="카드 설명"
  labelClassName="text-noto-18-regular"
  name="description"
  placeholder="카드 설명을 입력해 주세요"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`,
      },
    },
  },
  render: (args) => <TextareaWithState {...args} />,
};

export const Filled = {
  args: {
    label: '카드 설명',

    name: 'description',
    placeholder: '카드 설명을 입력해 주세요',
    value:
      '푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다.',
    labelClassName: 'text-noto-18-regular',
  },
  parameters: {
    docs: {
      description: {
        story: '값이 입력된 상태입니다.',
      },
      source: {
        code: `
const [value, setValue] = useState('푸릇푸릇한 여름 풍경...');

<Textarea
  label="카드 설명"
  labelClassName="text-noto-18-regular"
  name="description"
  placeholder="카드 설명을 입력해 주세요"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`,
      },
    },
  },
  render: (args) => <TextareaWithState {...args} />,
};

export const Overflow = {
  args: {
    label: '카드 설명',
    name: 'description',
    placeholder: '카드 설명을 입력해 주세요',
    value:
      '푸릇푸릇한 여름 풍경, 눈 많이 내린 겨울 풍경 사진에 관심이 많습니다. '.repeat(
        10,
      ),
    labelClassName: 'text-noto-18-regular',
  },
  parameters: {
    docs: {
      description: {
        story: '텍스트가 넘칠 때 박스는 고정되고 스크롤로 처리됩니다.',
      },
      source: {
        code: `
const [value, setValue] = useState('긴 텍스트...');

<Textarea
  label="카드 설명"
  labelClassName="text-noto-18-regular"
  name="description"
  placeholder="카드 설명을 입력해 주세요"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`,
      },
    },
  },
  render: (args) => <TextareaWithState {...args} />,
};
