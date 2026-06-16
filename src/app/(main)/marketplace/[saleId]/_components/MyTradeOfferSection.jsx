'use client';

import { useCancelTrade } from '@/hooks/trade/useCancelTrade';
import { useToastContext } from '@/context/ToastContext';
import { PageTitle } from '@/components/layout/PageTitle';
import { ExchangeCard } from '@/components/domain/photocard/ExchangeCard';

export const MyTradeOfferSection = ({ offers, saleId }) => {
  const { mutate: cancelTrade, isPending } = useCancelTrade(saleId);
  const { showToast } = useToastContext();

  const handleCancel = (tradeId, closeModal) => {
    cancelTrade(tradeId, {
      onSuccess: () => {
        closeModal();
        showToast('교환 제시를 취소했습니다.');
      },
      onError: () => {
        closeModal();
      },
    });
  };

  return (
    <div className="flex flex-col gap-[2.88rem] md:gap-[3rem] lg:gap-[4.38rem]">
      <PageTitle title="내가 제시한 교환 목록" variant="heading" />

      <ul className="grid grid-cols-2 gap-[0.3125rem] md:gap-[1.25rem] xl:grid-cols-3 xl:gap-[5rem]">
        {offers.map((offer) => (
          <li key={offer.id}>
            <ExchangeCard
              {...offer.offeredCard} // description, genre, grade, imageUrl, name, price
              owner={offer.receiver.nickname}
              variant="buyer"
              onCancel={(closeModal) => handleCancel(offer.id, closeModal)}
              isPending={isPending}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
