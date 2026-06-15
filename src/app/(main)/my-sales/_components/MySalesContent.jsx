'use client';

import { useMe } from '@/hooks/user/useMe';
import { useMySales } from '@/hooks/sale/useMySales';
import GradeBadgeList from '@/components/domain/photocard/GradeBadgeList';
import { OwnedCardsInfo } from '@/app/(main)/my-sales/_components/OwnedCardsInfo';
import { MySalesCardSection } from '@/app/(main)/my-sales/_components/MySalesCardSection';

export const MySalesContent = () => {
  const { data: me } = useMe();
  const { data, isLoading, error } = useMySales();

  // TODO: 스켈레톤 UI로 교체
  if (isLoading) return <div className="text-white">로딩 중...</div>;

  // TODO: 에러 컴포넌트로 교체
  if (error) return <div className="text-white">에러가 발생했습니다.</div>;

  //   console.log(data);

  const { gradeCounts: grades } = data.data;
  const allCardsCnt = data.meta.totalCount;

  return (
    <>
      <div className="border-b border-gray-400 py-[40px]">
        <OwnedCardsInfo nickname={me?.nickname} allCardsCnt={allCardsCnt} />
        <GradeBadgeList grades={grades} />
      </div>

      <MySalesCardSection />
    </>
  );
};
