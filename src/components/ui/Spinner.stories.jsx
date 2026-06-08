import { Spinner } from '@/components/ui/Spinner';

const meta = {
  title: 'UI/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 로딩 상태를 안내하는 Spinner 컴포넌트입니다. 기본 크기는 32x32(px)입니다. `h-*`, `w-*` 등 클래스로 크기를 자유롭게 조정할 수 있습니다.',
      },
    },
  },
  argTypes: {
    className: {
      control: false,
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

export const Default = {};
