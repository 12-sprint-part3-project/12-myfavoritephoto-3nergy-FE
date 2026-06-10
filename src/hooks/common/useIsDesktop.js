import { useEffect, useState } from 'react';

const LG_BREAKPOINT = '(min-width: 1024px)';

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    // 컴포넌트 마운트 시 한 번만 실행
    // SSR 환경에서는 false, 클라이언트에서는 현재 뷰포트 기준으로 초기값 설정
    () =>
      typeof window !== 'undefined' && window.matchMedia(LG_BREAKPOINT).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(LG_BREAKPOINT);
    // 뷰포트 크기 변경 시 isDesktop 업데이트
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}
