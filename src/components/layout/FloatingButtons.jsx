'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { RandomPointModal } from '@/components/domain/point/RandomPointModal';
import { useMe } from '@/hooks/user/useMe';
import { getPointLocalKey } from '@/utils/pointStorage';

export const FloatingButtons = () => {
  const { data: me } = useMe();
  const localKey = me?.uuid ? getPointLocalKey(me.uuid) : null;
  const [showModal, setShowModal] = useState(false);

  // 쿨다운 만료 시 자동 팝업
  useEffect(() => {
    if (showModal || !localKey) return;
    const saved = localStorage.getItem(localKey);
    if (!saved) return;
    const delay = new Date(saved).getTime() - Date.now();
    if (delay <= 0) return;
    const id = setTimeout(() => setShowModal(true), delay);
    return () => clearTimeout(id);
  }, [showModal, localKey]);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="fixed bottom-[50px] right-[50px] z-40 flex flex-col items-center gap-2.5 md:gap-5">
        <button
          type="button"
          onClick={() => setShowModal(true)}
          aria-label="랜덤포인트 뽑기"
          className="flex h-[3.75rem] w-[3.75rem] md:h-20 md:w-20 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-400 bg-gray-500"
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
        <button
          type="button"
          onClick={handleScrollTop}
          aria-label="맨 위로"
          className="flex h-[3.75rem] w-[3.75rem] md:h-20 md:w-20 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-gray-500 text-noto-16-bold md:text-noto-20-bold text-white"
        >
          TOP
        </button>
      </div>
      {showModal && <RandomPointModal onClose={() => setShowModal(false)} />}
    </>
  );
};
