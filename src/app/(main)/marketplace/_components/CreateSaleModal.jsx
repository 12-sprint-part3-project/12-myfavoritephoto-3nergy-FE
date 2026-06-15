'use client';

import { SaleRegisterForm } from '@/app/(main)/marketplace/_components/SaleRegisterForm';
import { PhotocardFlowModal } from '@/app/(main)/marketplace/_components/PhotocardFlowModal';

export const CreateSaleModal = ({ onClose }) => {
  return (
    <PhotocardFlowModal onClose={onClose}>
      {(selectedCard, onBack) => (
        <SaleRegisterForm photocard={selectedCard} onBack={onBack} />
      )}
    </PhotocardFlowModal>
  );
};
