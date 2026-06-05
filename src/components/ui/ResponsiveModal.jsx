'use client';

import { BottomSheet } from '@/components/ui/BottomSheet';
import { Modal } from '@/components/ui/Modal';
import { Overlay } from '@/components/ui/Overlay';
import { useIsDesktop } from '@/hooks/useIsDesktop';

export const ResponsiveModal = ({ onClose, children }) => {
  // lg(1024px) 이상이면 true
  const isDesktop = useIsDesktop();

  // PC(lg 이상): 중앙 모달 / 태블릿·모바일(lg 미만): 하단 바텀시트
  return (
    <Overlay onClose={onClose} align={isDesktop ? 'center' : 'end'}>
      {isDesktop ? (
        <Modal
          onClose={onClose}
          className="mx-4 w-full max-w-[72.5rem] px-[1.875rem] py-[3.75rem]"
        >
          {children}
        </Modal>
      ) : (
        <BottomSheet onClose={onClose}>{children}</BottomSheet>
      )}
    </Overlay>
  );
};
