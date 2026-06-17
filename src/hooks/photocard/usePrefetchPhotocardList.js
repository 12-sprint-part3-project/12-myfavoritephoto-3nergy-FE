import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getPhotocards } from '@/services/photocard';

const INITIAL_PARAMS = {
  keyword: '',
  grade: '',
  genre: '',
  sort: 'latest',
  pageSize: 20,
};

export const usePrefetchPhotocardList = (path) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (path) {
      router.prefetch(path);
    }

    queryClient.prefetchInfiniteQuery({
      queryKey: QUERY_KEYS.photocards.list(INITIAL_PARAMS),
      queryFn: ({ pageParam = 1 }) =>
        getPhotocards({ ...INITIAL_PARAMS, page: pageParam }),
      initialPageParam: 1,
    });
  }, [path, router, queryClient]);
};
