'use client';
import { CldImage } from 'next-cloudinary';

function CoverImageV2() {
  return (
    <CldImage
      src="portada_jfgxi9"
      alt="cover image"
      fill
      className="object-cover"
      sizes="100vw"
      priority
    />
  );
}

export default CoverImageV2;
