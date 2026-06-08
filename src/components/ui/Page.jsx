'use client';

export const Page = ({ page, dropdown = false, isActive = false, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-noto-14-regular md:text-noto-16-regular flex shrink-0 cursor-pointer items-center justify-center rounded-xs text-white ${dropdown ? 'h-[1.875rem] w-[2.125rem] md:h-[2.125rem] md:w-[2.25rem] lg:h-[2.25rem] lg:w-[2.625rem]' : 'h-10 w-10 md:h-[2.8125rem] md:w-[2.8125rem] lg:h-[3.125rem] lg:w-[3.125rem]'} ${
      isActive ? 'border border-white bg-black font-bold' : ''
    }`}
  >
    {page}
  </button>
);
