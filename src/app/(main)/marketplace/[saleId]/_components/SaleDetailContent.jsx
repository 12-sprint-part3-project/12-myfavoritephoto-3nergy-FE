'use client';

import { useAuth } from '@/context/AuthContext';
//import { useMe } from '@/hooks/queries/useMe';
import { CardDetail } from '@/app/(main)/marketplace/[saleId]/_components/CardDetail';
import { CardInfo } from '@/app/(main)/marketplace/[saleId]/_components/CardInfo';
import { SellerTradeInfo } from '@/app/(main)/marketplace/[saleId]/_components/SellerTradeInfo';
import { SellerButtons } from '@/app/(main)/marketplace/[saleId]/_components/SellerButtons';
import { BuyerActions } from '@/app/(main)/marketplace/[saleId]/_components/BuyerActions';
import { TradeListSection } from '@/app/(main)/marketplace/[saleId]/_components/TradeListSection';
import { TradeOfferSection } from '@/app/(main)/marketplace/[saleId]/_components/TradeOfferSection';

export const SaleDetailContent = ({ sale }) => {
  //const { accessToken } = useAuth();
  //const { data: me } = useMe();

  //const isSeller = accessToken && sale?.sellerUuid === me?.uuid;

  const isSeller = false;

  return (
    <>
      {/* 카드이미지 || 카드정보 레이아웃 */}
      <CardDetail sale={sale}>
        {/* 공통 카드 정보 (등급, 장르, 닉네임, 설명, 가격, 잔여) */}
        <CardInfo sale={sale} />
        {/* 소유 여부에 따라 UI 분기: 판매자 / 구매자(수량 인풋, 총 가격, 구매 버튼) */}
        {isSeller ? (
          <div className="flex flex-col gap-10 pt-[3.75rem] lg:gap-[5rem]">
            <SellerTradeInfo sale={sale} /> {/*교환 희망 정보*/}
            <SellerButtons sale={sale} /> {/*수정하기, 판매 내리기 버튼 */}
          </div>
        ) : (
          <BuyerActions sale={sale} />
        )}
      </CardDetail>

      <div className="mt-[7.5rem]">
        {/* 소유 여부에 따라 UI 분기: 판매자(교환 제시 목록) / 구매자(교환 희망 정보, 교환 버튼) */}
        {isSeller ? (
          <TradeListSection sale={sale} />
        ) : (
          <TradeOfferSection sale={sale} />
        )}
      </div>
    </>
  );
};
