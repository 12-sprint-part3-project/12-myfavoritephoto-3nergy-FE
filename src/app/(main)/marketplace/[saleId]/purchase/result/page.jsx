'use client';

import { useSearchParams } from 'next/navigation';
import { ResultView } from '@/app/(main)/marketplace/_components/ResultView';
import { GRADE_STYLE } from '@/constants/card';

export default function PurchaseResultPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const name = searchParams.get('name');
  const grade = searchParams.get('grade');
  const quantity = searchParams.get('quantity');
  const message = searchParams.get('message');

  const isSuccess = status === 'success';

  return (
    <div className="flex h-[calc(100vh-60px)] items-center justify-center md:h-[calc(100vh-80px)]">
      <ResultView
        title="구매"
        isSuccess={isSuccess}
        description={`[${GRADE_STYLE[grade]?.label} | ${name}] ${quantity}장 구매에 ${isSuccess ? '성공했습니다!' : '실패했습니다.'}`}
        buttonText={
          isSuccess ? '마이갤러리에서 확인하기' : '마켓플레이스로 돌아가기'
        }
        subDescription={message}
        href={isSuccess ? '/my-gallery' : '/marketplace'}
      />
    </div>
  );
}
