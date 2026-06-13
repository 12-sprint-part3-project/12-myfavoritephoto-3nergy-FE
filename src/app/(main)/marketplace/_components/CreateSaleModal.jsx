'use client';

import { useState } from 'react';
import { ResponsiveModal } from '@/components/ui/ResponsiveModal';
import { SaleRegisterForm } from '@/app/(main)/marketplace/_components/SaleRegisterForm';
import { PhotocardSelectList } from '@/app/(main)/marketplace/_components/PhotocardSelectList';

export const CreateSaleModal = ({ onClose }) => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <ResponsiveModal onClose={onClose} className="max-h-[80vh] w-[35rem] p-10">
      {selectedCard ? (
        <SaleRegisterForm
          photocard={selectedCard}
          onBack={() => setSelectedCard(null)}
        />
      ) : (
        <div className="flex items-center justify-center">
          <PhotocardSelectList onSelect={(card) => setSelectedCard(card)} />
        </div>
      )}
    </ResponsiveModal>
  );
};
