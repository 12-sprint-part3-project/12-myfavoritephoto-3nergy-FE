'use client';

import Link from 'next/link';
import { Card } from '@/components/domain/photocard/Card';
import { EmptyPhotocardList } from '@/components/domain/photocard/EmptyPhotocardList';

export const CardList = ({ sales = [], isFiltered }) => {
  return (
    <div className="pt-[1.25rem] md:pt-[3.75rem] lg:py-[3.75rem]">
      {sales.length > 0 ? (
        <ul className="grid grid-cols-2 gap-[.3125rem] md:gap-[1.25rem] lg:grid-cols-3 lg:gap-[5rem]">
          {sales.map((item) => (
            <li key={item.saleMethod === 'SALE' ? item.saleId : item.tradeId}>
              <Link href={`/marketplace/${item.saleId}`} title={item.saleId}>
                <Card
                  type="mysales"
                  {...item}
                  owner={item.nickname}
                  status={item.displayStatus}
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPhotocardList
          isFiltered={isFiltered}
          emptyTitle="판매 등록된 카드가 없습니다."
          emptyDescription="마켓플레이스에서 판매할 카드를 등록해보세요."
        />
      )}
    </div>
  );
};
