'use client';

import { ExchangeCard } from '@/components/domain/photocard/ExchangeCard';
import { PageTitle } from '@/components/layout/PageTitle';

export const MyTradeOfferSection = ({ offers }) => {
  const handleCancle = (offerId) => {
    // TODO: API 연동
  };

  const mockMyTradeOffers = [
    {
      tradeId: 'trade-001',
      imageUrl: 'https://picsum.photos/seed/card1/400/300',
      name: '아이유 팬미팅 2024',
      grade: 'rare',
      genre: 'fan_meeting',
      owner: '별빛수집가',
      price: 15000,
      description: '직촬 고화질, 미개봉 상태입니다. 교환 환영해요!',
      nickname: '나',
    },
    {
      tradeId: 'trade-002',
      imageUrl: 'https://picsum.photos/seed/card2/400/300',
      name: 'BTS 버터 한정판',
      grade: 'super_rare',
      genre: 'album',
      owner: '문스타',
      price: 32000,
      description: '정품 인증 완료. 슬리브 포함입니다.',
      nickname: '나',
    },
    {
      tradeId: 'trade-003',
      imageUrl: 'https://picsum.photos/seed/card3/400/300',
      name: '에스파 Armageddon',
      grade: 'common',
      genre: 'album',
      owner: '하늘별',
      price: 5000,
      description: '상태 S급',
      nickname: '나',
    },
  ];

  return (
    <div className="flex flex-col gap-[2.88rem] md:gap-[3rem] lg:gap-[4.38rem]">
      <PageTitle title="내가 제시한 교환 목록" variant="heading" />

      <ul className="grid grid-cols-2 gap-[0.3125rem] md:gap-[1.25rem] xl:grid-cols-3 xl:gap-[5rem]">
        {mockMyTradeOffers.map((offer) => (
          <li key={offer.tradeId}>
            <ExchangeCard
              description={offer.description}
              genre={offer.genre}
              grade={offer.grade}
              imageUrl={offer.imageUrl}
              name={offer.name}
              owner={offer.nickname}
              price={offer.price}
              variant="buyer"
              onCancel={() => handleCancle(offer.tradeId)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
