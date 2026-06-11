'use client';

import { PageTitle } from '@/components/layout/PageTitle';
import { ExchangeCard } from '@/components/domain/photocard/ExchangeCard';
// import { useTrades } from '@/hooks/trades/useTrades';

export const TradeListSection = ({ sale }) => {
  /* 
  // NOTE: API 연동 
  const { data: trades, isLoading } = useTrades(); // PENDING 필터링은 select에서 수행
  
  if (isLoading) {
    return <Spinner />;
  }
  */

  const trades = [
    {
      id: 1,
      status: 'PENDING',
      offeredCard: {
        id: 12,
        name: '노을 지는 한강',
        imageUrl: 'https://picsum.photos/seed/trade1/400/400',
        grade: 'RARE',
        genre: '풍경',
        price: 12,
        description: '한강에서 직접 찍은 노을 사진입니다.',
      },
      proposer: { uuid: 'uuid-1', nickname: '하늘보리' },
      createdAt: '2026-06-02T08:30:00.000Z',
    },
    {
      id: 2,
      status: 'PENDING',
      offeredCard: {
        id: 14,
        name: '제주 바다',
        imageUrl: 'https://picsum.photos/seed/trade3/400/400',
        grade: 'LEGENDARY',
        genre: '풍경',
        price: 20,
        description: '제주 바다 사진입니다.',
      },
      proposer: { uuid: 'uuid-3', nickname: '바다여행자' },
      createdAt: '2026-05-30T08:30:00.000Z',
    },
  ];

  const handleAccept = (tradeId) => {
    // TODO: API 연동
  };

  const handleReject = (tradeId) => {
    // TODO: API 연동
  };

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
