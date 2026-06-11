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
    <div className="flex flex-col items-center justify-center gap-10 text-center">
      <h1 className="font-baskin-base text-baskin-24-bold md:text-baskin-40-bold text-white">
        {title}
        <span className={isSuccess ? 'text-main' : 'text-gray-300'}>
          {isSuccess ? '성공' : '실패'}
        </span>
      </h1>
      <p className="text-noto-16-bold md:text-noto-20-bold text-white">
        {description}
      </p>
      <Button
        variant="secondary"
        size="lg"
        className="w-full lg:min-w-[440px]"
        onClick={() => router.push(href)}
      >
        {buttonText}
      </Button>
    </div>
  );
};
