import { PageTitle } from '@/components/layout/PageTitle';
import { ExchangeIcon } from '@/icons';
import { GRADE_STYLE } from '@/constants/card';

export const SellerTradeInfo = ({ sale }) => {
  return (
    <div className="flex flex-col gap-[1.875rem]">
      <PageTitle
        leadingIcon={<ExchangeIcon width={28} height={28} />}
        title="교환 희망 정보"
        variant="subheading"
      />
      <div className="text-noto-18-bold lg:text-noto-24-bold border-b border-gray-400 pb-[1.875rem]">
        <div className="flex gap-[0.62rem] lg:gap-[0.9375rem]">
          <span className={GRADE_STYLE[sale.desiredGrade]?.textColor}>
            {GRADE_STYLE[sale.desiredGrade]?.label}
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">{sale.desiredGenre}</span>
        </div>
      </div>
      <p className="text-noto-16-regular lg:text-noto-18-regular text-white">
        {sale.desiredDescription}
      </p>
    </div>
  );
};
