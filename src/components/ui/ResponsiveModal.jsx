'use client';

import { BottomSheet } from '@/components/ui/BottomSheet';
import { Modal } from '@/components/ui/Modal';
import { Overlay } from '@/components/ui/Overlay';
import { useIsDesktop } from '@/hooks/common/useResponsive';

// ref: 내부 스크롤 컨테이너에 연결됨
// 외부에서 무한스크롤 등 스크롤 이벤트 감지가 필요한 경우 전달
export const ResponsiveModal = ({ onClose, footer, children, ref }) => {
  // lg(1024px) 이상이면 true
  const isDesktop = useIsDesktop();

  // PC(lg 이상): 중앙 모달 / 태블릿·모바일(lg 미만): 하단 바텀시트
  return (
    <Overlay onClose={onClose} align={isDesktop ? 'center' : 'end'}>
      {isDesktop ? (
        <Modal
          ref={ref}
          onClose={onClose}
          footer={footer}
          className="mx-4 w-full max-w-[72.5rem] bg-gray-500 px-[1.875rem] py-[3.75rem]"
        >
          {children}
        </Modal>
      ) : (
        <BottomSheet ref={ref} onClose={onClose} footer={footer}>
          {children}
        </BottomSheet>
      )}
    </Overlay>
  );
};
