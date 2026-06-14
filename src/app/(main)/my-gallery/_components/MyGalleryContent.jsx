'use client';

import { useMe } from '@/hooks/user/useMe';
import { usePhotocards } from '@/hooks/photocard/usePhotocards';
import GradeBadgeList from '@/components/domain/photocard/GradeBadgeList';
import { OwnedCardsInfo } from '@/app/(main)/my-gallery/_components/OwnedCardsInfo';
import { MyGalleryCardSection } from '@/app/(main)/my-gallery/_components/MyGalleryCardSection';
import { PAGE_SIZE } from '@/constants/card';

export const MyGalleryContent = () => {
  const { data: me } = useMe();
  const { data, isLoading, error } = usePhotocards({
    page: 1,
    pageSize: PAGE_SIZE,
  });

  // TODO: 스켈레톤 UI로 교체
  if (isLoading) return <div className="text-white">로딩 중...</div>;

  // TODO: 에러 컴포넌트로 교체
  if (error) return <div className="text-white">에러가 발생했습니다.</div>;

  const { gradeCounts: grades } = data.data;
  const allCardsCnt = grades.reduce((acc, g) => acc + g.count, 0);

  return (
    <>
      <div className="border-b border-gray-400 py-[40px]">
        <OwnedCardsInfo nickname={me?.nickname} allCardsCnt={allCardsCnt} />
        <GradeBadgeList grades={grades} />
      </div>

      <MyGalleryCardSection />
    </>
  );
};
