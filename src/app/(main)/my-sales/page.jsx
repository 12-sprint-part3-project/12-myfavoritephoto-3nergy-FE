import { PageTitle } from '@/components/layout/PageTitle';
import { MySalesContent } from '@/app/(main)/my-sales/_components/MySalesContent';

export const metadata = {
  title: '나의 판매 포토카드',
  description: '내가 판매 중인 포토카드 목록을 확인하세요.',
  keywords: ['포토카드', '판매', '나의 판매'],
};

export default function page() {
  return (
    <div className="px-[0.9375rem] pt-[1.25rem] pb-[40px] md:px-[1.25rem] md:pt-[2.5rem] md:pb-[110px] xl:pt-[3.75rem] xl:pb-[140px]">
      <PageTitle
        title={metadata.title}
        className="hidden md:block"
        variant="title-lg"
      />

      <MySalesContent />
    </div>
  );
}
