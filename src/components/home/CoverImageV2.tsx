'use client'
import { CldImage } from "next-cloudinary"

function CoverImageV2() {
  return (
    <CldImage
      src='e-commerce/svhli2rcuzbevgkgym1f'
      alt="cover image"
      fill
      className="object-cover"
      sizes="100vw"
      priority
    />
  )
}

export default CoverImageV2
