import { TradeOfferContent } from '@/app/(main)/marketplace/[saleId]/trade/TradeOfferContent';

export const metadata = {
  title: '포토카드 교환 제안',
  description: '보유한 포토카드를 갖고 싶은 포토카드와 교환해보세요.',
  keywords: ['포토카드 교환', '교환 제안', '마켓플레이스'],
};

export default function TradeOfferPage() {
  return (
    <>
      <TradeOfferContent />
    </>
  );
}
