'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { CloseIcon } from '@/icons';
import { usePointEvent } from '@/hooks/point/usePointEvent';
import { useMe } from '@/hooks/user/useMe';

const getLocalKey = (uuid) => `randomPointNextAt_${uuid}`;

const BOXES = [
  { id: 1, src: '/images/point/random_box-1.png', alt: '상자 1' },
  { id: 2, src: '/images/point/random_box-2.png', alt: '상자 2' },
  { id: 3, src: '/images/point/random_box-3.png', alt: '상자 3' },
];

const formatCountdown = (ms) => {
  if (ms <= 0) return '00분 00초';
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${String(min).padStart(2, '0')}분 ${String(sec).padStart(2, '0')}초`;
};

const getStoredNextAt = (key) => {
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  const nextAt = new Date(saved).getTime();
  return nextAt > Date.now() ? nextAt : null;
};

const ModalOverlay = ({ children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
    {children}
  </div>
);

const ModalHeader = ({ onClose }) => (
  <div className="flex items-center justify-between">
    <div className="w-7 md:w-8" />
    <Image
      src="/images/point/logo-random-point.png"
      alt="랜덤포인트"
      width={564}
      height={128}
      className="h-8 w-auto md:h-10 xl:h-12"
    />
    <button type="button" onClick={onClose} aria-label="닫기" className="cursor-pointer text-white">
      <CloseIcon className="h-7 w-7 md:h-8 md:w-8" />
    </button>
  </div>
);

const CountdownDisplay = ({ countdown }) => (
  <>
    <div className="flex flex-col items-center gap-1 text-center xl:hidden">
      <span className="text-noto-14-regular text-gray-300">다음 기회까지 남은 시간</span>
      <span className="text-noto-14-regular text-main">{formatCountdown(countdown)}</span>
    </div>
    <div className="hidden items-center justify-center gap-2.5 xl:flex">
      <span className="text-noto-16-regular text-gray-300">다음 기회까지 남은 시간</span>
      <span className="text-noto-16-regular text-main">{formatCountdown(countdown)}</span>
    </div>
  </>
);

export const RandomPointModal = ({ onClose }) => {
  const { data: me } = useMe();
  const localKey = me?.uuid ? getLocalKey(me.uuid) : null;

  const storedNextAt = useMemo(
    () => (localKey ? getStoredNextAt(localKey) : undefined),
    [localKey],
  );

  const [step, setStep] = useState('idle');
  const [selectedBox, setSelectedBox] = useState(null);
  const [result, setResult] = useState(null);
  const [apiNextAt, setApiNextAt] = useState(null);
  const [countdown, setCountdown] = useState(0);

  // undefined = 아직 초기화 전 | 0 = 명시적 초기화(만료) | number = 쿨다운 중
  const nextAvailableAt =
    storedNextAt === undefined ? undefined : apiNextAt === 0 ? null : apiNextAt ?? storedNextAt;

  const { mutate: claimPoint, isPending } = usePointEvent();

  useEffect(() => {
    if (!nextAvailableAt) return;

    const tick = () => {
      const remaining = nextAvailableAt - Date.now();
      if (remaining <= 0) {
        setCountdown(0);
        setApiNextAt(0);
        setStep('idle');
        setSelectedBox(null);
        setResult(null);
        localStorage.removeItem(localKey);
      } else {
        setCountdown(remaining);
      }
    };

    const immediateId = setTimeout(tick, 0);
    const intervalId = setInterval(tick, 1000);
    return () => {
      clearTimeout(immediateId);
      clearInterval(intervalId);
    };
  }, [nextAvailableAt, localKey]);

  const handleConfirm = () => {
    claimPoint(undefined, {
      onSuccess: (res) => {
        setResult(res);
        const nextAt = new Date(res.nextAvailableAt).getTime();
        setApiNextAt(nextAt);
        localStorage.setItem(localKey, res.nextAvailableAt);
        setStep('result');
      },
      onError: (err) => {
        const nextAvailable =
          err?.nextAvailableAt ?? err?.response?.data?.error?.nextAvailableAt;
        if (nextAvailable) {
          const nextAt = new Date(nextAvailable).getTime();
          setApiNextAt(nextAt);
          localStorage.setItem(localKey, nextAvailable);
        }
        setStep('result');
      },
    });
  };

  if (nextAvailableAt === undefined) return <div className="fixed inset-0 z-50 bg-black/70" />;

  if (step === 'result') {
    return (
      <ModalOverlay>
        <div className="w-full max-w-[28.4375rem] rounded-sm bg-gray-500 px-10 pb-24 pt-8">
          <ModalHeader onClose={onClose} />
          <div className="mt-5 flex justify-center">
            <Image
              src="/images/point/point-result.png"
              alt="포인트 결과"
              width={1020}
              height={973}
              sizes="(max-width: 768px) 240px, 340px"
              className="h-auto w-60 md:w-[21.25rem]"
            />
          </div>
          {result && (
            <p className="mt-5 text-center text-noto-32-bold">
              <span className="text-main">{result.point}P </span>
              <span className="text-white">획득!</span>
            </p>
          )}
          <div className="mt-3.5">
            <CountdownDisplay countdown={countdown} />
          </div>
        </div>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay>
      <div className="w-full max-w-[37.5rem] rounded-sm bg-gray-500 px-5 py-8 md:px-10 md:pb-10 md:pt-12 xl:max-w-[64.625rem] xl:px-16">
        <ModalHeader onClose={onClose} />
        <div className="mt-8 flex flex-col items-center gap-8 text-center md:gap-10">
          <p className="text-noto-16-bold text-white xl:text-noto-20-bold">
            1시간마다 돌아오는 기회!
            <br />
            랜덤 상자 뽑기를 통해 포인트를 획득하세요!
          </p>
          <CountdownDisplay countdown={countdown} />
        </div>
        <div className="mt-5 flex items-center justify-center gap-5 md:mt-8 xl:mt-10">
          {BOXES.map((box) => (
            <button
              key={box.id}
              type="button"
              onClick={() => {
                if (nextAvailableAt) return;
                setSelectedBox(box.id);
                setStep('selected');
              }}
              aria-label={`상자 ${box.id} 선택`}
              disabled={!!nextAvailableAt}
              className={`relative h-20 flex-1 transition-all duration-200 md:h-32 xl:h-48 ${
                nextAvailableAt
                  ? 'cursor-not-allowed opacity-40'
                  : step === 'selected' && selectedBox === box.id
                    ? 'cursor-pointer scale-110'
                    : 'cursor-pointer hover:scale-105'
              } ${step === 'selected' && selectedBox !== box.id ? 'opacity-30' : ''}`}
            >
              <Image
                src={box.src}
                alt={box.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 110px, (max-width: 1280px) 185px, 295px"
              />
            </button>
          ))}
        </div>
        {step === 'selected' && (
          <div className="mt-8 flex justify-center xl:mt-10">
            <div className="w-full max-w-[32.5rem]">
              <Button
                size="lg"
                className="w-full text-noto-18-bold"
                onClick={handleConfirm}
                disabled={isPending}
              >
                선택완료
              </Button>
            </div>
          </div>
        )}
      </div>
    </ModalOverlay>
  );
};
