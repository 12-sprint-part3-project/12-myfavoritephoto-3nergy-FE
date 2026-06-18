import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import Providers from '@/app/providers/providers';

import './globals.css';

const fontNotoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-noto',
  display: 'swap',
});

const fontBaskin = localFont({
  src: './fonts/baskin-robbins-bold.woff2',
  variable: '--font-baskin',
  display: 'swap',
});

export const metadata = {
  title: {
    template: '%s | 최애의 포토',
    default: '최애의 포토',
  },
  description:
    '구하기 어려웠던 나의 최애 포토카드를 여기서 찾아보세요. 포토카드 구매, 판매, 교환 플랫폼',
  keywords: ['포토카드', '최애의 포토', '포토카드 거래'],
  authors: [{ name: '최애의 포토' }],

  // SNS 미리보기
  openGraph: {
    title: '최애의 포토',
    description:
      '구하기 어려웠던 나의 최애 포토카드를 여기서 찾아보세요. 포토카드 구매, 판매, 교환 플랫폼',
    // TODO: url는 도메인 확정 후 추가
    // url: 'https://your-domain.com',
    siteName: '최애의 포토',
    // TODO: images도 배포 시점에 추가 (1200x630 사이즈에 로고 + 서비스명 + 간단한 설명 등)
    /*
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    */
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${fontNotoSansKr.variable} ${fontBaskin.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
