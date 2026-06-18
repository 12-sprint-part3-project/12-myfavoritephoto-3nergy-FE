'use client';

import { Card } from '@/components/domain/photocard/Card';
import { EmptyPhotocardList } from '@/components/domain/photocard/EmptyPhotocardList';
import Link from 'next/link';

export const CardList = ({ sales = [] }) => {
  return (
    <div className="pt-[1.25rem] md:pt-[3.75rem] lg:py-[3.75rem]">
      {/* TODO: 판매중 상태인 카드는 상세페이지로 넘어갈 수 있게 처리 */}
      {sales.length > 0 ? (
        <ul className="grid grid-cols-2 gap-[.3125rem] md:gap-[1.25rem] lg:grid-cols-3 lg:gap-[5rem]">
          {sales.map((item) => (
            <li key={item.saleMethod === 'SALE' ? item.saleId : item.tradeId}>
              <Link href={`/marketplace/${item.saleId}`}>
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
        <EmptyPhotocardList isFiltered={true} />
      )}
    </div>
  );
};
