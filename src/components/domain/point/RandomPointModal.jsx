'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { CloseIcon } from '@/icons';
import { usePointEvent } from '@/hooks/point/usePointEvent';

const LOCAL_KEY = 'randomPointNextAt';

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

const getStoredNextAt = () => {
  if (typeof window === 'undefined') return null;
  const saved = localStorage.getItem(LOCAL_KEY);
  if (!saved) return null;
  const nextAt = new Date(saved).getTime();
  return nextAt > Date.now() ? nextAt : null;
};

export const RandomPointModal = ({ onClose }) => {
  const storedNextAt = getStoredNextAt();

  const [step, setStep] = useState(storedNextAt ? 'result' : 'idle');
  const [selectedBox, setSelectedBox] = useState(null);
  const [result, setResult] = useState(null);
  const [nextAvailableAt, setNextAvailableAt] = useState(storedNextAt);
  const [countdown, setCountdown] = useState(0);

  const { mutate: claimPoint, isPending } = usePointEvent();

  useEffect(() => {
    if (!nextAvailableAt) return;

    const tick = () => {
      const remaining = nextAvailableAt - Date.now();
      if (remaining <= 0) {
        setCountdown(0);
        setNextAvailableAt(null);
        setStep('idle');
        setSelectedBox(null);
        setResult(null);
        localStorage.removeItem(LOCAL_KEY);
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
  }, [nextAvailableAt]);

  const handleConfirm = () => {
    claimPoint(undefined, {
      onSuccess: (res) => {
        const data = res.data;
        setResult(data);
        const nextAt = new Date(data.nextAvailableAt).getTime();
        setNextAvailableAt(nextAt);
        localStorage.setItem(LOCAL_KEY, data.nextAvailableAt);
        setStep('result');
      },
      onError: (err) => {
        const nextAvailable = err?.response?.data?.error?.nextAvailableAt;
        if (nextAvailable) {
          const nextAt = new Date(nextAvailable).getTime();
          setNextAvailableAt(nextAt);
          localStorage.setItem(LOCAL_KEY, nextAvailable);
        }
        setStep('result');
      },
    });
  };

  /* ── result 상태 ── */
  if (step === 'result') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
        <div className="relative w-full max-w-[28.4375rem] rounded-sm bg-gray-500 px-14 pb-[5.8125rem] pt-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="absolute right-7 top-[1.875rem] cursor-pointer text-white"
          >
            <CloseIcon className="h-8 w-8" />
          </button>

          <h2 className="font-baskin-base text-baskin-46-bold text-center">
            <span className="text-white">랜덤</span>
            <span className="text-main">포인트</span>
          </h2>

          <div className="mt-5 flex justify-center">
            <Image
              src="/images/point/point-result.png"
              alt="포인트 결과"
              width={1020}
              height={973}
              sizes="(max-width: 768px) 100vw, 340px"
              className="h-auto w-full max-w-[21.25rem]"
            />
          </div>

          {result && (
            <p className="mt-5 text-center text-noto-32-bold">
              <span className="text-main">{result.point}P </span>
              <span className="text-white">획득!</span>
            </p>
          )}

          <div className="mt-[0.875rem] flex items-center justify-center gap-[0.625rem]">
            <span className="text-noto-16-regular text-gray-300">다음 기회까지 남은 시간</span>
            <span className="text-noto-16-regular text-main">{formatCountdown(countdown)}</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── idle / selected 상태 ── */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="relative w-full max-w-[64.625rem] rounded-sm bg-gray-500 px-[3.8125rem] pb-10 pt-[3.0625rem]">
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-[1.875rem] top-[1.875rem] cursor-pointer text-white"
        >
          <CloseIcon className="h-8 w-8" />
        </button>

        <div className="flex flex-col items-center gap-10 text-center">
          <h2 className="font-baskin-base text-baskin-46-bold">
            <span className="text-white">랜덤</span>
            <span className="text-main">포인트</span>
          </h2>
          <p className="text-noto-20-bold text-white">
            1시간마다 돌아오는 기회!
            <br />
            랜덤 상자 뽑기를 통해 포인트를 획득하세요!
          </p>
        </div>

        <div className="mt-10 flex items-end justify-center gap-6">
          {BOXES.map((box) => (
            <button
              key={box.id}
              type="button"
              onClick={() => {
                setSelectedBox(box.id);
                setStep('selected');
              }}
              aria-label={`상자 ${box.id} 선택`}
              className={`cursor-pointer transition-all duration-200 ${
                step === 'selected' && selectedBox === box.id ? 'scale-110' : 'hover:scale-105'
              } ${step === 'selected' && selectedBox !== box.id ? 'opacity-30' : ''}`}
            >
              <Image
                src={box.src}
                alt={box.alt}
                width={738}
                height={595}
                sizes="(max-width: 768px) 128px, 246px"
                className="h-[8rem] w-auto md:h-[12.375rem]"
              />
            </button>
          ))}
        </div>

        {step === 'selected' && (
          <div className="mt-10 flex justify-center">
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
    </div>
  );
};
