const GradeBadge = ({ label, borderColor, textColor, count }) => {
  return (
    <div
      className={`text-noto-12-light md:text-noto-14-light lg:text-noto-16-light inline-flex shrink-0 items-center gap-[5px] border px-[10px] py-[6px] md:gap-[10px] md:px-5 md:py-2 ${borderColor} ${textColor}`}
    >
      <span>{label}</span> <span>{count}장</span>
    </div>
  );
};

export default GradeBadge;
