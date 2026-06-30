import { Page } from './Page';

export default {
  title: 'Components/Pagination/Page',
  component: Page,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-black p-8">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    page: { control: 'number' },
    isActive: { control: 'boolean' },
  },
};

export const Default = {
  args: { page: 1, isActive: false },
};

export const Active = {
  args: { page: 1, isActive: true },
};
