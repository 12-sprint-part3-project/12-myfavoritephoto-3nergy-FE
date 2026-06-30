import { FileInput } from './FileInput';

const meta = {
  title: 'Components/Input/FileInput',
  component: FileInput,
  argTypes: {
    label: {
      control: 'text',
      order: 1,
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      order: 2,
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
  },
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    label: '사진 업로드',
    name: 'photo',
  },
};

export const Error = {
  args: {
    label: '사진 업로드',
    error: '사진을 업로드해 주세요.',
  },
};
