import { useIsDesktop } from '@/hooks/common/useResponsive';

const PAGE_SIZE = {
  desktop: 15, // 3 x 5
  mobile: 16, // 2 x 8
};

export function usePageSize() {
  const isDesktop = useIsDesktop();

  return isDesktop ? PAGE_SIZE.desktop : PAGE_SIZE.mobile;
}
