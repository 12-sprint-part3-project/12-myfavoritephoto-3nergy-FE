import { useQuery } from '@tanstack/react-query';
import { MINUTE } from '@/constants/time';

// 필터 조합에 해당하는 총 개수를 조회: MobileFilterBottomSheet 확인 버튼에 개수 표시
export const useTotalCount = (queryKey, queryFn, options = {}) => {
  return useQuery({
    queryKey,
    queryFn,
    // 같은 필터 조합 재선택 시 캐시에서 즉시 반환
    staleTime: MINUTE * 5,
    select: (res) => res.meta.totalCount,
    enabled: options.enabled ?? true,
  });
};
