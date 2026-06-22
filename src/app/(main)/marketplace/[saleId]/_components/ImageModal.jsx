'use client';

import Image from 'next/image';
import { CloseIcon } from '@/icons';
import { Overlay } from '@/components/ui/Overlay';

export const ImageModal = ({ imageUrl, name, onClose }) => {
  return (
    <Overlay onClose={onClose}>
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-[60] rounded-full bg-black/50 p-3 text-white"
      >
        <CloseIcon width={20} />
      </button>

      <div className="relative h-[75vh] w-[80vw] max-w-[700px]">
        <Image
          src={imageUrl}
          alt={`${name} 원본 이미지`}
          fill
          className="object-contain"
          sizes="80vw"
        />
      </div>
    </Overlay>
  );
};
