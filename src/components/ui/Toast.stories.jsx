import { useToast } from '@/hooks/useToast';
import { Button } from './Button';
import { Toast } from './Toast';
import { ToastContainer } from './ToastContainer';

const meta = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 짧은 피드백 메시지를 제공하는 Toast 컴포넌트입니다. useToast 훅과 함께 사용합니다.',
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
  const { isVisible, message: toastMessage, showToast } = useToast();

  return (
    <>
      <Button onClick={() => showToast(message)} className="w-[10rem]">
        Toast 실행
      </Button>
      <ToastContainer>
        <Toast message={toastMessage} isVisible={isVisible} />
      </ToastContainer>
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
          const { open, message, showToast } = useToast();

          <>
            <Button onClick={() => showToast('이번달 모든 생성 기회를 소진했어요')}>
              Toast 실행
            </Button>

            <ToastContainer>
              <Toast message={message} open={open} />
            </ToastContainer>
          </>
        `,
      },
    },
  },
  render: (args) => <ToastWithTrigger {...args} />,
};
