import { useState } from 'react';
import { LoginModal } from '@/components/domain/auth/LoginModal';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'Domain/Auth/LoginModal',
  component: LoginModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['session-expired', 'login-required'],
      description: '모달 타입',
      table: { type: { summary: "'session-expired' | 'login-required'" } },
    },
    onClose: {
      control: false,
      description: '모달 닫기 핸들러',
      table: { type: { summary: '() => void' } },
    },
    onLogin: {
      control: false,
      description: '로그인 버튼 클릭 핸들러 (로그인 페이지 이동 등)',
      table: { type: { summary: '() => void' } },
    },
  },
};

export default meta;

function LoginModalWithTrigger({ type }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-[10rem]">
        모달 열기
      </Button>
      {open && (
        <LoginModal
          type={type}
          onClose={() => setOpen(false)}
          onLogin={() => setOpen(false)}
        />
      )}
    </>
  );
}

export const SessionExpired = {
  args: {
    type: 'session-expired',
  },
  render: (args) => <LoginModalWithTrigger type={args.type} />,
};

export const LoginRequired = {
  args: {
    type: 'login-required',
  },
  render: (args) => <LoginModalWithTrigger type={args.type} />,
};
