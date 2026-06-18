'use client';

import { useState } from 'react';
import { TradeOfferForm } from '@/app/(main)/marketplace/[saleId]/_components/TradeOfferForm';
import { PhotocardSelectList } from '@/app/(main)/marketplace/_components/PhotocardSelectList';

export const TradeOfferContent = ({ saleId }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="xl:pt-[3.75rem px-[0.9375rem] pt-[1.25rem] md:px-[1.25rem] md:pt-[2.5rem]">
      {selectedCard ? (
        <TradeOfferForm
          photocard={selectedCard}
          sale={{ saleId }}
          onBack={() => setSelectedCard(null)}
        />
      ) : (
        <PhotocardSelectList onSelect={(card) => setSelectedCard(card)} />
      )}
    </div>
  );
};
