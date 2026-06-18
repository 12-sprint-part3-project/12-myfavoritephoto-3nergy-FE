'use client';

import { useState } from 'react';
import { SaleRegisterForm } from '@/app/(main)/marketplace/_components/SaleRegisterForm';
import { PhotocardSelectList } from '@/app/(main)/marketplace/_components/PhotocardSelectList';

export const SaleCreateContent = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      {selectedCard ? (
        <SaleRegisterForm
          photocard={selectedCard}
          onBack={() => setSelectedCard(null)}
        />
      ) : (
        <PhotocardSelectList onSelect={(card) => setSelectedCard(card)} />
      )}
    </>
  );
};
