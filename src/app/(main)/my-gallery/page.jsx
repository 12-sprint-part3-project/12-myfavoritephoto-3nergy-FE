import { PageTitle } from '@/components/layout/PageTitle';
import { MyGalleryContent } from './_components/MyGalleryContent';
import Link from 'next/link';

export const metadata = {
  title: '마이갤러리',
  description: '내가 보유한 포토카드를 확인하세요.',
  keywords: ['포토카드', '마이갤러리', '보유 카드'],
};

export default function page() {
  return (
    <div className="pb-[40px] md:pb-[110px] xl:pb-[140px]">
      <PageTitle
        title={metadata.title}
        actions={
          <Link
            href="/my-gallery/new"
            className="bg-main text-noto-16-bold lg:text-noto-18-bold hidden w-[21.375rem] items-center justify-center rounded-xs text-black transition-all duration-150 hover:brightness-90 active:brightness-85 disabled:hover:brightness-100 disabled:active:brightness-100 md:flex md:h-[3.75rem] lg:w-[27.5rem]"
          >
            포토카드 생성하기
          </Link>
        }
        variant="title-lg"
      />

      <MyGalleryContent />
    </div>
  );
}
