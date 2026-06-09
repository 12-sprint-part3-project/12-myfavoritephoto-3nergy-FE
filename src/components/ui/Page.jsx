'use client';

export const Page = ({ page, isActive = false, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-noto-14-regular md:text-noto-16-regular flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xs text-white md:h-[2.8125rem] md:w-[2.8125rem] lg:h-[3.125rem] lg:w-[3.125rem] ${
      isActive ? 'border border-white bg-black font-bold' : ''
    }`}
  >
    {page}
  </button>
);
