export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-[440px] px-[15px] xl:max-w-[520px] xl:px-0">
        {children}
      </div>
    </div>
  );
}
