'use client';

import { MinusIcon, PlusIcon } from '@/icons';

export const CounterInput = ({
  value,
  onChange,
  min = 1,
  max,
  className = '',
}) => {
  const handleDecrement = () => {
    if (value <= min) return;
    onChange(value - 1);
  };

  const handleIncrement = () => {
    if (max !== undefined && value >= max) return;
    onChange(value + 1);
  };

  return (
    <div
      className={`flex h-[45px] items-center justify-between rounded-sm border border-gray-200 bg-black px-[0.8175rem] py-[0.625rem] lg:h-[50px] lg:py-[0.8125rem] ${className}`}
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
  );
};
