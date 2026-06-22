'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/Button';
import { Overlay } from '@/components/ui/Overlay';
import { CloseIcon } from '@/icons';
import { usePointEvent } from '@/hooks/point/usePointEvent';
import { useMe } from '@/hooks/user/useMe';
import { usePointCooldown } from '@/hooks/point/usePointCooldown';
import { useToastContext } from '@/context/ToastContext';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SECOND, MINUTE } from '@/constants/time';

const SECS_PER_MIN = MINUTE / SECOND;

const STEP = {
  IDLE: 'idle',
  SELECTED: 'selected',
  RESULT: 'result',
};

const BOXES = [
  { id: 1, src: '/images/point/random_box-1.png', alt: '상자 1' },
  { id: 2, src: '/images/point/random_box-2.png', alt: '상자 2' },
  { id: 3, src: '/images/point/random_box-3.png', alt: '상자 3' },
];

const formatCountdown = (ms) => {
  if (ms <= 0) return '00분 00초';
  const totalSec = Math.floor(ms / SECOND);
  const min = Math.floor(totalSec / SECS_PER_MIN);
  const sec = totalSec % SECS_PER_MIN;
  return `${String(min).padStart(2, '0')}분 ${String(sec).padStart(2, '0')}초`;
};

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
    <button
      type="button"
      onClick={onClose}
      aria-label="닫기"
      className="cursor-pointer text-white"
    >
      <CloseIcon className="h-7 w-7 md:h-8 md:w-8" />
    </button>
  </div>
);

const CountdownDisplay = ({ countdown }) => (
  <>
    <div className="flex flex-col items-center gap-1 text-center xl:hidden">
      <span className="text-noto-14-regular text-gray-300">
        다음 기회까지 남은 시간
      </span>
      <span className="text-noto-14-regular text-main">
        {formatCountdown(countdown)}
      </span>
    </div>
    <div className="hidden items-center justify-center gap-2.5 xl:flex">
      <span className="text-noto-16-regular text-gray-300">
        다음 기회까지 남은 시간
      </span>
      <span className="text-noto-16-regular text-main">
        {formatCountdown(countdown)}
      </span>
    </div>
  </>
);

export const RandomPointModal = ({ onClose }) => {
  const { data: me } = useMe();
  const { showToast } = useToastContext();
  const queryClient = useQueryClient();

  const [step, setStep] = useState(STEP.IDLE);
  const [selectedBox, setSelectedBox] = useState(null);
  const [result, setResult] = useState(null);

  const { cooldownEndAt, countdown, saveCooldown } = usePointCooldown(
    me?.uuid,
    () => {
      setStep(STEP.IDLE);
      setSelectedBox(null);
      setResult(null);
    },
  );

  const { mutate: claimPoint, isPending } = usePointEvent();

  const handleConfirm = () => {
    claimPoint(undefined, {
      onSuccess: (res) => {
        setResult(res);
        saveCooldown(res.remainingMilliseconds);
        setStep(STEP.RESULT);
      },
      onError: (err) => {
        if (err?.code === 'EVENT_NOT_AVAILABLE') {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.point.eventStatus(),
          });
        } else {
          showToast(err?.message ?? '포인트 뽑기에 실패했습니다.');
        }
        setStep(STEP.IDLE);
      },
    });
  };

  if (cooldownEndAt === undefined)
    return <div className="fixed inset-0 z-50 bg-black/80" />;

  if (step === STEP.RESULT) {
    return (
      <Overlay onClose={onClose}>
        <div className="w-full max-w-[28.4375rem] rounded-sm bg-gray-500 px-10 pt-8 pb-24">
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
          {cooldownEndAt && (
            <div className="mt-3.5">
              <CountdownDisplay countdown={countdown} />
            </div>
          )}
        </div>
      </Overlay>
    );
  }

  return (
    <Overlay onClose={onClose}>
      <div className="w-full max-w-[37.5rem] rounded-sm bg-gray-500 px-5 py-8 md:px-10 md:pt-12 md:pb-10 xl:max-w-[64.625rem] xl:px-16">
        <ModalHeader onClose={onClose} />
        <div className="mt-8 flex flex-col items-center gap-8 text-center md:gap-10">
          <p className="text-noto-16-bold text-white xl:text-noto-20-bold">
            1시간마다 돌아오는 기회!
            <br />
            랜덤 상자 뽑기를 통해 포인트를 획득하세요!
          </p>
          {cooldownEndAt && <CountdownDisplay countdown={countdown} />}
        </div>
        <div className="mt-5 flex items-center justify-center gap-5 md:mt-8 xl:mt-10">
          {BOXES.map((box) => (
            <button
              key={box.id}
              type="button"
              onClick={() => {
                if (cooldownEndAt) return;
                setSelectedBox(box.id);
                setStep(STEP.SELECTED);
              }}
              aria-label={`상자 ${box.id} 선택`}
              disabled={!!cooldownEndAt}
              className={`relative h-20 flex-1 transition-all duration-200 md:h-32 xl:h-48 ${
                cooldownEndAt
                  ? 'cursor-not-allowed opacity-40'
                  : step === STEP.SELECTED && selectedBox === box.id
                    ? 'scale-110 cursor-pointer'
                    : 'cursor-pointer hover:scale-105'
              } ${step === STEP.SELECTED && selectedBox !== box.id ? 'opacity-30' : ''}`}
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
        {step === STEP.SELECTED && (
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
    </Overlay>
  );
};
