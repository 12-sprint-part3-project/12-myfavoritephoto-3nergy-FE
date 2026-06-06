import { useState } from 'react';
import { BasicModal } from './BasicModal';
import { Button } from './Button';

const meta = {
  title: 'UI/Modal/BasicModal',
  component: BasicModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '모달 제목',
      table: {
        type: { summary: 'string' },
      },
    },
    buttonText: {
      control: 'text',
      description: '확인 버튼 텍스트',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '확인' },
      },
    },
    onClose: {
      control: false,
      description: '모달 닫기 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    onClick: {
      control: false,
      description: '확인 버튼 클릭 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: 'text',
      description: '모달 본문 내용',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;

function BasicModalWithTrigger({ title, buttonText, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-[10rem]">
        모달 열기
      </Button>
      {open && (
        <BasicModal
          title={title}
          buttonText={buttonText}
          onClose={() => setOpen(false)}
          onClick={() => setOpen(false)}
        >
          {children}
        </BasicModal>
      )}
    </>
  );
}
export const Default = {
  args: {
    title: '모달 제목',
    buttonText: '확인',
    children: '모달 내용이 들어갑니다.',
  },
  parameters: {
    docs: {
      source: {
        code: `
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>모달 열기</Button>
{open && (
  <BasicModal
    title="모달 제목"
    buttonText="확인"
    onClose={() => setOpen(false)}
    onClick={() => setOpen(false)}
  >
    모달 내용이 들어갑니다.
  </BasicModal>
)}`,
      },
    },
  },
  render: (args) => (
    <BasicModalWithTrigger title={args.title} buttonText={args.buttonText}>
      {args.children}
    </BasicModalWithTrigger>
  ),
};
