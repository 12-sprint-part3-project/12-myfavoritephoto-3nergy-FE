import FileInput from './FileInput';

const meta = {
  title: 'UI/FileInput',
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
