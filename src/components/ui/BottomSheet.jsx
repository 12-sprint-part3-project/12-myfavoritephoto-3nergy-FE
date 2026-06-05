'use client';

export const BottomSheet = ({ children }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="w-full bg-gray-500 px-[1.25rem] pt-[0.94rem] pb-[3.75rem] md:px-[1.25rem]"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 드래그 핸들 */}
      <div className="mb-[1.87rem] flex justify-center">
        <div className="h-[0.375rem] w-[3rem] rounded-[3.125rem] bg-gray-400" />
      </div>
      {children}
    </div>
  );
};
