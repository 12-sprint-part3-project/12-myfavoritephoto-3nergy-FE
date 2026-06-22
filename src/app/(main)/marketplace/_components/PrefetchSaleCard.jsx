'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Card } from '@/components/domain/photocard/Card';
import { usePrefetchSaleDetail } from '@/hooks/sale/usePrefetchSaleDetail';

export const PrefetchSaleCard = ({ card }) => {
  const ref = useRef(null);
  const isPrefetched = useRef(false);

  const prefetchSaleDetail = usePrefetchSaleDetail();

  const prefetch = () => {
    if (isPrefetched.current) return;

    isPrefetched.current = true;

    // React Query 캐시에 저장
    prefetchSaleDetail(card.id);

    // 이미지 브라우저 캐시
    const img = new window.Image();
    img.src = card.imageUrl;
  };

  useEffect(() => {
    const target = ref.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          prefetch();
          observer.disconnect();
        }
      },
      {
        rootMargin: '300px',
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <Link
        href={`/marketplace/${card.id}`}
        onMouseEnter={prefetch}
        onTouchStart={prefetch}
      >
        <Card type="marketplace" {...card} />
      </Link>
    </div>
  );
};
