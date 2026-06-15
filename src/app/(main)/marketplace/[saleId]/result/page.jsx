import { useSearchParams, useRouter } from 'next/navigation';
import { ResultView } from '@/components/feedback/ResultView';

export default async function ResultPage({ params, searchParams }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { status, quantity } = await searchParams;
  const isSuccess = status === 'success';

  // 카드 정보는 saleId로 fetch
  // const sale = await getSale(params.saleId);
  const sale = { photocard: { grade: 'R', name: '아이유' } };

  return (
    <div className="flex h-[calc(100vh-60px)] h-screen items-center justify-center md:h-[calc(100vh-80px)]">
      <ResultView
        title="포토카드 구매 "
        isSuccess={isSuccess}
        description={`[${sale.photocard.grade} | ${sale.photocard.name}] ${quantity}장 구매가 ${isSuccess ? '완료되었습니다.' : '실패했습니다.'}`}
        buttonText={
          isSuccess ? '마이갤러리에서 확인하기' : '마켓플레이스로 돌아가기'
        }
        onClick={
          isSuccess
            ? () => router.push('/my-sales')
            : () => router.push('/marketplace')
        }
      />
    </div>
  );
}
