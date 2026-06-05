import FileInput from './FileInput';

const meta = {
  title: 'UI/FileInput',
  component: FileInput,
  argTypes: {
    name: {
      control: 'text',
      order: 1,
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
    name: 'photo',
  },
};
