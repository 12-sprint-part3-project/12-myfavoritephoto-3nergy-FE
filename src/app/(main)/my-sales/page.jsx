import { PageTitle } from '@/components/layout/PageTitle';
import { MySalesContent } from '@/app/(main)/my-sales/_components/MySalesContent';

export const metadata = {
  title: '나의 판매 포토카드',
  description: '내가 판매 중인 포토카드 목록을 확인하세요.',
  keywords: ['포토카드', '판매', '나의 판매'],
};

export default function page() {
  return (
    <div className="pb-[40px] md:pb-[110px] xl:pb-[140px]">
      <PageTitle title={metadata.title} variant="title-lg" />

      <MySalesContent />
    </div>
  );
}
