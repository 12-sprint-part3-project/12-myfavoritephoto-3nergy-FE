'use client';

import { useEffect, useRef } from 'react';
import CloseIcon from '@/icons/close.svg';

export const Modal = ({ onClose, className, children }) => {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // 모달 열릴 때 close 버튼으로 focus 이동
    closeBtnRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={`relative rounded-sm bg-black ${className ?? ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        ref={closeBtnRef}
        onClick={onClose}
        aria-label="모달 닫기"
        className="group focus-visible:ring-main absolute top-[0.9375rem] right-[0.9375rem] p-[0.39rem] focus-visible:ring-2 focus-visible:outline-none lg:top-[1.875rem] lg:right-[1.875rem]"
      >
        <CloseIcon
          width={15}
          className="group-hover:text-main text-gray-300 transition-colors duration-150"
        />
      </button>
      {children}
    </div>
  );
};
