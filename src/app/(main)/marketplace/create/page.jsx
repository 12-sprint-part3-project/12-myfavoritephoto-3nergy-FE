import { SaleCreateContent } from '@/app/(main)/marketplace/create/SaleCreateContent';

export const metadata = {
  title: '포토카드 판매 등록',
  description: '보유한 포토카드를 마켓플레이스에 핀매하세요.',
  keywords: ['포토카드 판매', '판매 등록', '마켓플레이스'],
};

export default function SaleCreatePage() {
  return (
    <>
      <SaleCreateContent />
    </>
  );
}
