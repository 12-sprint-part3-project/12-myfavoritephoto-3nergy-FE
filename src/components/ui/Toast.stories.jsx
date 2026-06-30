import { Button } from './Button';
import { Toast } from './Toast';
import { ToastProvider, useToastContext } from '@/context/ToastContext';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 짧은 피드백 메시지를 제공하는 Toast 컴포넌트입니다. ToastProvider와 useToastContext를 통해 전역으로 사용할 수 있습니다.',
      },
    },
  },

  argTypes: {
    message: {
      control: 'text',
      description: '메시지',
      table: {
        type: { summary: 'string' },
      },
    },
    isVisible: {
      control: 'boolean',
      description: 'Toast의 표시 여부',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;

export const Default = {
  args: {
    message: '이번달 모든 생성 기회를 소진했어요',
    isVisible: true,
  },
};

function ToastWithTrigger({ message }) {
  const { showToast } = useToastContext();

  return (
    <>
      <Button onClick={() => showToast(message)}>Toast 실행</Button>
    </>
  );
}

export const Interactive = {
  args: {
    message: '이번달 모든 생성 기회를 소진했어요',
  },
  parameters: {
    docs: {
      source: {
        code: `
const { showToast } = useToastContext();

<Button
  onClick={() => showToast('이번달 모든 생성 기회를 소진했어요')}
>
  Toast 실행
</Button>
        `,
      },
    },
  },
  render: (args) => (
    <ToastProvider>
      <ToastWithTrigger {...args} />
    </ToastProvider>
  ),
};
