export const Spinner = ({ className = '' }) => {
  return (
    <div
      className={`border-t-main h-8 w-8 animate-spin rounded-full border-[3px] border-gray-300 ${className} `}
    />
  );
};
