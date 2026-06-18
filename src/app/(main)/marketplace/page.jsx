import { MarketplaceContent } from '@/app/(main)/marketplace/_components/MarketplaceContent';

export const metadata = {
  title: '마켓플레이스',
  description: '다양한 포토카드를 구매하고 교환해보세요.',
  keywords: ['포토카드', '마켓플레이스', '구매', '교환'],
};

const page = () => {
  return <MarketplaceContent />;
};

export default page;
