'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { useToastContext } from '@/context/ToastContext';
import { getErrorHandler } from '@/constants/errorHandler';
import { useMe } from '@/hooks/user/useMe';
import { PageTitle } from '@/components/layout/PageTitle';
import { OwnedCardsInfo } from '@/app/(main)/my-gallery/_components/OwnedCardsInfo';
import { MyGalleryCardSection } from '@/app/(main)/my-gallery/_components/MyGalleryCardSection';
import { Button } from '@/components/ui/Button';

export const MyGalleryContent = () => {
  const today = new Date();
  const router = useRouter();
  const { showToast } = useToastContext();
  const { data: me } = useMe();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleCreateClick = () => {
    if (me.remainingPhotocardCreationCount === 0) {
      /**
       * TODO: 이 부분은... 뭔가 에러코드값을 상수로 가져와서 넣을 수 있을 것 같은데 알아보고 수정
       */
      const handler = getErrorHandler('PHOTOCARD_CREATION_LIMIT_EXCEEDED');

      setIsDisabled(true);
      showToast(handler.message);
    } else {
      router.push('/my-gallery/new');
    }
  };

  return (
    <div className="px-[0.9375rem] pt-[1.25rem] pb-[40px] md:px-[1.25rem] md:pt-[2.5rem] md:pb-[110px] xl:pt-[3.75rem] xl:pb-[140px]">
      <PageTitle
        title="마이갤러리"
        className="hidden md:block"
        actions={
          <div className="flex items-end gap-[.75rem]">
            <span className="text-noto-14-regular text-gray-300">
              {format(today, 'yyyy년 M월')}
            </span>
            <div className="w-[21.375rem] lg:w-[27.5rem]">
              <Button
                size="lg"
                disabled={isDisabled}
                className="w-full text-noto-18-bold"
                onClick={handleCreateClick}
              >
                포토카드 생성하기{' '}
                {me?.monthlyPhotocardCreationLimit &&
                  `(${me?.remainingPhotocardCreationCount}/${me?.monthlyPhotocardCreationLimit})`}
              </Button>
            </div>
          </div>
        }
        variant="title-lg"
      />

      <OwnedCardsInfo />

      <MyGalleryCardSection />

      <div className="fixed right-0 bottom-[40px] left-0 z-40 px-[.9375rem] md:hidden">
        <Button
          size="lg"
          disabled={isDisabled}
          className="w-full text-noto-18-bold"
          onClick={handleCreateClick}
        >
          포토카드 생성하기{' '}
          {me?.monthlyPhotocardCreationLimit &&
            `(${me?.remainingPhotocardCreationCount}/${me?.monthlyPhotocardCreationLimit})`}
        </Button>
      </div>
    </div>
  );
};
