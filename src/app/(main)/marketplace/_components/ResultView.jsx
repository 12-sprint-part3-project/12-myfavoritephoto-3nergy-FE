'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export const ResultView = ({
  title,
  isSuccess,
  description,
  buttonText,
  href,
}) => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center text-center">
      <h1 className="font-baskin-base text-baskin-30-bold md:text-baskin-36-bold md:text-baskin-40-bold lg:text-baskin-46-bold mb-[1.87rem] text-white md:mb-[2.5rem]">
        {title}
        <span className={isSuccess ? 'text-main' : 'text-gray-300'}>
          {isSuccess ? ' 성공' : ' 실패'}
        </span>
      </h1>
      <p className="lg:text-noto-20-bold text-noto-16-bold md:text-noto-20-bold mb-[3.12rem] text-white md:mb-[3.75rem]">
        {description}
      </p>
      <Button
        variant="secondary"
        size="lg"
        className="text-noto-16-bold lg:text-noto-18-bold w-full md:w-auto lg:min-w-[440px]"
        onClick={() => router.push(href)}
      >
        {buttonText}
      </Button>
    </section>
  );
};
