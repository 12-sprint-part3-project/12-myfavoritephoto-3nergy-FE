'use client';

import Image from 'next/image';
import { useState } from 'react';
import { RandomPointModal } from '@/components/domain/point/RandomPointModal';
import { useMe } from '@/hooks/user/useMe';
import { usePointCooldown } from '@/hooks/point/usePointCooldown';

export const RandomPointButton = () => {
  const { data: me } = useMe();
  const [showModal, setShowModal] = useState(false);

  usePointCooldown(me?.uuid, () => setShowModal(true));

  if (!me) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        aria-label="랜덤포인트 뽑기"
        className="flex h-[3.75rem] w-[3.75rem] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-400 bg-gray-500 md:h-20 md:w-20"
      >
        <Image
          src="/images/point/random_box-3.png"
          alt="랜덤포인트"
          width={40}
          height={40}
          sizes="40px"
          className="h-1/2 w-1/2 object-contain"
        />
      </button>
      {showModal && <RandomPointModal onClose={() => setShowModal(false)} />}
    </>
  );
};
