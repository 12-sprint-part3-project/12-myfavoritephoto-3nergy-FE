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

const page = () => {
  return <div className="pb-[40px] md:pb-[60px] xl:pb-[180px]">카드상세</div>;
};

export default page;
