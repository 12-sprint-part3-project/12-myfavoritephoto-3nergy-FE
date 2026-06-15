'use client';

import { Button } from '@/components/ui/Button';

export const ResultView = ({
  title,
  isSuccess,
  description,
  buttonText,
  onClick,
  subDescription,
}) => {
  return (
    <section className="flex flex-col items-center justify-center text-center">
      <h1 className="font-baskin-base text-baskin-30-bold md:text-baskin-36-bold md:text-baskin-40-bold lg:text-baskin-46-bold mb-[1.87rem] text-white md:mb-[2.5rem]">
        {title}
        <span className={isSuccess ? 'text-main' : 'text-gray-300'}>
          {isSuccess ? ' 성공' : ' 실패'}
        </span>
      </h1>
      <div className="mb-[3.12rem] flex flex-col gap-4 md:mb-[3.75rem]">
        <p className="text-noto-16-bold md:text-noto-20-bold text-white">
          {description}
        </p>
        {subDescription && (
          <p className="text-noto-14-regular md:text-noto-18-regular text-red">
            {subDescription}
          </p>
        )}
      </div>

      <Button
        variant="secondary"
        size="lg"
        className="text-noto-16-bold lg:text-noto-18-bold w-full px-10 md:w-auto lg:min-w-[440px]"
        onClick={onClick}
      >
        {buttonText}
      </Button>
    </section>
  );
};
