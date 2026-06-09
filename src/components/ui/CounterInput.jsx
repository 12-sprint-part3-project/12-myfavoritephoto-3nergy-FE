'use client';

import { useId } from 'react';
import { MinusIcon, PlusIcon } from '@/icons';

export const CounterInput = ({
  value,
  onChange,
  min = 1,
  max,
  label,
  showMaxLabel = false,
}) => {
  const id = useId(); // 라벨-인풋 연결용

  const handleDecrement = () => {
    if (value <= min) return;
    onChange(value - 1);
  };

  const handleIncrement = () => {
    if (max !== undefined && value >= max) return;
    onChange(value + 1);
  };

  return (
    <div className="flex w-full items-center justify-between">
      <label htmlFor={id} className="text-noto-14-regular text-white">
        {label}
      </label>
      <div className="flex items-center gap-[0.94rem] lg:gap-[1.25rem]">
        <div
          id={id}
          className="flex h-[45px] min-w-[144px] items-center justify-between rounded-sm border border-gray-200 bg-black px-[0.8175rem] py-[0.625rem] lg:h-[50px] lg:min-w-[176px] lg:py-[0.8125rem]"
        >
          <button
            type="button"
            onClick={handleDecrement}
            disabled={value <= min}
            aria-label="수량 감소"
          >
            <MinusIcon
              className={
                value <= min ? 'cursor-not-allowed text-gray-400' : 'text-white'
              }
            />
          </button>
          <span className="text-noto-18-regular lg:text-noto-20-regular text-white">
            {value}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={max !== undefined && value >= max}
            aria-label="수량 증가"
          >
            <PlusIcon
              className={
                max !== undefined && value >= max
                  ? 'cursor-not-allowed text-gray-400'
                  : 'text-white'
              }
            />
          </button>
        </div>

        {showMaxLabel && (
          <div className="flex flex-col">
            <span className="text-noto-18-bold text-white">/{max}</span>
            <span className="text-noto-12-regular text-gray-200">
              최대 {max}장
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
