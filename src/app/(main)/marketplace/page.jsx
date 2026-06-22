import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getSales } from '@/services/sales';
import { MarketplaceContent } from '@/app/(main)/marketplace/_components/MarketplaceContent';

export const metadata = {
  title: '마켓플레이스',
  description: '다양한 포토카드를 구매하고 교환해보세요.',
  keywords: ['포토카드', '마켓플레이스', '구매', '교환'],
};

const INITIAL_PARAMS = {
  keyword: '',
  grade: null,
  genre: null,
  status: null,
  sort: 'latest',
  pageSize: 16,
};

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERY_KEYS.sales.list(INITIAL_PARAMS),
    queryFn: () => getSales(INITIAL_PARAMS),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MarketplaceContent />
    </HydrationBoundary>
  );
}
