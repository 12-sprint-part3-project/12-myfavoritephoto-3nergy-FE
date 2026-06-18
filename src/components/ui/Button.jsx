'use client';

const variantStyles = {
  primary: 'bg-main text-black',
  secondary: 'bg-black text-white border border-gray-200',
};

// 모바일 퍼스트 기준 (주석 순서: 모바일 / 태블릿 / PC)
const sizeStyles = {
  thick: 'h-[4.6875rem] lg:h-[5rem]', // 75 / 75 / 80
  lg: 'h-[3.4375rem] md:h-[3.75rem]', // 55 / 60 / 60
  md: 'h-[3.4375rem] lg:h-[3.75rem]', // 55 / 55 / 60
  sm: 'h-[2.5rem] md:h-[3.4375rem] lg:h-[3.75rem]', // 40 / 55 / 60
  xs: 'h-[2.5rem] md:h-[3.4375rem]', // 40 / 55 / 55
};

const disabledStyles = {
  primary:
    'disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed',
  secondary: '',
};

const interactionStyles = {
  primary:
    'hover:brightness-90 active:brightness-85 disabled:hover:brightness-100 disabled:active:brightness-100 transition-all duration-150',
  secondary:
    'hover:bg-white hover:text-black active:bg-gray-100 disabled:hover:bg-black disabled:active:bg-black transition-all duration-150',
};

const focusStyles = {
  primary:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
  secondary:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex cursor-pointer items-center justify-center rounded-xs ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles[variant]} ${interactionStyles[variant]} ${focusStyles[variant]} ${className ?? ''} `}
    >
      {children}
    </button>
  );
};
