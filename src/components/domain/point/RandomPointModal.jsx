'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useToastContext } from '@/context/ToastContext';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { SECOND, MINUTE } from '@/constants/time';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Overlay } from '@/components/ui/Overlay';
import { usePointEvent } from '@/hooks/point/usePointEvent';
import { useMe } from '@/hooks/user/useMe';
import { usePointCooldown } from '@/hooks/point/usePointCooldown';

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

const RandomPointLogo = () => (
  <Image
    src="/images/point/logo-random-point.png"
    alt="랜덤포인트"
    width={564}
    height={128}
    className="mx-auto h-8 w-auto md:h-10 2xl:h-12"
  />
);

const CountdownDisplay = ({ countdown }) => (
  <div className="flex flex-col items-center justify-center gap-[0.38rem] md:flex-row md:gap-2.5">
    <span className="text-noto-16-regular text-gray-300">
      다음 기회까지 남은 시간
    </span>
    <span className="text-noto-16-regular text-main">
      {formatCountdown(countdown)}
    </span>
  </div>
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

  // 결과 화면
  if (step === STEP.RESULT) {
    return (
      <Overlay onClose={onClose}>
        <Modal
          overflow="overflow-visible"
          onClose={onClose}
          className="max-h-[90vh] w-[95vw] px-[3.28rem] py-[min(4.81rem,6vh)] md:w-[455px] md:py-[min(5.31rem,6vh)]"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center">
              <RandomPointLogo />
            </div>
            <div className="mt-8 flex justify-center">
              <Image
                src="/images/point/point-result.png"
                alt="포인트 결과"
                width={1020}
                height={973}
                sizes="(max-width: 768px) 240px, 340px"
                className="h-auto w-60 md:w-[21.25rem]"
              />
            </div>
          </div>
          {result && (
            <p className="mt-4 text-center text-noto-32-bold md:mt-6">
              <span className="text-main">{result.point}P </span>
              <span className="text-white">획득!</span>
            </p>
          )}
          {cooldownEndAt && (
            <div className="mt-[1.69rem] md:mt-[1.25rem]">
              <CountdownDisplay countdown={countdown} />
            </div>
          )}
        </Modal>
      </Overlay>
    );
  }

  // 상자 선택 화면
  return (
    <Overlay onClose={onClose}>
      <Modal
        onClose={onClose}
        overflow="overflow-visible"
        className="max-h-none w-full max-w-[37.5rem] px-5 py-20 md:px-10 md:pt-16 md:pb-14 lg:max-w-[52rem] lg:px-16 lg:py-16 2xl:max-w-[64.625rem] 2xl:px-[6.25rem] 2xl:py-20"
      >
        <div className="flex flex-col items-center gap-[1.87rem] lg:gap-8 2xl:gap-10">
          <RandomPointLogo />
          <p className="text-center text-noto-16-bold text-white lg:text-noto-18-bold 2xl:text-noto-20-bold">
            1시간마다 돌아오는 기회!
            <br />
            랜덤 상자 뽑기를 통해 포인트를 획득하세요!
          </p>
          {cooldownEndAt && <CountdownDisplay countdown={countdown} />}
        </div>
        <div className="mt-[3.75rem] flex items-center justify-center gap-0 md:gap-8 lg:mt-[4.5rem] lg:gap-[2rem] 2xl:mt-[5.87rem] 2xl:gap-[3.125rem]">
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
              className={`relative h-[78px] flex-1 transition-all duration-200 md:h-[132px] lg:h-[160px] 2xl:h-[198px] ${
                cooldownEndAt
                  ? 'cursor-not-allowed opacity-40'
                  : step === STEP.SELECTED && selectedBox === box.id
                    ? 'cursor-pointer lg:scale-100'
                    : 'cursor-pointer lg:scale-90 lg:hover:scale-100'
              } ${step === STEP.SELECTED && selectedBox !== box.id ? 'opacity-30' : ''}`}
            >
              <Image
                src={box.src}
                alt={box.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 105px, (max-width: 1280px) 149px, 278px"
              />
            </button>
          ))}
        </div>
        {step === STEP.SELECTED && (
          <div className="mt-8 flex justify-center 2xl:mt-10">
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
      </Modal>
    </Overlay>
  );
};
