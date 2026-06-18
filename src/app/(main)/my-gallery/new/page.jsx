import { CreatePhotocardForm } from '@/app/(main)/my-gallery/new/_components/CreatePhotocardForm';

export const metadata = {
  title: '포토카드 생성',
  description: '내가 보유한 포토카드를 등록하세요.',
  keywords: [],
};

export default function page() {
  return <CreatePhotocardForm />;
}
