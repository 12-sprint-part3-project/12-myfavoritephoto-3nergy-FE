'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResultView } from '@/components/feedback/ResultView';
import { GRADE_STYLE } from '@/constants/card';

function PhotocardCreateResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get('status');
  const name = searchParams.get('name');
  const grade = searchParams.get('grade');

  const isSuccess = status === 'success';

  return (
    <div className="flex h-[calc(100vh-60px)] items-center justify-center md:h-[calc(100vh-80px)]">
      <ResultView
        title="포토카드 생성"
        isSuccess={isSuccess}
        description={`[${GRADE_STYLE[grade].label} | ${name}] 포토카드 생성에 ${isSuccess ? '성공했습니다!' : '실패했습니다.'}`}
        buttonText={
          isSuccess ? '마이갤러리에서 확인하기' : '마이갤러리로 돌아가기'
        }
        onClick={() => router.push('/my-gallery')}
      />
    </div>
  );
}

export default function page() {
  return (
    <Suspense>
      <PhotocardCreateResultContent />
    </Suspense>
  );
}
