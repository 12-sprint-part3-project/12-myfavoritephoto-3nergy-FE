import { useState } from 'react';
import { CARD_GRADE_OPTIONS, GENRE_OPTIONS } from '@/constants/card';
import { PageTitle } from '@/components/layout/PageTitle';
import { SearchBar } from '@/components/ui/SearchBar';
import { Card } from '@/components/domain/photocard/Card';
import { FilterDropdown } from '@/components/domain/photocard/FilterDropdown';

export const PhotocardSelectList = ({ onSelect }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const MOCK_PHOTOCARDS = [
    {
      id: 1,
      name: '우리집 앞마당',
      imageUrl: 'https://picsum.photos/seed/card1/400/400',
      grade: 'common',
      genre: '풍경',
      price: 4,
      quantity: 5,
      description: '카드 설명입니다.',
      ownerNickname: '유디',
    },
    {
      id: 2,
      name: '테스트 포토카드 2',
      imageUrl: 'https://picsum.photos/seed/card2/400/400',
      grade: 'rare',
      genre: '콘서트',
      price: 10,
      quantity: 3,
      description: '카드 설명입니다.',
      ownerNickname: '유디',
    },
    {
      id: 3,
      name: '테스트 포토카드 3',
      imageUrl: 'https://picsum.photos/seed/card3/400/400',
      grade: 'rare',
      genre: '팬미팅',
      price: 20,
      quantity: 2,
      description: '카드 설명입니다.',
      ownerNickname: '유디',
    },
    {
      id: 4,
      name: '테스트 포토카드 4',
      imageUrl: 'https://picsum.photos/seed/card4/400/400',
      grade: 'legendary',
      genre: '시즌그리팅',
      price: 50,
      quantity: 1,
      description: '카드 설명입니다.',
      ownerNickname: '유디',
    },
  ];

  return (
    <div className="w-full">
      <PageTitle
        breadcrumb="마이갤러리"
        title="나의 포토카드 판매하기"
        variant="title-md"
        className="hidden md:mb-[1.25rem] md:block"
      />

      {/* 검색 + 정렬 */}
      <div className="flex items-center gap-[0.63rem] pb-[1.25rem] md:gap-[1.875rem] md:pb-[2.5rem] lg:gap-[3.75rem]">
        <div className="order-2 w-full md:order-1 md:w-auto lg:w-[320px]">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="카드명 검색"
          />
        </div>
        <div className="order-1 flex gap-[1.5625rem] md:order-2 lg:gap-[2.8125rem]">
          <FilterDropdown
            label="등급"
            onChange={() => {}}
            onMobileClick={() => {}}
            options={CARD_GRADE_OPTIONS}
            mobileButtonClassName="h-[2.8125rem] w-[2.8125rem]"
          />
          <div className="hidden md:block">
            <FilterDropdown
              label="장르"
              onChange={() => {}}
              onMobileClick={() => {}}
              options={GENRE_OPTIONS}
            />
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <ul className="grid w-full grid-cols-2 gap-[0.3125rem] md:gap-[1.25rem] xl:gap-[2.5rem]">
        {MOCK_PHOTOCARDS.map((card) => (
          <li key={card.id}>
            <button className="w-full" onClick={() => onSelect(card)}>
              <Card
                type="marketplace"
                name={card.name}
                imageUrl={card.imageUrl}
                grade={card.grade}
                genre={card.genre}
                price={card.price}
                totalQuantity={card.quantity}
                remainingQuantity={card.remainingQuantity}
                owner={card.ownerNickname}
                status="SALE"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
