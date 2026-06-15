import { useMediaQuery } from '@/hooks/common/useMediaQuery';

const PAGE_SIZE = {
  desktop: 15, // 3 x 5
  mobile: 16, // 2 x 8
};

export function usePageSize() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop ? PAGE_SIZE.desktop : PAGE_SIZE.mobile;
}
