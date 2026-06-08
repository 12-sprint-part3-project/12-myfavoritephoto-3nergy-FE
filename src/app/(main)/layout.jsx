export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <GNB /> */}
      <main className="mx-auto w-full max-w-[1480px] px-[0.94rem] pt-[1.25rem] md:px-[1.25rem] md:pt-[2.5rem] xl:px-[1.25rem] xl:pt-[3.75rem]">
        {children}
      </main>
    </div>
  );
}
