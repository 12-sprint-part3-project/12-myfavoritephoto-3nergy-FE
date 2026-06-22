'use client';

import { SaleRegisterForm } from '@/app/(main)/marketplace/_components/SaleRegisterForm';
import { PhotocardFlowModal } from '@/app/(main)/marketplace/_components/PhotocardFlowModal';

export const CreateSaleModal = ({ onClose }) => {
  return (
    <PhotocardFlowModal
      pageTitle="나의 포토카드 판매하기"
      onClose={onClose}
      excludeOnSale={true}
    >
      {(selectedCard, onBack) => (
        <SaleRegisterForm photocard={selectedCard} onBack={onBack} />
      )}
    </PhotocardFlowModal>
  );
};
