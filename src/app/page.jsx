'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { APP_NAME } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { GNB } from '@/components/layout/GNB/GNB';
import { Button } from '@/components/ui/Button';

const FEATURE_SECTIONS = [
  {
    id: 'trade',
    alt: '포인트로 안전하게 거래하세요',
    sm: '/images/landing/img/landing-trade-sm.png',
    md: '/images/landing/img/landing-trade-md.png',
    lg: '/images/landing/landing-trade-lg.png',
  },
  {
    id: 'notification',
    alt: '알림으로 보다 빨라진 거래',
    sm: '/images/landing/img/landing-notification-sm.png',
    md: '/images/landing/img/landing-notification-md.png',
    lg: '/images/landing/landing-notification-lg.png',
  },
  {
    id: 'random-box',
    alt: '랜덤 상자로 포인트 받자',
    sm: '/images/landing/img/landing-random-box-sm.png',
    md: '/images/landing/img/landing-random-box-md.png',
    lg: '/images/landing/landing-random-box-lg.png',
  },
];

const HERO_BACKGROUND = {
  sm: '/images/landing/landing-hero-background-sm.png',
  md: '/images/landing/landing-hero-background-md.png',
  lg: '/images/landing/landing-hero-background-lg.png',
};

const CTA_CARD_IMAGE = '/images/landing/landing-card-lg.png';

export default function Page() {
  const { accessToken, logout } = useAuth();

  return (
    <>
      <GNB isAuthenticated={!!accessToken} onLogout={logout} />
      <main>
        <section className="relative flex flex-col items-center py-[2.5rem] md:py-[3.75rem] lg:pb-0 lg:pt-[5.625rem]">
          <div className="absolute inset-x-4 top-8 -z-10 h-[25.75rem] md:inset-x-8 md:top-6 md:h-[45.125rem] lg:inset-x-14 lg:top-3 lg:h-[68rem]">
            <picture className="block h-full w-full">
              <source media="(min-width: 1024px)" srcSet={HERO_BACKGROUND.lg} />
              <source media="(min-width: 768px)" srcSet={HERO_BACKGROUND.md} />
              <img
                src={HERO_BACKGROUND.sm}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-top"
              />
            </picture>
          </div>

          <Image
            src="/logo.svg"
            alt={APP_NAME}
            width={139}
            height={25}
            unoptimized
            className="hidden md:block"
          />

          <h1 className="mt-[1.25rem] px-[0.9375rem] text-center text-noto-20-bold text-white md:mt-[1.5rem] md:px-[2.5rem] md:text-noto-32-bold lg:px-0 lg:text-noto-40-bold">
            구하기 어려웠던
            <br />
            <span className="text-main">나의 최애</span>가 여기에!
          </h1>

          <Link href={ROUTES.marketplace} className="mt-[1.5rem] md:mt-[2rem]">
            <Button variant="primary" size="lg" className="w-[14.125rem] text-noto-16-bold">
              최애 찾으러 가기
            </Button>
          </Link>

          <div className="mt-[2.5rem] w-full md:mt-[3rem] lg:mt-[0.625rem]">
            <picture>
              <source media="(min-width: 1024px)" srcSet="/images/landing/landing-hero-lg.png" />
              <source media="(min-width: 768px)" srcSet="/images/landing/img/landing-hero-md.png" />
              <img
                src="/images/landing/img/landing-hero-sm.png"
                alt="마켓플레이스 미리보기"
                className="h-auto w-full"
              />
            </picture>
          </div>
        </section>

        {FEATURE_SECTIONS.map((section) => (
          <section key={section.id} className="bg-black">
            <picture>
              <source media="(min-width: 1024px)" srcSet={section.lg} />
              <source media="(min-width: 768px)" srcSet={section.md} />
              <img src={section.sm} alt={section.alt} className="h-auto w-full" />
            </picture>
          </section>
        ))}

        <section className="flex flex-col items-center bg-black px-[0.9375rem] py-[3.75rem] text-center md:py-[5rem] lg:py-[6.25rem]">
          <div className="relative aspect-[151/178] w-[6rem] -rotate-6 md:w-[7.5rem]">
            <Image
              src={CTA_CARD_IMAGE}
              alt=""
              aria-hidden="true"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="mt-[1.5rem] text-noto-20-bold text-white md:mt-[2rem] md:text-noto-24-bold lg:text-noto-28-bold">
            나의 최애를 지금 찾아보세요!
          </h2>

          <Link href={ROUTES.marketplace} className="mt-[1.5rem] md:mt-[2rem]">
            <Button variant="primary" size="lg" className="w-[14.125rem] text-noto-16-bold">
              최애 찾으러 가기
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
}
