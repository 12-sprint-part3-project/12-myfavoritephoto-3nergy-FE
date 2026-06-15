'use client';

import { PhotocardFlowModal } from '@/app/(main)/marketplace/_components/PhotocardFlowModal';
import { TradeOfferForm } from '@/app/(main)/marketplace/[saleId]/_components/TradeOfferForm';

export const TradeOfferModal = ({ onClose, sale }) => {
  return (
    <PhotocardFlowModal pageTitle="포토카드 교환하기" onClose={onClose}>
      {(selectedCard, onBack) => (
        <TradeOfferForm photocard={selectedCard} sale={sale} onBack={onBack} />
      )}
    </PhotocardFlowModal>
  );
};
