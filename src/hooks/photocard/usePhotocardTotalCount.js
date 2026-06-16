import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { MINUTE } from '@/constants/time';
import { getPhotocards } from '@/services/photocard';

// 필터 조합에 해당하는 포토카드 총 개수 조회
// MobileFilterBottomSheet의 확인 버튼에 정확한 개수를 표시하기 위해 사용
export const usePhotocardTotalCount = (params = {}, options = {}) => {
  return useQuery({
    // queryKey에도 동일한 파라미터를 포함해 다른 목록 조회 캐시와 구분
    queryKey: QUERY_KEYS.photocards.list({ ...params, page: 1, pageSize: 1 }),
    // 같은 필터 조합 재선택 시 캐시에서 즉시 반환
    staleTime: MINUTE * 5,
    queryFn: () => getPhotocards({ ...params, page: 1, pageSize: 1 }),
    select: (res) => res.meta.totalCount,
    // enabled 외부 주입 가능 (둘 다 선택됐을 때만 호출하는 등 조건 제어용)
    enabled: options.enabled ?? !!(params.grade || params.genre),
  });
};
