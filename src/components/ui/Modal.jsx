'use client';

import { useEffect, useRef } from 'react';
import CloseIcon from '@/icons/close.svg';

export const Modal = ({ onClose, footer, className, children }) => {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // 모달 열릴 때 close button으로 focus 이동
    closeBtnRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={`relative flex flex-col rounded-sm bg-black ${className ?? ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* close button */}
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

      {/* 스크롤 영역 */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">{children}</div>

      {/* 하단 고정 버튼 영역 */}
      {footer && <div className="shrink-0">{footer}</div>}
    </div>
  );
};
