'use client';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Overlay } from '@/components/ui/Overlay';

export const BasicModal = ({
  title,
  onClose,
  onClick,
  buttonText = '확인',
  loadingText = '처리 중...',
  isLoading = false,
  children,
}) => {
  return (
    <Overlay onClose={onClose}>
      <Modal
        onClose={onClose}
        className="w-[21.5rem] px-[5.08rem] pt-[3.75rem] pb-10 md:w-[25rem] lg:w-[35rem] lg:px-2 lg:pt-[5rem] lg:pb-[3.94rem]"
      >
        <div className="flex flex-col items-center justify-center">
          <h2
            id="modal-title"
            className="mb-10 text-noto-18-bold text-white lg:text-noto-20-regular"
          >
            {title}
          </h2>
          <p
            id="modal-description"
            className="mb-[3.75rem] text-center text-noto-14-regular break-keep text-gray-300 lg:text-noto-18-regular"
          >
            {children}
          </p>
          <Button
            className="w-[7.5rem] text-noto-16-bold md:w-[8.75rem] lg:w-[10.625rem] lg:text-noto-18-bold"
            onClick={onClick}
            disabled={isLoading}
          >
            {isLoading ? loadingText : buttonText}
          </Button>
        </div>
      </Modal>
    </Overlay>
  );
};
