import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    // 컴포넌트 마운트 시 한 번만 실행
    // SSR 환경에서는 false, 클라이언트에서는 현재 뷰포트 기준으로 초기값 설정
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    // 뷰포트 크기 변경 시 isDesktop 업데이트
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);

  return matches;
}
