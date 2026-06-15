'use client';

import { Card } from '@/components/domain/photocard/Card';
import { EmptyPhotocardList } from '@/components/domain/photocard/EmptyPhotocardList';

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
            genre={item.genre}
            owner={item.ownerNickname}
            price={item.price}
            remainingQuantity={item.remainingQuantity}
            status={item.displayStatus}
          />
        ))
      ) : (
        <EmptyPhotocardList isFiltered={true} />
      )}
    </div>
  );
};
