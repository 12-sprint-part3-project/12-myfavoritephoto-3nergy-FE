'use client';

const variantStyles = {
  primary: 'bg-main text-black',
  secondary: 'bg-black text-white border border-gray-200',
};

const sizeStyles = {
  'thick-lg': 'h-[5rem]',
  'thick-md': 'h-[4.6875rem]',
  lg: 'h-[3.75rem]',
  md: 'h-[3.4375rem]',
  sm: 'h-[2.5rem]',
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
      className={`text-noto-16-bold flex items-center justify-center rounded-sm ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles[variant]} ${interactionStyles[variant]} ${focusStyles[variant]} ${className ?? ''} `}
    >
      {children}
    </button>
  );
};
