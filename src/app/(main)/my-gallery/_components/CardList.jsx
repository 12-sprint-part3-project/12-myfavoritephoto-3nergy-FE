'use client';

import { Card } from '@/components/domain/photocard/Card';
import { EmptyPhotocardList } from '@/components/domain/photocard/EmptyPhotocardList';

export const CardList = ({ photocards = [] }) => {
  return (
    <div
      className={`grid gap-[5px] pt-[20px] md:gap-[20px] md:pt-[60px] lg:gap-[80px] lg:py-[60px] ${photocards.length > 0 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
    >
      {photocards.length > 0 ? (
        photocards.map((item) => (
          <Card
            key={item.id}
            type="mygallery"
            imageUrl={item.imageUrl}
            name={item.name}
            grade={item.grade}
            genre={item.genre}
            owner={item.ownerNickname}
            price={item.price}
            quantity={item.quantity}
          />
        ))
      ) : (
        <EmptyPhotocardList isFiltered={true} />
      )}
    </div>
  );
};
