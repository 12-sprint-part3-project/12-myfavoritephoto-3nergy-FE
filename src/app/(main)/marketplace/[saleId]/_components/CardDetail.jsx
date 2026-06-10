import Image from 'next/image';

export const CardDetail = ({ sale, children }) => {
  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="mb-[1.25rem] md:mr-[1.25rem] md:mb-0 md:flex-1 lg:mr-[5rem]">
        <Image
          src={sale.photocard.imageUrl}
          alt={`${sale.photocard.name} 사진`}
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};
