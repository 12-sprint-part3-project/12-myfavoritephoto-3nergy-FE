'use client';

import { Card } from '@/components/domain/photocard/Card';
import { EmptyPhotocardList } from '@/components/domain/photocard/EmptyPhotocardList';

export const CardList = ({ photocards = [], isFilteredEmpty }) => {
  return (
    <div className="pt-[1.25rem] md:pt-[3.75rem] lg:py-[3.75rem]">
      {photocards.length > 0 ? (
        <ul className="grid grid-cols-2 gap-[.3125rem] md:gap-[1.25rem] lg:grid-cols-3 lg:gap-[5rem]">
          {photocards.map((item) => (
            <li key={item.id}>
              <Card type="mygallery" {...item} owner={item.ownerNickname} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPhotocardList
          isFiltered={isFilteredEmpty}
          emptyTitle="생성된 카드가 없습니다."
          emptyDescription="카드를 생성해보세요."
        />
      )}
    </div>
  );
};
