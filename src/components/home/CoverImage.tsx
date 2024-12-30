'use client'
import { CldImage } from "next-cloudinary"

function CoverImage() {
  return (
    <CldImage
      src='e-commerce/svhli2rcuzbevgkgym1f'
      height="1920"
      width="1080"
      //className="w-full max-h-[70vh] object-cover rounded-md"
      className="absolute w-full object-cover m-auto drop-shadow-md  rounded-md h-[70vh]"
      aspectRatio="16:9"
      alt="cover image"
      priority
    />
  )
}

export default CoverImage
