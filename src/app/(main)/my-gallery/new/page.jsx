import { PageTitle } from '@/components/layout/PageTitle';
import { CreatePhotocardForm } from './_components/CreatePhotocardForm';

export const metadata = {
  title: '포토카드 생성',
  description: '내가 보유한 포토카드를 등록하세요.',
  keywords: [],
};

export default function page() {
  return (
    <div className="pb-[40px] md:pb-[60px] xl:pb-[180px]">
      <PageTitle title="포토카드 생성" variant="title-lg" />

      <CreatePhotocardForm />
    </div>
  );
}
