import { useMediaQuery } from '@/hooks/common/useMediaQuery';

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
