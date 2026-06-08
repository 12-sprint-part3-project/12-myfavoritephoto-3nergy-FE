export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-[27.5rem] px-[0.9375rem] xl:max-w-[32.5rem] xl:px-0">
        {children}
      </div>
    </div>
  );
}
