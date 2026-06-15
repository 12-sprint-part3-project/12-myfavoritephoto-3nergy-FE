'use client';

import { useState, useRef } from 'react';
import { ResponsiveModal } from '@/components/ui/ResponsiveModal';
import { PhotocardSelectList } from '@/app/(main)/marketplace/_components/PhotocardSelectList';

// 포토카드 선택 → 폼 작성 플로우를 담는 공통 모달
// children: (selectedCard, onBack) => ReactNode 형태로 두 번째 단계 폼을 주입받음
export const PhotocardFlowModal = ({ pageTitle, onClose, children }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const scrollContainerRef = useRef(null);

  return (
    <ResponsiveModal
      ref={scrollContainerRef}
      onClose={onClose}
      className="max-h-[80vh] lg:px-[7.5rem] lg:py-[3.75rem]"
    >
      {/* 포토카드 선택 → 폼 작성으로 단계 전환 */}
      {selectedCard ? (
        children(selectedCard, () => setSelectedCard(null))
      ) : (
        <div className="flex items-center justify-center">
          <PhotocardSelectList
            pageTitle={pageTitle}
            onSelect={(card) => setSelectedCard(card)}
            // 모달 스크롤 컨테이너 ref 전달 (IntersectionObserver root로 사용)
            scrollContainerRef={scrollContainerRef}
          />
        </div>
      )}
    </ResponsiveModal>
  );
};
