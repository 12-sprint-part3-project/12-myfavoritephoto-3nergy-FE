const variantStyles = {
  'title-lg': 'font-baskin-base text-baskin-48-bold lg:text-baskin-62-bold',
  'title-md': 'font-baskin-base text-baskin-40-bold lg:text-baskin-46-bold',
  heading: 'text-noto-24-bold md:text-noto-32-bold lg:text-noto-40-bold',
  subheading: 'text-noto-22-bold lg:text-noto-28-bold',
};

const gapStyles = {
  'title-lg': 'mb-[1.25rem]',
  'title-md': 'mb-[1.25rem]',
  heading: 'mb-[0.625rem] md:mb-[1.25rem]',
  subheading: 'mb-[0.625rem]',
};

export const PageTitle = ({
  variant,
  title,
  breadcrumb,
  leadingIcon,
  actions,
  hideBreadcrumbOnMobile = false,
  hideBorderOnMobile = false,
  className,
}) => {
  return (
    <div
      className={`w-full border-b border-gray-200 ${hideBorderOnMobile && 'max-md:border-none'} ${className}`}
    >
      {breadcrumb && (
        <p
          className={`font-baskin-base text-baskin-16-bold lg:text-baskin-24-bold mb-[0.94rem] text-gray-300 md:mb-[2.5rem] ${hideBreadcrumbOnMobile && 'hidden md:block'}`}
        >
          {breadcrumb}
        </p>
      )}
      <div
        className={`flex items-center justify-between ${gapStyles[variant]}`}
      >
        <div className="flex items-center gap-[0.625rem]">
          {leadingIcon && <div>{leadingIcon}</div>}
          <h1 className={`text-white ${variantStyles[variant]}`}>{title}</h1>
        </div>
        {actions && <div>{actions}</div>}
      </div>
    </div>
  );
};
