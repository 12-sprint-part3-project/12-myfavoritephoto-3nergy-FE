'use client';

import { useState } from 'react';
import { SaleRegisterForm } from '@/app/(main)/marketplace/_components/SaleRegisterForm';
import { PhotocardSelectList } from '@/app/(main)/marketplace/_components/PhotocardSelectList';

export const SaleCreateContent = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      {selectedCard ? (
        <div className="xl:pt-[3.75rem px-[0.9375rem] pt-[1.25rem] md:px-[1.25rem] md:pt-[2.5rem]">
          <SaleRegisterForm
            photocard={selectedCard}
            onBack={() => setSelectedCard(null)}
          />
        </div>
      ) : (
        <PhotocardSelectList onSelect={(card) => setSelectedCard(card)} />
      )}
    </>
  );
};
