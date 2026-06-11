import { PageTitle } from '@/components/layout/PageTitle';
import { SaleDetailContent } from '@/app/(main)/marketplace/[saleId]/_components/SaleDetailContent';

export const metadata = {
  title: '포토카드 상세 페이지',
  description: '내가 보유한 포토카드를 확인하세요.',
  keywords: ['최애의 포토에서 구매하세요'],
};

export default async function page({ params }) {
  const { saleId } = await params;

  return (
    <div className="pt-[1.25rem] pb-[40px] md:pt-[2.5rem] md:pb-[60px] lg:pt-[3.75rem] xl:pb-[180px]">
      <div className="mb-[1.63rem] md:mb-[3rem] lg:mb-[4.36rem]">
        <PageTitle
          variant="heading"
          breadcrumb="마켓플레이스"
          title="우리집 앞마당"
          hideBreadcrumbOnMobile
        />
      </div>
      <SaleDetailContent saleId={saleId} />
    </div>
  );
}
