'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Card } from '@/components/domain/photocard/Card';
import { usePrefetchSaleDetail } from '@/hooks/sale/usePrefetchSaleDetail';

export const PrefetchSaleCard = ({ card, priority = false }) => {
  const ref = useRef(null);
  const isPrefetched = useRef(false);

  const prefetchSaleDetail = usePrefetchSaleDetail();

  const prefetch = useCallback(() => {
    if (isPrefetched.current) return;
    isPrefetched.current = true;

    prefetchSaleDetail(card.id);

    const optimizedUrl = `/_next/image?url=${encodeURIComponent(card.imageUrl)}&w=828&q=75`;
    const img = new window.Image();
    img.src = optimizedUrl;
  }, [card.id, card.imageUrl, prefetchSaleDetail]);
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
        <Card type="marketplace" {...card} priority={priority} />
      </Link>
    </div>
  );
};
