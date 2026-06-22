import { PhotocardImageViewer } from './PhotocardImageViewer';

export const CardDetail = ({ sale, children }) => {
  const isSoldOut = sale.status === 'SOLD_OUT';

  return (
    <div className="flex w-full flex-col md:flex-row">
      <PhotocardImageViewer
        imageUrl={sale.photocard.imageUrl}
        name={sale.photocard.name}
        isSoldOut={isSoldOut}
        priority={true}
      />

      <div className="flex flex-1 flex-col md:max-w-[342px] lg:max-w-[440px]">
        {children}
      </div>
    </div>
  );
};
