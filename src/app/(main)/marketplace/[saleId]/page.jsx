import { PageTitle } from '@/components/layout/PageTitle';
import { getSaleDetail } from '@/services/sales';
import { SaleDetailContent } from '@/app/(main)/marketplace/[saleId]/_components/SaleDetailContent';

/*
// TODO: API 연동 
// 동적 메타데이터 변경
export async function generateMetadata({ params }) {
  const card = await getCardDetail(params.saleId);

  return {
    title: card.name,
    description: `${card.name} 포토카드 | ${card.grade} 등급 | 최애의 포토에서 구매하세요.`,
    keywords: ['포토카드', card.name, card.grade, '구매'],
    openGraph: {
      title: card.name,
      description: `${card.name} 포토카드 | ${card.grade} 등급 | 최애의 포토에서 구매하세요.`,
      images: [{ url: card.imageUrl, width: 1200, height: 630 }],
    },
  };
}
*/

export default async function page({ params }) {
  //const sale = await getSaleDetail(params.saleId);

  const sale = {
    saleId: 1,
    price: 1000,
    quantity: 3, // 총 판매 수량
    remainingQuantity: 2, // 남은 수량
    status: 'SALE',
    createdAt: '2026-06-02T08:30:00.000Z',
    updatedAt: '2026-06-02T08:30:00.000Z',
    photocard: {
      id: 1,
      name: 'IVE 포토카드',
      imageUrl: 'https://example.com/image.png',
      description: '앨범 포토카드입니다.',
      grade: 'LEGENDARY',
      genre: '인물',
    },
    seller: {
      uuid: '9c6b1c7e-7e4a-4c5a-9f6d-8c3f2b1a1234',
      nickname: '홍길동',
    },
    desiredGrade: 'RARE',
    desiredGenre: '풍경',
    desiredDescription: '희망 교환 조건입니다.',
  };

  return (
    <div className="pb-[40px] md:pb-[60px] xl:pb-[180px]">
      <div className="pb-[1.63rem] md:pb-[3rem] lg:pb-[4.36rem]">
        <PageTitle
          variant="heading"
          breadcrumb="마켓플레이스"
          title="우리집 앞마당"
          hideBreadcrumbOnMobile
          className="hidden md:block"
        />
      </div>
      <SaleDetailContent sale={sale} />
    </div>
  );
}
