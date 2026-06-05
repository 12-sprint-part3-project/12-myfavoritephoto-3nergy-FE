import { useState } from 'react';
import { Modal } from './Modal';
import { Overlay } from './Overlay';
import { Button } from './Button';

const meta = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClose: {
      control: false,
      description: '모달 닫기 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: 'text',
      description: '모달 본문 영역 (내용이 길면 스크롤)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    footer: {
      control: false,
      description:
        '하단에 고정할 콘텐츠. 스크롤과 무관하게 항상 보여야 할 요소. (없으면 렌더링 생략)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: '너비, 패딩 등 추가 스타일 직접 지정 (예: w-[10rem] 등)',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
function ModalWithTrigger({ footer, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-[10rem]">
        모달 열기
      </Button>
      {open && (
        <Overlay onClose={() => setOpen(false)}>
          <Modal
            onClose={() => setOpen(false)}
            footer={footer?.({ onClose: () => setOpen(false) })}
            className="max-h-[80vh] w-[35rem] p-10"
          >
            <p className="text-white">{children}</p>
          </Modal>
        </Overlay>
      )}
    </>
  );
}

export const Default = {
  args: {
    children: '모달 내용입니다.',
  },
  render: (args) => <ModalWithTrigger>{args.children}</ModalWithTrigger>,
};

export const WithFooter = {
  args: {
    children: '하단에 버튼이 고정되는 모달입니다.',
  },
  render: (args) => (
    <ModalWithTrigger
      footer={({ onClose }) => (
        <div className="flex gap-2">
          <Button variant="secondary" className="w-full" onClick={onClose}>
            취소
          </Button>
          <Button className="w-full">확인</Button>
        </div>
      )}
    >
      {args.children}
    </ModalWithTrigger>
  ),
};

export const WithScrollContent = {
  render: () => (
    <ModalWithTrigger
      footer={({ onClose }) => (
        <div className="flex gap-2">
          <Button variant="secondary" className="w-full" onClick={onClose}>
            취소
          </Button>
          <Button className="w-full">확인</Button>
        </div>
      )}
    >
      <div className="flex flex-col gap-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <p key={i} className="text-white">
            스크롤 테스트 콘텐츠 {i + 1}
          </p>
        ))}
      </div>
    </ModalWithTrigger>
  ),
};
