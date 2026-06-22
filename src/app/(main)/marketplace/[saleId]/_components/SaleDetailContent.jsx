'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getErrorHandler } from '@/constants/errorHandler';
import { useMe } from '@/hooks/user/useMe';
import { useSaleDetail } from '@/hooks/sale/useSaleDetail';
import { Spinner } from '@/components/ui/Spinner';
import { PageTitle } from '@/components/layout/PageTitle';
import { CardDetail } from '@/app/(main)/marketplace/[saleId]/_components/CardDetail';
import { CardInfo } from '@/app/(main)/marketplace/[saleId]/_components/CardInfo';
import { SellerTradeInfo } from '@/app/(main)/marketplace/[saleId]/_components/SellerTradeInfo';
import { SellerButtons } from '@/app/(main)/marketplace/[saleId]/_components/SellerButtons';
import { BuyerActions } from '@/app/(main)/marketplace/[saleId]/_components/BuyerActions';
import { TradeListSection } from '@/app/(main)/marketplace/[saleId]/_components/TradeListSection';
import { BuyerTradeSection } from '@/app/(main)/marketplace/[saleId]/_components/BuyerTradeSection';

export const SaleDetailContent = ({ saleId }) => {
  const { accessToken } = useAuth();
  const { data: me } = useMe();
  const { data: sale, isLoading, error } = useSaleDetail(saleId);

  const isSeller = !!accessToken && sale?.seller?.uuid === me?.uuid;

  if (isLoading) {
    return (
      <>
        <div className="mb-[1.63rem] md:mb-[3rem] lg:mb-[4.36rem]">
          <div className="w-full border-b border-gray-200">
            <div className="mb-[0.94rem] hidden animate-pulse rounded bg-gray-400 md:mb-[2.5rem] md:block md:h-[1.5rem] md:w-[8rem] lg:h-[2.25rem]" />
            <div className="mb-[0.625rem] h-[2.25rem] w-[12rem] animate-pulse rounded bg-gray-400 md:mb-[1.25rem] md:h-[3rem] md:w-[16rem] lg:h-[3.75rem] lg:w-[20rem]" />
          </div>
        </div>
        <div className="flex h-[30rem] items-center justify-center">
          <Spinner />
        </div>
      </>
    );
  }

  // TODO: 에러 컴포넌트로 교체
  if (error) {
    const { action } = getErrorHandler(error?.code);
    if (action === 'not-found') {
      notFound();
    }
    return <div className="text-white">에러가 발생했습니다.</div>;
  }

  if (!sale) return null;

  const isCanceled = sale.status === 'CANCELED';
  const isSoldOut = sale.status === 'SOLD_OUT';

  return (
    <>
      <div className="mb-[1.63rem] md:mb-[3rem] lg:mb-[4.36rem]">
        <PageTitle
          variant="heading"
          breadcrumb="마켓플레이스"
          breadcrumbHref="/marketplace"
          title={sale?.photocard?.name}
          hideBreadcrumbOnMobile
        />
      </div>

      {/* 카드이미지 || 카드정보 레이아웃 */}
      <CardDetail sale={sale}>
        {/* 공통 카드 정보 (등급, 장르, 닉네임, 설명, 가격, 잔여) */}
        <CardInfo sale={sale} />
        {isCanceled ? (
          <div className="flex flex-col items-center gap-4 pt-[3.75rem] text-white">
            <p className="text-noto-20-bold">판매가 종료된 상품입니다.</p>
            <Link
              href="/marketplace"
              className="text-noto-16-regular text-gray-300 underline hover:text-white"
            >
              마켓플레이스로 돌아가기
            </Link>
          </div>
        ) : isSoldOut ? (
          <div className="flex flex-col items-center gap-4 pt-[3.75rem] text-white">
            <p className="text-noto-20-bold">품절된 상품입니다.</p>
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

      {!isCanceled && !isSoldOut && (
        <div className="mt-[7.5rem]">
          {isSeller ? (
            <div className="flex flex-col gap-[2.88rem] md:gap-[3rem] lg:gap-[4.38rem]">
              <PageTitle title="교환 제시 목록" variant="heading" />
              <TradeListSection sale={sale} />
            </div>
          ) : (
            <BuyerTradeSection sale={sale} />
          )}
        </div>
      )}
    </>
  );
};
