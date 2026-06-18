'use client';

import { useState, useRef } from 'react';

// ref: 외부에서 스크롤 컨테이너에 접근이 필요한 경우 전달 (예: 무한스크롤 IntersectionObserver root)
export const BottomSheet = ({ onClose, footer, children, ref }) => {
  const sheetRef = useRef(null);
  const startYRef = useRef(null);
  const [dragY, setDragY] = useState(0);

  const handleDragStart = (e) => {
    startYRef.current = e.touches?.[0]?.clientY ?? e.clientY;
  };

  const handleDragMove = (e) => {
    if (startYRef.current === null) {
      return;
    }

    const currentY = e.touches?.[0]?.clientY ?? e.clientY;
    const diff = currentY - startYRef.current;

    // 바텀 시트는 아래 방향 드래그 동작만 허용
    // 위 방향 드래그 동작은 모달 내부 스크롤 영역
    if (diff < 0) {
      return;
    }

    setDragY(diff);
  };

  const handleDragEnd = () => {
    const sheetHeight = sheetRef.current?.offsetHeight ?? 0;

    // 사용자가 아래로 드래그한 거리(dragY)가 시트 높이의 30% 이상이면 바텀시트 닫음
    const shouldClose = dragY >= sheetHeight * 0.3;
    if (shouldClose) {
      onClose();
    }

    startYRef.current = null;
    setDragY(0);
  };

  return (
    <div
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      style={{
        transform: `translateY(${dragY}px)`,
        transition: dragY === 0 ? 'transform 0.3s ease' : 'none',
      }}
      className="flex max-h-[95vh] w-full flex-col rounded-t-[1.25rem] bg-gray-500 px-[1.25rem]"
    >
      {/* 드래그 핸들 */}
      <div
        className="flex shrink-0 cursor-grab justify-center pt-[0.94rem] pb-[1.87rem] active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <div className="h-[0.375rem] w-[3rem] rounded-[3.125rem] bg-gray-400" />
      </div>

      {/* 스크롤 영역: ref를 달아 외부에서 IntersectionObserver root로 사용 가능 */}
      <div ref={ref} className="custom-scrollbar flex-1 overflow-y-auto">
        {children}
      </div>

      {/* 하단 고정 버튼 영역 */}
      {footer && <div className="shrink-0 pb-[3.75rem]">{footer}</div>}
    </div>
  );
};
