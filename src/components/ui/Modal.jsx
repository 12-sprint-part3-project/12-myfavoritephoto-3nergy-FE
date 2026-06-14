'use client';

import { useEffect, useRef } from 'react';
import CloseIcon from '@/icons/close.svg';

// ref: 외부에서 스크롤 컨테이너에 접근이 필요한 경우 전달 (예: 무한스크롤 IntersectionObserver root)
export const Modal = ({ onClose, footer, className, children, ref }) => {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // 모달 열릴 때 닫기 버튼으로 포커스 이동 (접근성)
    closeBtnRef.current?.focus();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={`relative flex max-h-[95vh] flex-col rounded-sm bg-gray-500 ${className ?? ''}`}
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

      {/* 스크롤 영역: ref를 달아 외부에서 IntersectionObserver root로 사용 가능 */}
      <div ref={ref} className="custom-scrollbar flex-1 overflow-y-auto">
        {children}
      </div>

      {/* 하단 고정 버튼 영역 */}
      {footer && <div className="shrink-0">{footer}</div>}
    </div>
  );
};
