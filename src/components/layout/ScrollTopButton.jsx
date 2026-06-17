'use client';

export const ScrollTopButton = () => {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label="맨 위로"
      className="flex h-[3.75rem] w-[3.75rem] cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-gray-500 text-noto-16-bold text-white md:h-20 md:w-20 md:text-noto-20-bold"
    >
      TOP
    </button>
  );
};
