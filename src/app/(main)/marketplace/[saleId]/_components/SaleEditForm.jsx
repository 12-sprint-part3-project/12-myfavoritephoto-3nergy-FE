import Image from 'next/image';
import { useState } from 'react';
import {
  GRADE_STYLE,
  CARD_GRADE_OPTIONS,
  GENRE_OPTIONS,
} from '@/constants/card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { CounterInput } from '@/components/ui/CounterInput';
import { PriceInput } from '@/components/ui/PriceInput';
import { PageTitle } from '@/components/layout/PageTitle';
import { validatePrice, validateDescription } from '@/utils/validators';

export const SaleEditForm = ({
  sale,
  onCancel,
  onSubmit,
  isPending,
  quantityError: externalQuantityError,
}) => {
  const [quantity, setQuantity] = useState(sale.remainingQuantity);
  const [price, setPrice] = useState(sale.price);
  const [desiredGrade, setDesiredGrade] = useState(sale.desiredGrade ?? '');
  const [desiredGenre, setDesiredGenre] = useState(sale.desiredGenre ?? '');
  const [desiredDescription, setDesiredDescription] = useState(
    sale.desiredDescription ?? '',
  );

  const [errors, setErrors] = useState({
    price: '',
    description: '',
  });

  const [touched, setTouched] = useState({
    price: false,
    description: false,
  });

  const handleBlur = (field, validator, value) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: validator(value),
    }));
  };

  const isFormValid =
    !validatePrice(price) &&
    !validateDescription(desiredDescription) &&
    !externalQuantityError;

  const validateForm = () => {
    const newErrors = {
      price: validatePrice(price),
      description: validateDescription(desiredDescription),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  const soldQuantity = sale.quantity - sale.remainingQuantity;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setTouched({
        price: true,
        description: true,
      });
      return;
    }

    onSubmit?.({
      quantity: quantity + soldQuantity,
      price,
      desiredGrade,
      desiredGenre,
      desiredDescription,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <PageTitle
        breadcrumb="수정하기"
        hideBreadcrumbOnMobile
        title={sale.photocard.name}
        variant="heading"
        className="mb-[1.63rem] md:mb-[3rem] lg:mb-[3.13rem]"
      />

      {/* 포토카드 정보, 수량, 가격 */}
      <div className="mb-[7.5rem] flex flex-col md:mb-[3.84rem] md:flex-row lg:mb-[3.47rem]">
        {/* 포토카드 사진 */}
        <div className="mb-[1.2rem] md:mr-[1.25rem] md:mb-0 md:flex-1 lg:mr-[2.5rem]">
          <Image
            src={sale.photocard.imageUrl}
            alt={`${sale.photocard.name} 사진`}
            width={0}
            height={0}
            sizes="100vw"
            className="block h-auto w-full"
          />
        </div>

        <div className="flex flex-1 flex-col">
          {/* 등급, 장르, 판매자 닉네임 */}
          <div className="text-noto-18-bold lg:text-noto-24-bold mb-[1.875rem] flex justify-between border-b border-gray-400 pb-[1.875rem]">
            <div className="flex gap-[0.62rem] lg:gap-[0.9375rem]">
              <span className={GRADE_STYLE[sale.photocard.grade]?.textColor}>
                {GRADE_STYLE[sale.photocard.grade]?.label}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">{sale.photocard.genre}</span>
            </div>
            <span className="border-b border-white text-white">
              {sale.seller.nickname}
            </span>
          </div>

          {/* 총 판매 수량, 장당 가격 */}
          <div className="flex flex-col gap-[1.25rem]">
            {/* NOTE: 현재로선 해당 카드의 총 판매 가능한 수량을 알기 어려운 상태라, 카드 최대 발행 수량(10장)을 max로 설정함 */}
            {/* NOTE: 판매 수량이 보유 수량 초과 시 백엔드에서 에러 처리 */}
            <CounterInput
              label="총 판매 수량"
              labelClassName="text-noto-18-regular lg:text-noto-20-regular"
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={10}
              error={externalQuantityError}
            />
            <PriceInput
              label="장당 가격"
              value={price}
              onChange={setPrice}
              labelClassName="text-noto-18-regular lg:text-noto-20-regular"
              error={touched.price ? errors.price : ''}
              onBlur={() => handleBlur('price', validatePrice, price)}
            />
          </div>
        </div>
      </div>

      {/* 교환 희망 정보 */}
      <div className="mb-[2.75rem] flex flex-col">
        <PageTitle
          title="교환 희망 정보"
          variant="subheading"
          className="mb-[2.88rem] lg:mb-[2.94rem]"
        />
        <div className="flex flex-col gap-[2.13rem] lg:gap-[2.19rem]">
          {/* 등급 + 장르: lg,md-가로 배치, sm-세로 배치 */}
          <div className="flex flex-col gap-[1.25rem] md:flex-row md:gap-[1.25rem] lg:gap-[2.5rem]">
            <div className="flex-1">
              <Select
                label="등급"
                name="desiredGrade"
                value={desiredGrade}
                onChange={(e) => setDesiredGrade(e.target.value)}
                options={CARD_GRADE_OPTIONS}
                labelClassName="text-noto-16-bold lg:text-noto-20-bold"
              />
            </div>
            <div className="flex-1">
              <Select
                label="장르"
                name="desiredGenre"
                value={desiredGenre}
                onChange={(e) => setDesiredGenre(e.target.value)}
                options={GENRE_OPTIONS}
                labelClassName="text-noto-16-bold lg:text-noto-20-bold"
              />
            </div>
          </div>
          {/* 교환 희망 설명 */}
          <Textarea
            label="교환 희망 설명"
            name="desiredDescription"
            value={desiredDescription}
            onChange={(e) => setDesiredDescription(e.target.value)}
            placeholder="교환 희망 설명을 입력해 주세요"
            labelClassName="text-noto-16-bold lg:text-noto-20-bold"
            onBlur={() =>
              handleBlur('description', validateDescription, desiredDescription)
            }
            error={touched.description ? errors.description : ''}
          />
        </div>
      </div>

      {/* 수정/취소 버튼 */}
      <div className="mb-[3.75rem] flex gap-2 lg:mb-0">
        <Button
          variant="secondary"
          className="text-noto-16-bold lg:text-noto-18-bold w-full"
          onClick={onCancel}
        >
          취소하기
        </Button>
        <Button
          type="submit"
          className="text-noto-16-bold lg:text-noto-18-bold w-full"
          disabled={!isFormValid || isPending}
        >
          {isPending ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </form>
  );
};
