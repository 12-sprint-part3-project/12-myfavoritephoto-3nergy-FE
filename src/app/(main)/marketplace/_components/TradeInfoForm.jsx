import { CARD_GRADE_OPTIONS, CARD_GENRE_OPTIONS } from '@/constants/card';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { PageTitle } from '@/components/layout/PageTitle';

export const TradeInfoForm = ({
  desiredGrade,
  desiredGenre,
  desiredDescription,
  onGradeChange,
  onGenreChange,
  onDescriptionChange,
  onDescriptionBlur,
  descriptionError,
}) => {
  return (
    <div className="mb-[2.75rem] flex flex-col">
      <PageTitle
        title="교환 희망 정보"
        variant="subheading"
        className="mb-[2.88rem] lg:mb-[2.94rem]"
      />
      <div className="flex flex-col gap-[2.13rem] lg:gap-[2.19rem]">
        <div className="flex flex-col gap-[1.25rem] md:flex-row md:gap-[1.25rem] lg:gap-[2.5rem]">
          <div className="flex-1">
            <Select
              label="등급"
              name="desiredGrade"
              value={desiredGrade}
              onChange={onGradeChange}
              options={CARD_GRADE_OPTIONS}
              labelClassName="text-noto-16-bold lg:text-noto-20-bold"
            />
          </div>
          <div className="flex-1">
            <Select
              label="장르"
              name="desiredGenre"
              value={desiredGenre}
              onChange={onGenreChange}
              options={CARD_GENRE_OPTIONS}
              labelClassName="text-noto-16-bold lg:text-noto-20-bold"
            />
          </div>
        </div>
        <Textarea
          label="교환 희망 설명"
          name="desiredDescription"
          value={desiredDescription}
          onChange={onDescriptionChange}
          placeholder="교환 희망 설명을 입력해 주세요"
          labelClassName="text-noto-16-bold lg:text-noto-20-bold"
          onBlur={onDescriptionBlur}
          error={descriptionError}
        />
      </div>
    </div>
  );
};
