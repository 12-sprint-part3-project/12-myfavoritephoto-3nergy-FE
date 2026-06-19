'use client';

import { useMe } from '@/hooks/user/useMe';
import { usePhotocards } from '@/hooks/photocard/usePhotocards';
import { Spinner } from '@/components/ui/Spinner';
import GradeBadgeList from '@/components/domain/photocard/GradeBadgeList';

export const OwnedCardsInfo = () => {
  const { data: me, isLoading: isUserLoading } = useMe();
  const { data, isLoading: isGalleryLoading } = usePhotocards();

  const isAllLoaded = !isUserLoading && !isGalleryLoading;

  return (
    <div className="border-b border-gray-400 py-[20px] pt-0 md:py-[40px]">
      <div
        className={`${isAllLoaded ? '' : 'h-[2.25rem] w-[12.5rem] animate-pulse rounded bg-gray-400'} mb-[15px] flex items-center gap-[5px] md:mb-[20px] md:gap-[10px]`}
      >
        {isAllLoaded ? (
          <>
            <span className="text-noto-14-bold text-gray-200 md:text-noto-20-bold lg:text-noto-24-bold">
              {me?.nickname} 님이 보유한 포토카드
            </span>
            <span className="text-noto-12-regular text-gray-300 md:text-noto-18-regular lg:text-noto-20-regular">
              ({data?.meta.totalCount}장)
            </span>
          </>
        ) : (
          ''
        )}
      </div>

      {isAllLoaded ? (
        <GradeBadgeList grades={data.data.gradeCounts} />
      ) : (
        <div>
          <Spinner />
        </div>
      )}
    </div>
  );
};
