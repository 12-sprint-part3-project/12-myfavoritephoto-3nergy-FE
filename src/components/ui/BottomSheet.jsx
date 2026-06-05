'use client';

export const BottomSheet = ({ footer, children }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      // 바텀시트와 화면 위쪽 간 10% 여백
      className="flex max-h-[90vh] w-full flex-col rounded-t-[1.25rem] bg-gray-500"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 드래그 핸들 */}
      <div className="flex shrink-0 cursor-grab justify-center pt-[0.94rem] pb-[1.87rem] active:cursor-grabbing">
        <div className="h-[0.375rem] w-[3rem] rounded-[3.125rem] bg-gray-400" />
      </div>

      {/* 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto px-[1.25rem]">{children}</div>

      {/* 하단 고정 버튼 영역 */}
      {footer && (
        <div className="shrink-0 px-[1.25rem] pb-[3.75rem]">{footer}</div>
      )}
    </div>
  );
};
