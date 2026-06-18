'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { ResultView } from '@/components/feedback/ResultView';
import { GRADE_STYLE } from '@/constants/card';

export default function SaleCreateResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get('status');
  const name = searchParams.get('name');
  const grade = searchParams.get('grade');
  const quantity = searchParams.get('quantity');
  const message = searchParams.get('message');

  const isSuccess = status === 'success';

  return (
    <div className="flex h-[calc(100vh-60px)] items-center justify-center md:h-[calc(100vh-80px)]">
      <ResultView
        title="판매 등록"
        isSuccess={isSuccess}
        description={`[${GRADE_STYLE[grade]?.label} | ${name}] ${quantity}장 판매 등록이 ${isSuccess ? '완료되었습니다.' : '실패했습니다.'}`}
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
