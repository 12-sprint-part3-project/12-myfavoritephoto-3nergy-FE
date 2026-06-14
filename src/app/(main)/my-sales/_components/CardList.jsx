'use client';

import { Card } from '@/components/domain/photocard/Card';
import { GENRE } from '@/constants/card';

export const CardList = ({ sales = [] }) => {
  return (
    <div
      className={`grid gap-[5px] pt-[20px] md:gap-[20px] md:pt-[60px] lg:gap-[80px] lg:py-[60px] ${sales.length > 0 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
    >
      {/* TODO: 판매중 상태인 카드는 상세페이지로 넘어갈 수 있게 처리 */}
      {sales.length > 0 ? (
        sales.map((item) => (
          <Card
            key={item.id}
            type="mysales"
            imageUrl={item.imageUrl}
            name={item.name}
            grade={item.grade}
            genre={GENRE[item.genre]}
            owner={item.ownerNickname}
            price={item.price}
            remainingQuantity={item.remainingQuantity}
            status={item.displayStatus}
          />
        ))
      ) : (
        <div className="flex h-[20rem] flex-col items-center justify-center">
          <p className="text-noto-20-regular text-gray-300">
            검색 결과가 없습니다.
          </p>
          <p className="text-noto-16-regular mt-2 text-gray-300">
            다른 검색어나 필터를 선택해보세요.
          </p>
        </div>
      )}
    </div>
  );
};
