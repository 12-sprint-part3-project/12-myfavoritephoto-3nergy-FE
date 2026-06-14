'use client';

import { useState, useRef } from 'react';
import { ResponsiveModal } from '@/components/ui/ResponsiveModal';
import { SaleRegisterForm } from '@/app/(main)/marketplace/_components/SaleRegisterForm';
import { PhotocardSelectList } from '@/app/(main)/marketplace/_components/PhotocardSelectList';

export const CreateSaleModal = ({ onClose }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  // PhotocardSelectList의 무한스크롤 감지를 위해 모달 스크롤 컨테이너 ref 생성, ResponsiveModal 내부 스크롤 영역에 연결
  const scrollContainerRef = useRef(null);

  return (
    <ResponsiveModal
      ref={scrollContainerRef}
      onClose={onClose}
      className="max-h-[80vh] w-[35rem] p-10"
    >
      {/* 포토카드 선택 → 판매 정보 입력 순서로 단계 전환 */}
      {selectedCard ? (
        <SaleRegisterForm
          photocard={selectedCard}
          onBack={() => setSelectedCard(null)}
        />
      ) : (
        <div className="flex items-center justify-center">
          <PhotocardSelectList
            onSelect={(card) => setSelectedCard(card)}
            // 모달 스크롤 컨테이너 ref 전달 (IntersectionObserver root로 사용)
            scrollContainerRef={scrollContainerRef}
          />
        </div>
      )}
    </ResponsiveModal>
  );
};
