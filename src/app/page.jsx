import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/constants/app';
import { ROUTES } from '@/constants/routes';
import { LandingGNB } from '@/app/_components/LandingGNB';
import { Button } from '@/components/ui/Button';

const FEATURE_SECTIONS = [
  {
    id: 'trade',
    alt: '포인트로 안전하게 거래하세요',
    md: '/images/landing/img/landing-trade-md.webp',
    lg: '/images/landing/landing-trade-lg.webp',
    mdWidth: 2232,
    mdHeight: 2121,
    lgWidth: 5760,
    lgHeight: 2400,
  },
  {
    id: 'notification',
    alt: '알림으로 보다 빨라진 거래',
    md: '/images/landing/img/landing-notification-md.webp',
    lg: '/images/landing/landing-notification-lg.webp',
    mdWidth: 2232,
    mdHeight: 2328,
    lgWidth: 5760,
    lgHeight: 2400,
  },
  {
    id: 'random-box',
    alt: '랜덤 상자로 포인트 받자',
    md: '/images/landing/img/landing-random-box-md.webp',
    lg: '/images/landing/landing-random-box-lg.webp',
    mdWidth: 2232,
    mdHeight: 2001,
    lgWidth: 5760,
    lgHeight: 2700,
  },
];

const HERO_BACKGROUND_MD = '/images/landing/landing-hero-background-md.webp';
const HERO_BACKGROUND_LG = '/images/landing/landing-hero-background-lg.webp';

const CTA_CARD_IMAGE = '/images/landing/landing-card-lg.webp';

export default function Page() {
  return (
    <>
      <LandingGNB />
      <main>
        <section className="relative flex flex-col items-center py-[2.5rem] md:py-[3.75rem] lg:pt-[5.625rem] lg:pb-0">
          <div className="absolute inset-x-4 top-8 -z-10 h-[25.75rem] md:inset-x-8 md:top-6 md:h-[45.125rem] lg:inset-x-14 lg:top-3 lg:h-[68rem]">
            <Image
              src={HERO_BACKGROUND_MD}
              alt=""
              aria-hidden="true"
              fill
              priority
              className="object-cover object-top lg:hidden"
            />
            <Image
              src={HERO_BACKGROUND_LG}
              alt=""
              aria-hidden="true"
              fill
              sizes="calc(100vw - 7rem)"
              className="hidden object-cover object-top lg:block"
            />
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
            <Button
              variant="primary"
              size="lg"
              className="w-[14.125rem] text-noto-16-bold"
            >
              최애 찾으러 가기
            </Button>
          </Link>

          <div className="mt-[2.5rem] w-full md:mt-[3rem] lg:mt-[0.625rem]">
            <Image
              src="/images/landing/img/landing-hero-md.webp"
              alt="마켓플레이스 미리보기"
              width={2232}
              height={1056}
              className="h-auto w-full lg:hidden"
            />
            <Image
              src="/images/landing/landing-hero-lg.webp"
              alt="마켓플레이스 미리보기"
              width={5751}
              height={2295}
              sizes="100vw"
              className="hidden h-auto w-full lg:block"
            />
          </div>
        </section>

        {FEATURE_SECTIONS.map((section) => (
          <section key={section.id} className="bg-black">
            <Image
              src={section.md}
              alt={section.alt}
              width={section.mdWidth}
              height={section.mdHeight}
              className="h-auto w-full lg:hidden"
            />
            <Image
              src={section.lg}
              alt={section.alt}
              width={section.lgWidth}
              height={section.lgHeight}
              sizes="100vw"
              className="hidden h-auto w-full lg:block"
            />
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
            <Button
              variant="primary"
              size="lg"
              className="w-[14.125rem] text-noto-16-bold"
            >
              최애 찾으러 가기
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
}
