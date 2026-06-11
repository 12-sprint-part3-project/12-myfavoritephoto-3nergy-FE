'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { APP_NAME } from '@/constants/app';
import { GNB } from '@/components/layout/GNB/GNB';
import { Button } from '@/components/ui/Button';

export default function Page() {
  const { accessToken, logout } = useAuth();

  return (
    <div className="flex flex-col">
      <GNB isAuthenticated={!!accessToken} onLogout={logout} />

      <main>
        {/* 히어로 섹션 */}
        <section className="from-purple to-pink relative flex flex-col items-center overflow-hidden bg-gradient-to-br px-[0.9375rem] pt-[2.5rem] pb-[2.5rem] sm:px-[2.5rem] sm:pt-[3.75rem] sm:pb-[3.75rem] lg:pt-[5.625rem] lg:pb-0">
          <Image
            src="/logo.svg"
            alt={APP_NAME}
            width={139}
            height={25}
            unoptimized
          />

          <h1 className="font-baskin-base text-noto-24-bold sm:text-noto-32-bold lg:text-noto-40-bold mt-[1.25rem] text-center text-white sm:mt-[1.5rem] lg:mt-[1.5rem]">
            구하기 어려웠던
            <br />
            <span className="text-main">나의 최애</span>가 여기에!
          </h1>

          <Link href="/marketplace" className="mt-[1.5rem] sm:mt-[2rem]">
            <Button variant="primary" size="lg" className="w-[14.125rem]">
              최애 찾으러 가기
            </Button>
          </Link>

          <div className="relative mt-[2.5rem] aspect-[375/199] w-full sm:mt-[3rem] sm:aspect-[744/352] lg:mt-[0.625rem] lg:aspect-[1917/765]">
            <Image
              src="/images/landing/landing-hero-lg.svg"
              alt="마켓플레이스 미리보기"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        </section>

        {/* 포인트 거래 섹션 */}
        <section className="bg-black px-[0.9375rem] py-[3.75rem] sm:px-[2.5rem] sm:py-[5rem] lg:px-[26.75rem] lg:pt-[8.625rem] lg:pb-[2.1875rem]">
          <h2 className="text-noto-20-bold sm:text-noto-24-bold lg:text-noto-32-bold text-white">
            포인트로 <span className="text-main">안전하게 거래</span>하세요
          </h2>
          <p className="text-noto-14-regular sm:text-noto-16-regular lg:text-noto-18-regular mt-[0.75rem] text-gray-300 lg:mt-[0.875rem]">
            내 포토카드를 포인트로 팔고, 원하는 포토카드를
            <br />
            포인트로 안전하게 교환하세요
          </p>

          <div className="relative mt-[1.5rem] aspect-[375/440] w-full sm:mt-[2rem] sm:aspect-[744/707] lg:aspect-[1068/518]">
            <Image
              src="/images/landing/landing-trade-lg.svg"
              alt="포인트 거래 미리보기"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </section>

        {/* 알림 섹션 */}
        <section className="bg-black px-[0.9375rem] py-[3.75rem] sm:px-[2.5rem] sm:py-[5rem] lg:px-[26.75rem] lg:pt-[8.625rem] lg:pb-[2.1875rem]">
          <h2 className="text-noto-20-bold sm:text-noto-24-bold lg:text-noto-32-bold text-white">
            알림으로 보다 <span className="text-blue">빨라진 거래</span>
          </h2>
          <p className="text-noto-14-regular sm:text-noto-16-regular lg:text-noto-18-regular mt-[0.75rem] text-gray-300 lg:mt-[0.875rem]">
            교환 제안부터 판매 완료까지,
            <br />
            실시간 알림으로 놓치지 마세요
          </p>

          <div className="relative mt-[1.5rem] aspect-[375/519] w-full sm:mt-[2rem] sm:aspect-[744/776] lg:aspect-[1068/518]">
            <Image
              src="/images/landing/landing-notification-lg.svg"
              alt="알림 미리보기"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </section>

        {/* 랜덤박스 섹션 */}
        <section className="bg-black px-[0.9375rem] py-[3.75rem] sm:px-[2.5rem] sm:py-[5rem] lg:px-[26.75rem] lg:pt-[8.625rem] lg:pb-[2.1875rem]">
          <h2 className="text-noto-20-bold sm:text-noto-24-bold lg:text-noto-32-bold text-white">
            랜덤 상자로 <span className="text-main">포인트</span> 받자! 🎉
          </h2>
          <p className="text-noto-14-regular sm:text-noto-16-regular lg:text-noto-18-regular mt-[0.75rem] text-gray-300 lg:mt-[0.875rem]">
            한 시간마다 주어지는 랜덤 상자를 열고,
            <br />
            포인트를 획득하세요
          </p>

          <div className="relative mt-[1.5rem] aspect-[375/390] w-full sm:mt-[2rem] sm:aspect-[744/667] lg:aspect-[889/570]">
            <Image
              src="/images/landing/landing-random-box-lg.svg"
              alt="랜덤박스 미리보기"
              fill
              unoptimized
              className="object-contain"
            />
          </div>
        </section>

        {/* 하단 CTA 섹션 */}
        <section className="from-pink to-purple flex flex-col items-center bg-gradient-to-br px-[0.9375rem] py-[3.75rem] text-center sm:py-[5rem] lg:py-[6.25rem]">
          <div className="relative aspect-[151/178] w-[6rem] -rotate-6 sm:w-[7.5rem]">
            <Image
              src="/images/landing/landing-card-lg.svg"
              alt=""
              aria-hidden="true"
              fill
              unoptimized
              className="object-contain"
            />
          </div>

          <h2 className="font-baskin-base text-noto-20-bold sm:text-noto-24-bold lg:text-noto-28-bold mt-[1.5rem] text-white sm:mt-[2rem]">
            나의 최애를 지금 찾아보세요!
          </h2>

          <Link href="/marketplace" className="mt-[1.5rem] sm:mt-[2rem]">
            <Button variant="primary" size="lg" className="w-[14.125rem]">
              최애 찾으러 가기
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
