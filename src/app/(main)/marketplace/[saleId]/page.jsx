import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getSaleDetail } from '@/services/sales';
import { SaleDetailContent } from '@/app/(main)/marketplace/[saleId]/_components/SaleDetailContent';

export async function generateMetadata({ params }) {
  const { saleId } = await params;
  const sale = await getSaleDetail(saleId).catch(() => null);

  return {
    title: sale?.photocard?.name ?? '포토카드 상세',
    description: sale?.description ?? '포토카드 상세 정보를 확인하세요.',
    keywords: [sale?.photocard?.name, '포토카드', '구매', '교환'].filter(
      Boolean,
    ),
  };
}

export default async function page({ params }) {
  const { saleId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.sales.detail(saleId),
    queryFn: () => getSaleDetail(saleId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="px-[0.9375rem] pt-[1.25rem] pb-[40px] md:px-[1.25rem] md:pt-[2.5rem] md:pb-[60px] lg:pt-[3.75rem] xl:pt-[3.75rem] xl:pb-[180px]">
        <SaleDetailContent saleId={saleId} />
      </div>
    </HydrationBoundary>
  );
}
