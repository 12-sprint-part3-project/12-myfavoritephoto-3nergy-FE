'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ResultView } from '@/components/domain/ResultView';

function TradeOfferResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get('status');
  const message = searchParams.get('message');

  const isSuccess = status === 'success';

  return (
    <div className="flex h-[calc(100vh-60px)] items-center justify-center md:h-[calc(100vh-80px)]">
      <ResultView
        title="교환 제시"
        isSuccess={isSuccess}
        description={`포토카드 교환 제시에 ${isSuccess ? '성공했습니다!' : '실패했습니다.'}`}
        buttonText={
          isSuccess
            ? '나의 판매 포토카드에서 확인하기'
            : '마켓플레이스로 돌아가기'
        }
        subDescription={message}
        onClick={
          isSuccess
            ? () => router.push('/my-sales')
            : () => router.push('/marketplace')
        }
      />
    </div>
  );
}

export default function TradeOfferResultPage() {
  return (
    <Suspense>
      <TradeOfferResultContent />
    </Suspense>
  );
}
