'use client';

import { useState } from 'react';
import { PhotocardSelectList } from '@/app/(main)/marketplace/_components/PhotocardSelectList';

export const SaleCreateContent = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      {selectedCard ? (
        <div>판매 정보 입력 (TODO)</div>
      ) : (
        <PhotocardSelectList onSelect={(card) => setSelectedCard(card)} />
      )}
    </>
  );
};
