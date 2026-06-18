import { SaleEditContent } from '@/app/(main)/marketplace/[saleId]/edit/SaleEditContent';

export const metadata = {
  title: '포토카드 수정',
  description: '판매 중인 포토카드를 수정하세요.',
};

export default async function SaleEditPage({ params }) {
  const { saleId } = await params;

  return <SaleEditContent saleId={saleId} />;
}
