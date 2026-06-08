export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <GNB /> */}
      <main className="mx-auto w-full max-w-[1480px] px-[15px] pt-[20px] md:px-[20px] md:pt-[40px] xl:pt-[60px]">
        {children}
      </main>
    </div>
  );
}
