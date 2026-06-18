import Image from 'next/image';
import { SoldoutIcon } from '@/icons';

export const CardDetail = ({ sale, children }) => {
  const isSoldOut = sale.status === 'SOLD_OUT';

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className="relative mb-[1.25rem] md:mr-[1.25rem] md:mb-0 md:flex-1 lg:mr-[5rem]">
        <Image
          src={sale.photocard.imageUrl}
          alt={`${sale.photocard.name} 사진`}
          width={0}
          height={0}
          sizes="100vw"
          className={`block h-auto w-full ${isSoldOut ? 'opacity-30' : ''}`}
        />
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[46.67%]">
              <SoldoutIcon className="text-red h-auto w-full" />
            </div>{' '}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col md:max-w-[342px] lg:max-w-[440px]">
        {children}
      </div>
    </div>
  );
};
