import { useState, useEffect } from 'react';
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
          '사용자에게 짧은 피드백 메시지를 제공하는 Toast 컴포넌트입니다.',
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
    open: {
      control: 'boolean',
      description: 'Toast의 표시 여부 (임시값)',
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
    open: true,
  },
};

function ToastWithTrigger({ message }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [open]);

  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-[10rem]">
        Toast 실행
      </Button>

      <ToastContainer>
        <Toast message={message} open={open} />
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
const [open, setOpen] = useState(false);

<>
  <Button onClick={() => setOpen(true)} className="w-[10rem]">
    Toast 실행
  </Button>

  <ToastContainer>
    <Toast
      message="이번달 모든 생성 기회를 소진했어요"
      open={open}
    />
  </ToastContainer>
</>
        `,
      },
    },
  },
  render: (args) => <ToastWithTrigger {...args} />,
};
