import { CARD_GRADE_STYLE } from '@/constants/card';
import GradeBadge from './GradeBadge';

const GradeBadgeList = ({ grades }) => {
  return (
    <div className="flex flex-nowrap items-center gap-[10px] overflow-x-auto md:gap-5">
      {grades.map(({ grade, count }) => (
        <GradeBadge
          key={grade}
          count={count}
          {...CARD_GRADE_STYLE[grade]} // label, className 전달
        />
      ))}
    </div>
  );
};

export default GradeBadgeList;
