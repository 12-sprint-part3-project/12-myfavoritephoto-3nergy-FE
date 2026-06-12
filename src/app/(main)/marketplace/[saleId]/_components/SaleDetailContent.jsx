'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useMe } from '@/hooks/auth/useMe';
import { useSaleDetail } from '@/hooks/sale/useSaleDetail';
import { CardDetail } from '@/app/(main)/marketplace/[saleId]/_components/CardDetail';
import { CardInfo } from '@/app/(main)/marketplace/[saleId]/_components/CardInfo';
import { SellerTradeInfo } from '@/app/(main)/marketplace/[saleId]/_components/SellerTradeInfo';
import { SellerButtons } from '@/app/(main)/marketplace/[saleId]/_components/SellerButtons';
import { BuyerActions } from '@/app/(main)/marketplace/[saleId]/_components/BuyerActions';
import { TradeListSection } from '@/app/(main)/marketplace/[saleId]/_components/TradeListSection';
import { TradeOfferSection } from '@/app/(main)/marketplace/[saleId]/_components/TradeOfferSection';

export const SaleDetailContent = ({ saleId }) => {
  const { accessToken } = useAuth();
  const { data: me } = useMe();
  const { data: sale, isLoading, error } = useSaleDetail(saleId);

  const isSeller = !!accessToken && sale?.seller?.uuid === me?.uuid;

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
      {/* 카드이미지 || 카드정보 레이아웃 */}
      <CardDetail sale={sale}>
        {/* 공통 카드 정보 (등급, 장르, 닉네임, 설명, 가격, 잔여) */}
        <CardInfo sale={sale} />
        {sale.status === 'CANCELED' ? (
          <div className="flex flex-col items-center gap-4 pt-[3.75rem] text-white">
            <p className="text-noto-20-bold">판매가 종료된 상품입니다.</p>
            <Link
              href="/marketplace"
              className="text-noto-16-regular text-gray-300 underline hover:text-white"
            >
              마켓플레이스로 돌아가기
            </Link>
          </div>
        ) : isSeller ? (
          <div className="flex flex-col gap-10 pt-[3.75rem] lg:gap-[5rem]">
            <SellerTradeInfo sale={sale} />
            <SellerButtons sale={sale} />
          </div>
        ) : (
          <BuyerActions sale={sale} />
        )}
      </CardDetail>

      {sale.status !== 'CANCELED' && (
        <div className="mt-[7.5rem]">
          {isSeller ? (
            <TradeListSection sale={sale} />
          ) : (
            <TradeOfferSection sale={sale} />
          )}
        </div>
      )}
    </>
  );
};
