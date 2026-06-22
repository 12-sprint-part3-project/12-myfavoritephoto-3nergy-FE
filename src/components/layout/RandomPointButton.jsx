'use client';

import Image from 'next/image';
import { useState } from 'react';
import { RandomPointModal } from '@/components/domain/point/RandomPointModal';
import { useMe } from '@/hooks/user/useMe';
import { usePointCooldown } from '@/hooks/point/usePointCooldown';

export const RandomPointButton = () => {
  const { data: me } = useMe();
  const [showModal, setShowModal] = useState(false);

  const { cooldownEndAt } = usePointCooldown(me?.uuid, () =>
    setShowModal(true),
  );
  const canDraw = cooldownEndAt === null;

  if (!me) {
    return null;
  }

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          aria-label={
            canDraw ? '랜덤포인트 뽑기, 지금 뽑기 가능' : '랜덤포인트 뽑기'
          }
          className="flex h-[3.75rem] w-[3.75rem] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-400 bg-gray-500 md:h-20 md:w-20"
        >
          <Image
            src="/images/point/random_box-3.png"
            alt="랜덤포인트"
            width={56}
            height={56}
            sizes="56px"
            className="h-2/3 w-2/3 object-contain"
          />
        </button>
        {canDraw && (
          <span
            aria-hidden="true"
            className="absolute top-1 right-1 h-3 w-3 rounded-full bg-red md:top-1 md:right-1 md:h-4 md:w-4"
          />
        )}
      </div>
      {showModal && <RandomPointModal onClose={() => setShowModal(false)} />}
    </>
  );
};
