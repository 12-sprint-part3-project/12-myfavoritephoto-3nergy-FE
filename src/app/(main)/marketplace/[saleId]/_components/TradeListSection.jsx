'use client';

import { PageTitle } from '@/components/layout/PageTitle';
import { ExchangeCard } from '@/components/domain/photocard/ExchangeCard';
import { useTrades } from '@/hooks/trade/useTrades';

export const TradeListSection = ({ sale }) => {
  const { data: trades, isLoading, error } = useTrades(sale.saleId);

  const handleAccept = (tradeId) => {
    // TODO: API 연동
  };

  const handleReject = (tradeId) => {
    // TODO: API 연동
  };

  // TODO: 스켈레톤 UI로 교체
  if (isLoading) {
    return <div className="text-white">로딩 중...</div>;
  }

  // TODO: 에러 컴포넌트로 교체
  if (error) {
    return <div className="text-white">에러가 발생했습니다.</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-[2.88rem] md:gap-[3rem] lg:gap-[4.38rem]">
        <PageTitle title="교환 제시 목록" variant="heading" />

        {/*교환 제안 목록 카드 리스트*/}
        <ul className="grid grid-cols-2 gap-[0.3125rem] md:gap-[1.25rem] xl:grid-cols-3 xl:gap-[5rem]">
          {trades?.map((trade) => (
            <li key={trade.id}>
              <ExchangeCard
                description={trade.offeredCard.description}
                genre={trade.offeredCard.genre}
                grade={trade.offeredCard.grade}
                imageUrl={trade.offeredCard.imageUrl}
                name={trade.offeredCard.name}
                owner={trade.proposer.nickname}
                price={trade.offeredCard.price}
                onAccept={() => handleAccept(trade.id)}
                onReject={() => handleReject(trade.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
