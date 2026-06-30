import { Page } from './Page';

export default {
  title: 'Components/Page',
  component: Page,
  argTypes: {
    page: { control: 'number' },
    isActive: { control: 'boolean' },
  },
  tags: ['autodocs'],
};

export const Default = {
  args: { page: 1, isActive: false },
};

export const Active = {
  args: { page: 1, isActive: true },
};
