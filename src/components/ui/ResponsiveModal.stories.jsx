import { useState } from 'react';
import { ResponsiveModal } from './ResponsiveModal';
import { Button } from './Button';

const meta = {
  title: 'UI/ResponsiveModal',
  component: ResponsiveModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'lg(1024px) 이상에서는 화면 중앙 모달, lg 미만(태블릿·모바일)에서는 하단 바텀시트로 렌더됩니다.',
      },
    },
  },
  argTypes: {
    onClose: {
      control: false,
      description: '모달/바텀시트 닫기 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: 'text',
      description: '모달/바텀시트 본문 영역 (내용이 길면 스크롤)',
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
  },
};

export default meta;

function ResponsiveModalWithTrigger({ footer, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-[10rem]">
        모달 열기
      </Button>
      {open && (
        <ResponsiveModal
          onClose={() => setOpen(false)}
          footer={footer?.({ onClose: () => setOpen(false) })}
        >
          <p className="text-white">{children}</p>
        </ResponsiveModal>
      )}
    </>
  );
}
export const Default = {
  args: { children: '반응형 모달 내용입니다.' },
  parameters: {
    docs: {
      source: {
        code: `
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>모달 열기</Button>
{open && (
  <ResponsiveModal onClose={() => setOpen(false)}>
    <p>반응형 모달 내용입니다.</p>
  </ResponsiveModal>
)}`,
      },
    },
  },
  render: (args) => (
    <ResponsiveModalWithTrigger>{args.children}</ResponsiveModalWithTrigger>
  ),
};

export const WithFooter = {
  args: { children: '하단에 버튼이 고정되는 반응형 모달입니다.' },
  parameters: {
    docs: {
      source: {
        code: `
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>모달 열기</Button>
{open && (
  <ResponsiveModal
    onClose={() => setOpen(false)}
    footer={
      <div className="flex gap-2">
        <Button variant="secondary" className="w-full" onClick={() => setOpen(false)}>
          취소
        </Button>
        <Button className="w-full">확인</Button>
      </div>
    }
  >
    <p>하단에 버튼이 고정되는 반응형 모달입니다.</p>
  </ResponsiveModal>
)}`,
      },
    },
  },
  render: (args) => (
    <ResponsiveModalWithTrigger
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
    </ResponsiveModalWithTrigger>
  ),
};

export const WithScrollContent = {
  parameters: {
    docs: {
      source: {
        code: `
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>모달 열기</Button>
{open && (
  <ResponsiveModal
    onClose={() => setOpen(false)}
    footer={
      <div className="flex gap-2">
        <Button variant="secondary" className="w-full" onClick={() => setOpen(false)}>
          취소
        </Button>
        <Button className="w-full">확인</Button>
      </div>
    }
  >
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <p key={item.id} className="text-white">{item.text}</p>
      ))}
    </div>
  </ResponsiveModal>
)}`,
      },
    },
  },
  render: () => (
    <ResponsiveModalWithTrigger
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
    </ResponsiveModalWithTrigger>
  ),
};
