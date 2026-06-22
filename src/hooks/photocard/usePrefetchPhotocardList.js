import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPhotocards } from '@/services/photocard';

export const usePrefetchPhotocardList = (path, extraParams = {}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const params = { sort: 'latest', pageSize: 20, ...extraParams };

    if (path) {
      router.prefetch(path);
    }

    queryClient.prefetchInfiniteQuery({
      queryKey: QUERY_KEYS.photocards.list(params),
      queryFn: ({ pageParam = 1 }) =>
        getPhotocards({ ...params, page: pageParam }),
      initialPageParam: 1,
    });
  }, [path, router, queryClient]); // extraParams 객체는 매 렌더마다 새로 생성되므로 의존성에서 제외
};
