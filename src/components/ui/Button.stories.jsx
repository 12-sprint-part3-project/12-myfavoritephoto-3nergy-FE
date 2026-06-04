import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      order: 1,
      table: {
        type: { summary: 'primary | secondary' },
      },
    },
    size: {
      control: 'select',
      options: ['thick', 'lg', 'md', 'sm', 'xs'],
      order: 2,
      table: {
        type: { summary: 'thick | lg | md | sm | xs' },
      },
    },
    disabled: {
      control: 'boolean',
      order: 3,
      table: {
        type: { summary: 'boolean' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      order: 4,
      table: {
        type: { summary: 'button | submit | reset' },
      },
    },
    className: {
      control: 'text',
      description: '너비는 className으로 직접 지정 (예: w-full, w-[10rem])',
      order: 5,
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

export const Primary = {
  args: {
    children: '확인',
    variant: 'primary',
    size: 'md',
    className: 'w-[10rem]',
  },
};

export const Secondary = {
  args: {
    children: '교환하기',
    variant: 'secondary',
    size: 'md',
    className: 'w-[10rem]',
  },
};

export const Disabled = {
  args: {
    children: '확인',
    variant: 'primary',
    size: 'md',
    disabled: true,
    className: 'w-[10rem]',
  },
};

export const AllSizes = {
  args: {
    variant: 'primary',
    disabled: false,
    className: 'w-[27.5rem]',
  },

  render: function Render(args) {
    return (
      <div className="flex flex-col gap-4">
        <Button {...args} size="thick">
          thick (75 / 75 / 80)
        </Button>
        <Button {...args} size="lg">
          lg (55 / 60 / 60)
        </Button>
        <Button {...args} size="md">
          md (55 / 55 / 60)
        </Button>
        <Button {...args} size="sm">
          sm (40 / 55 / 60)
        </Button>
        <Button {...args} size="xs">
          xs (40 / 55 / 55)
        </Button>
      </div>
    );
  },
};
