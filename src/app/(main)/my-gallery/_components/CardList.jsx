'use client';

import { Card } from '@/components/domain/photocard/Card';
import { GENRE } from '@/constants/card';

export const CardList = ({ photocards = [] }) => {
  return (
    <div className="grid grid-cols-2 gap-[5px] pt-[20px] md:gap-[20px] md:pt-[60px] lg:grid-cols-3 lg:gap-[80px] lg:py-[60px]">
      {photocards.map((item) => (
        <Card
          key={item.id}
          type="mygallery"
          imageUrl={item.imageUrl}
          name={item.name}
          grade={item.grade}
          genre={GENRE[item.genre]}
          owner={item.ownerNickname}
          price={item.price}
          quantity={item.quantity}
        />
      ))}
    </div>
  );
};
