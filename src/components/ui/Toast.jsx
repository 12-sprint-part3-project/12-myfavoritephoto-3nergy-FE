'use client';

import AlertIcon from '@/icons/alert.svg';

export const Toast = ({ message, isVisible }) => {
  return (
    <div
      className={`bg-toast-bg flex w-[20rem] justify-center rounded-[6.1875rem] py-[1.25rem] backdrop-blur-sm transition-all duration-300 md:w-[25rem] md:py-[1.5rem] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <div className="flex items-center justify-center gap-2">
        <AlertIcon className="text-main" />
        <p className="text-noto-16-regular md:text-noto-18-regular text-white">
          {message}
        </p>
      </div>
    </div>
  );
};
