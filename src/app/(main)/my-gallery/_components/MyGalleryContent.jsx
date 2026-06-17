'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMe } from '@/hooks/user/useMe';
import { usePhotocards } from '@/hooks/photocard/usePhotocards';
import { PageTitle } from '@/components/layout/PageTitle';
import GradeBadgeList from '@/components/domain/photocard/GradeBadgeList';
import { OwnedCardsInfo } from '@/app/(main)/my-gallery/_components/OwnedCardsInfo';
import { MyGalleryCardSection } from '@/app/(main)/my-gallery/_components/MyGalleryCardSection';
import { Button } from '@/components/ui/Button';
import { showGlobalToast } from '@/lib/toast/toastService';
import { getErrorHandler } from '@/constants/errorHandler';

export const MyGalleryContent = () => {
  const router = useRouter();
  const { data: me } = useMe();
  const { data, isLoading, error } = usePhotocards();
  const [creatable, setCreatable] = useState(false);

  // TODO: 스켈레톤 UI로 교체
  if (isLoading) return <div className="text-white">로딩 중...</div>;

  // TODO: 에러 컴포넌트로 교체
  if (error) return <div className="text-white">에러가 발생했습니다.</div>;

  const { gradeCounts: grades } = data.data;
  const allCardsCnt = data.meta.totalCount; // 총 보유 카드 수량

  const handleCreateClick = () => {
    if (me.remainingPhotocardCreationCount === 0) {
      /**
       * TODO: 이 부분은... 뭔가 에러코드값을 상수로 가져와서 넣을 수 있을 것 같은데 알아보고 수정
       */
      const handler = getErrorHandler('PHOTOCARD_CREATION_LIMIT_EXCEEDED');

      setCreatable((prev) => !prev);
      showGlobalToast(handler.message);
    } else {
      router.push('/my-gallery/new');
    }
  };

  return (
    <div className="pb-[110px] xl:pb-[140px]">
      <PageTitle
        title="마이갤러리"
        className="hidden md:block"
        actions={
          <div className="w-[21.375rem] lg:w-[27.5rem]">
            <Button
              size="lg"
              disabled={creatable}
              className="w-full text-noto-18-bold"
              onClick={handleCreateClick}
            >
              포토카드 생성하기{' '}
              {me.monthlyPhotocardCreationLimit &&
                `(${me.remainingPhotocardCreationCount}/${me.monthlyPhotocardCreationLimit})`}
            </Button>
          </div>
        }
        variant="title-lg"
      />

      <div className="border-b border-gray-400 py-[20px] pt-0 md:py-[40px]">
        <OwnedCardsInfo nickname={me?.nickname} allCardsCnt={allCardsCnt} />
        <GradeBadgeList grades={grades} />
      </div>

      <MyGalleryCardSection />

      <div className="fixed right-0 bottom-[40px] left-0 z-40 px-[.9375rem] md:hidden">
        <Button
          size="lg"
          disabled={creatable}
          className="w-full text-noto-18-bold"
          onClick={handleCreateClick}
        >
          포토카드 생성하기{' '}
          {me.monthlyPhotocardCreationLimit &&
            `(${me.remainingPhotocardCreationCount}/${me.monthlyPhotocardCreationLimit})`}
        </Button>
      </div>
    </div>
  );
};
