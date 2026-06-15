//import { useSaleRegisterForm } from '@/hooks/trade/useTradeOfferForm';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { CounterInput } from '@/components/ui/CounterInput';
import { PriceInput } from '@/components/ui/PriceInput';
import { PageTitle } from '@/components/layout/PageTitle';
import { validatePrice, validateDescription } from '@/utils/validators';
import { Card } from '@/components/domain/photocard/Card';

export const TradeOfferForm = ({ photocard, onBack }) => {
  /*
  const {
    form,
    errors,
    touched,
    isPending,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
  } = useTradeOfferForm(photocard);
*/

  return (
    <form className="flex flex-col">
      <PageTitle
        breadcrumb="포토카드 교환하기"
        hideBreadcrumbOnMobile
        title={photocard.name}
        variant="heading"
        className="mb-[1.63rem] md:mb-[3rem] lg:mb-[3.13rem]"
      />

      <div className="flex flex-col gap-[7.5rem] md:flex-row md:gap-[1.25rem] lg:gap-[2.5rem]">
        <div className="md:mb-0 md:flex-1">
          <Card
            type="marketplace"
            name={photocard.name}
            imageUrl={photocard.imageUrl}
            grade={photocard.grade}
            genre={photocard.genre}
            price={photocard.price}
            totalQuantity={photocard.quantity}
            remainingQuantity={photocard.remainingQuantity}
            owner={photocard.ownerNickname}
            status="SALE"
          />
        </div>

        <div className="flex flex-1 flex-col gap-[2.75rem] lg:gap-[3.75rem]">
          {/* 교환 제시 내용 */}
          <Textarea
            label="교환 제시 내용"
            name="description"
            /*
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            */
            placeholder="교환 제시 내용을 입력해 주세요"
            labelClassName="text-noto-16-bold lg:text-noto-20-bold"
            /*
            onBlur={() =>
              handleBlur('description', validateDescription, form.description)
            }
            error={touched.description ? errors.description : ''}
            */
          />

          {/* 수정/취소 버튼 */}
          <div className="mb-[2.5rem] flex gap-[0.94rem] md:mb-0 md:gap-[1.25rem]">
            <Button
              variant="secondary"
              className="text-noto-16-bold lg:text-noto-18-bold w-full"
              onClick={onBack}
            >
              취소하기
            </Button>
            <Button
              type="submit"
              className="text-noto-16-bold lg:text-noto-18-bold w-full"
              /*disabled={!isFormValid || isPending}*/
            >
              교환하기
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
