'use client';

import { useState } from 'react';
import { TradeOfferForm } from '@/app/(main)/marketplace/[saleId]/_components/TradeOfferForm';
import { PhotocardSelectList } from '@/app/(main)/marketplace/_components/PhotocardSelectList';

export const TradeOfferContent = ({ saleId }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      {selectedCard ? (
        <TradeOfferForm
          photocard={selectedCard}
          sale={{ saleId }}
          onBack={() => setSelectedCard(null)}
        />
      ) : (
        <PhotocardSelectList onSelect={(card) => setSelectedCard(card)} />
      )}
    </>
  );
};
