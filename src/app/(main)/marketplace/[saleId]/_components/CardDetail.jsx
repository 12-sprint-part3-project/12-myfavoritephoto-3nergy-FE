import Image from 'next/image';

export const CardDetail = ({ sale, children }) => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="mb-[1.25rem] md:mr-[1.25rem] md:mb-0 md:flex-1 lg:mr-[5rem]">
        <Image
          src={sale.photocard.imageUrl}
          alt={`${sale.photocard.name} 사진`}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <div className="flex flex-1 flex-col md:max-w-[342px] lg:max-w-[440px]">
        {children}
      </div>
    </div>
  );
};
