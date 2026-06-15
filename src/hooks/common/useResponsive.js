import { useMediaQuery } from '@/hooks/common/useMediaQuery';

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

export const useIsMobile = () => useMediaQuery('(max-width: 767px)'); // tailwind 분기를 기준으로 768 에서 767 로 변경
