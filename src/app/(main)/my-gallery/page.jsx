import { MyGalleryContent } from '@/app/(main)/my-gallery/_components/MyGalleryContent';

export const metadata = {
  title: '마이갤러리',
  description: '내가 보유한 포토카드를 확인하세요.',
  keywords: ['포토카드', '마이갤러리', '보유 카드'],
};

export default function page() {
  return <MyGalleryContent />;
}
