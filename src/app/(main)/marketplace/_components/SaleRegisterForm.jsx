import Image from 'next/image';
import { useSaleRegisterForm } from '@/hooks/sale/useSaleRegisterForm';
import {
  GRADE_STYLE,
  CARD_GRADE_OPTIONS,
  CARD_GENRE_OPTIONS,
} from '@/constants/card';
import { MAXIMUM_PRICE } from '@/constants/card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { CounterInput } from '@/components/ui/CounterInput';
import { PriceInput } from '@/components/ui/PriceInput';
import { PageTitle } from '@/components/layout/PageTitle';
import { validatePrice, validateDescription } from '@/utils/validators';

export const SaleRegisterForm = ({ photocard, onBack }) => {
  const {
    form,
    errors,
    touched,
    isPending,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
  } = useSaleRegisterForm(photocard);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <PageTitle
        breadcrumb="나의 포토카드 판매하기"
        hideBreadcrumbOnMobile
        title={photocard.name}
        variant="heading"
        className="mb-[1.63rem] md:mb-[3rem] lg:mb-[3.13rem]"
      />

      {/* 포토카드 정보, 수량, 가격 */}
      <div className="mb-[7.5rem] flex flex-col md:mb-[3.84rem] md:flex-row lg:mb-[3.47rem]">
        {/* 포토카드 사진 */}
        <div className="mb-[1.2rem] md:mr-[1.25rem] md:mb-0 md:flex-1 lg:mr-[2.5rem]">
          <Image
            src={photocard.imageUrl}
            alt={`${photocard.name} 사진`}
            width={0}
            height={0}
            sizes="100vw"
            className="block h-auto w-full"
          />
        </div>

        <div className="flex flex-1 flex-col">
          {/* 등급, 장르, 판매자 닉네임 */}
          <div className="mb-[1.875rem] flex justify-between border-b border-gray-400 pb-[1.875rem] text-noto-18-bold lg:text-noto-24-bold">
            <div className="flex gap-[0.62rem] lg:gap-[0.9375rem]">
              <span className={GRADE_STYLE[photocard.grade]?.textColor}>
                {GRADE_STYLE[photocard.grade]?.label}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-300">{photocard.genre}</span>
            </div>
            <span className="border-b border-white text-white">
              {photocard.ownerNickname}
            </span>
          </div>

          {/* 총 판매 수량, 장당 가격 */}
          <div className="flex flex-col gap-[1.25rem]">
            <CounterInput
              label="총 판매 수량"
              showMaxLabel
              labelClassName="text-noto-18-regular lg:text-noto-20-regular"
              value={form.quantity}
              onChange={(val) => handleChange('quantity', val)}
              min={1}
              max={photocard.quantity}
            />
            <PriceInput
              label="장당 가격"
              value={form.price}
              onChange={(val) => handleChange('price', val)}
              labelClassName="text-noto-18-regular lg:text-noto-20-regular"
              error={touched.price ? errors.price : ''}
              onBlur={() => handleBlur('price', validatePrice, form.price)}
              max={MAXIMUM_PRICE}
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
                value={form.desiredGrade}
                onChange={(e) => handleChange('desiredGrade', e.target.value)}
                options={CARD_GRADE_OPTIONS}
                labelClassName="text-noto-16-bold lg:text-noto-20-bold"
              />
            </div>
            <div className="flex-1">
              <Select
                label="장르"
                name="desiredGenre"
                value={form.desiredGenre}
                onChange={(e) => handleChange('desiredGenre', e.target.value)}
                options={CARD_GENRE_OPTIONS}
                labelClassName="text-noto-16-bold lg:text-noto-20-bold"
              />
            </div>
          </div>
          {/* 교환 희망 설명 */}
          <Textarea
            label="교환 희망 설명"
            name="desiredDescription"
            value={form.desiredDescription}
            onChange={(e) => handleChange('desiredDescription', e.target.value)}
            placeholder="교환 희망 설명을 입력해 주세요"
            labelClassName="text-noto-16-bold lg:text-noto-20-bold"
            onBlur={() =>
              handleBlur(
                'description',
                validateDescription,
                form.desiredDescription,
              )
            }
            error={touched.description ? errors.description : ''}
          />
        </div>
      </div>

      {/* 수정/취소 버튼 */}
      <div className="mb-[3.75rem] flex gap-2 lg:mb-0">
        <Button
          variant="secondary"
          className="w-full text-noto-16-bold lg:text-noto-18-bold"
          onClick={onBack}
        >
          취소하기
        </Button>
        <Button
          type="submit"
          className="w-full text-noto-16-bold lg:text-noto-18-bold"
          disabled={!isFormValid || isPending}
        >
          {isPending ? '등록 중...' : '판매하기'}
        </Button>
      </div>
    </form>
  );
};
