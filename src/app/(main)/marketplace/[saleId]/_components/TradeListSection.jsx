'use client';

import { useToastContext } from '@/context/ToastContext';
import { useTrades } from '@/hooks/trade/useTrades';
import { useAcceptTrade } from '@/hooks/trade/useAcceptTrade';
import { useRejectTrade } from '@/hooks/trade/useRejectTrade';
import { ExchangeCard } from '@/components/domain/photocard/ExchangeCard';
import { ExchangeCardSkeleton } from '@/components/domain/photocard/ExchangeCardSkeleton';

export const TradeListSection = ({ sale }) => {
  const { data: trades, isLoading, error } = useTrades(sale.saleId);
  const { mutate: acceptTrade, isPending: isAcceptPending } = useAcceptTrade(
    sale.saleId,
  );
  const { mutate: rejectTrade, isPending: isRejectPending } = useRejectTrade(
    sale.saleId,
  );

  const { showToast } = useToastContext();

  const handleAccept = (tradeId, closeModal) => {
    acceptTrade(tradeId, {
      onSuccess: () => {
        closeModal();
        showToast('교환 제시를 수락했습니다.');
      },
      onError: () => {
        closeModal();
      },
    });
  };

  const handleReject = (tradeId, closeModal) => {
    rejectTrade(tradeId, {
      onSuccess: () => {
        closeModal();
        showToast('교환 제시를 거절했습니다.');
      },
      onError: () => {
        closeModal();
      },
    });
  };

  // TODO: 스켈레톤 UI로 교체
  if (isLoading) {
    return (
      <ul className="grid grid-cols-2 gap-[0.3125rem] md:gap-[1.25rem] xl:grid-cols-3 xl:gap-[5rem]">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i}>
            <ExchangeCardSkeleton />
          </li>
        ))}
      </ul>
    );
  }

  // TODO: 에러 컴포넌트로 교체
  if (error) {
    return <div className="text-white">에러가 발생했습니다.</div>;
  }

  if (trades?.length === 0) {
    return (
      <p className="text-noto-20-regular text-gray-300">
        받은 교환 제안이 없습니다.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-[0.3125rem] md:gap-[1.25rem] xl:grid-cols-3 xl:gap-[5rem]">
      {trades?.map((trade) => (
        <li key={trade.id}>
          <ExchangeCard
            {...trade.offeredCard} // description, genre, grade, imageUrl, name, price
            owner={trade.proposer.nickname}
            isPending={isAcceptPending || isRejectPending}
            onAccept={(closeModal) => handleAccept(trade.id, closeModal)}
            onReject={(closeModal) => handleReject(trade.id, closeModal)}
          />
        </li>
      ))}
    </ul>
  );
};
