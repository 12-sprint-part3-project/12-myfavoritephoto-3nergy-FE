import { GRADE_STYLE } from '@/constants/card';
import GradeBadge from '@/components/domain/photocard/GradeBadge';

const GradeBadgeList = ({ grades, className = '' }) => {
  return (
    <div
      className={`flex flex-nowrap items-center gap-[10px] overflow-x-auto md:gap-5 ${className}`}
    >
      {grades.map(({ grade, count }) => (
        <GradeBadge key={grade} count={count} {...GRADE_STYLE[grade]} />
      ))}
    </div>
  );
};

export default GradeBadgeList;
