import { Button } from './Button';

export default {
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
      options: ['thick-lg', 'thick-md', 'lg', 'md', 'sm'],
      order: 2,
      table: {
        type: { summary: 'thick-lg | thick-md | lg | md | sm' },
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
        <Button {...args} size="thick-lg">
          thick-lg
        </Button>

        <Button {...args} size="thick-md">
          thick-md
        </Button>

        <Button {...args} size="lg">
          lg
        </Button>

        <Button {...args} size="md">
          md
        </Button>

        <Button {...args} size="sm">
          sm
        </Button>
      </div>
    );
  },
};
