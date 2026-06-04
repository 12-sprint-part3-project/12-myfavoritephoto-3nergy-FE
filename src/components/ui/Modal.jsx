'use client';

import CloseIcon from '@/icons/close.svg';

export const Modal = ({ onClose, className, children }) => {
  return (
    <div
      className={`relative rounded-sm bg-black ${className ?? ''}`}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="group absolute top-[0.9375rem] right-[0.9375rem] p-[0.39rem] lg:top-[1.875rem] lg:right-[1.875rem]"
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
