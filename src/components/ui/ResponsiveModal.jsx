'use client';

import { BottomSheet } from '@/components/ui/BottomSheet';
import { Modal } from '@/components/ui/Modal';
import { Overlay } from '@/components/ui/Overlay';

export const ResponsiveModal = ({ onClose, children }) => {
  return (
    <>
      {/* PC (lg 이상): 화면 중앙 모달 */}
      <div className="hidden lg:block">
        <Overlay onClose={onClose}>
          <Modal
            onClose={onClose}
            className="mx-4 w-full max-w-[72.5rem] px-[1.875rem] py-[3.75rem]"
          >
            {children}
          </Modal>
        </Overlay>
      </div>

      {/* 태블릿·모바일 (lg 미만): 하단 바텀시트 */}
      <div className="block lg:hidden">
        <Overlay onClose={onClose} align="end">
          <BottomSheet onClose={onClose}>{children}</BottomSheet>
        </Overlay>
      </div>
    </>
  );
};
