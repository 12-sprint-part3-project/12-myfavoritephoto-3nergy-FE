import { useState } from 'react';
import { BottomSheet } from './BottomSheet';
import { Overlay } from './Overlay';
import { Button } from './Button';

const meta = {
  title: 'UI/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClose: {
      control: false,
      description: '바텀시트 닫기 핸들러',
      table: {
        type: { summary: '() => void' },
      },
    },
    children: {
      control: 'text',
      description: '바텀시트 본문 영역 (스크롤 영역)',
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

function BottomSheetWithTrigger({ footer, children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} className="w-[10rem]">
        바텀시트 열기
      </Button>
      {open && (
        <Overlay onClose={() => setOpen(false)} align="end">
          <BottomSheet
            onClose={() => setOpen(false)}
            footer={footer?.({ onClose: () => setOpen(false) })}
          >
            {children}
          </BottomSheet>
        </Overlay>
      )}
    </>
  );
}

export const Default = {
  args: {
    children: '바텀시트 내용입니다.',
  },
  render: (args) => (
    <BottomSheetWithTrigger>
      <p className="text-gray-200">{args.children}</p>
    </BottomSheetWithTrigger>
  ),
};
export const WithFooter = {
  args: {
    children: '바텀시트 내용입니다.',
  },
  render: (args) => (
    <BottomSheetWithTrigger
      footer={({ onClose }) => (
        <div className="flex gap-2">
          <Button variant="secondary" className="w-full" onClick={onClose}>
            취소
          </Button>
          <Button className="w-full">확인</Button>
        </div>
      )}
    >
      <p className="text-white">{args.children}</p>
    </BottomSheetWithTrigger>
  ),
};

export const WithScrollContent = {
  render: () => (
    <BottomSheetWithTrigger
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
    </BottomSheetWithTrigger>
  ),
};
