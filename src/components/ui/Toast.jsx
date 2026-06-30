'use client';

import AlertIcon from '@/icons/alert.svg';

export const Toast = ({ message, isVisible }) => {
  return (
    <div
      className={`fixed top-4 left-1/2 z-50 flex w-[20rem] -translate-x-1/2 justify-center rounded-[6.1875rem] bg-toast-bg py-[1.25rem] backdrop-blur-sm transition-all duration-300 md:w-[25rem] md:py-[1.5rem] ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-2 opacity-0'
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <AlertIcon className="text-main" />
        <p className="text-noto-16-regular text-white md:text-noto-18-regular">
          {message}
        </p>
      </div>
    </div>
  );
};
