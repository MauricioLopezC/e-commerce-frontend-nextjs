'use client'
import { CldImage } from "next-cloudinary"

function CoverImage() {
  return (
    <CldImage
      src='e-commerce/svhli2rcuzbevgkgym1f'
      height="1920"
      width="1080"
      className="w-full max-h-[70vh] object-cover"
      aspectRatio="16:9"
      alt="cover image"
    />
  )
}

export default CoverImage
