'use client';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Overlay } from '@/components/ui/Overlay';

export const BasicModal = ({
  title,
  onClose,
  onClick,
  buttonText = '확인',
  children,
}) => {
  return (
    <Overlay onClose={onClose}>
      <Modal
        onClose={onClose}
        className="w-[21.5rem] px-[5.08rem] pt-[3.75rem] pb-10 md:w-[25rem] lg:w-[35rem] lg:px-2 lg:pt-[5rem] lg:pb-[3.94rem]"
      >
        <div className="flex flex-col items-center justify-center">
          {title && (
            <h2 className="text-noto-18-bold lg:text-noto-20-regular mb-10 text-white">
              {title}
            </h2>
          )}
          <p className="text-noto-14-regular lg:text-noto-18-regular mb-[3.75rem] text-center break-keep text-gray-300">
            {children}
          </p>
          <Button
            className="w-[7.5rem] md:w-[8.75rem] lg:w-[10.625rem]"
            onClick={onClick}
          >
            {buttonText}
          </Button>
        </div>
      </Modal>
    </Overlay>
  );
};
