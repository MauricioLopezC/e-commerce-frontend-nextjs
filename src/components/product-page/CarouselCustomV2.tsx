'use client'
import { Image } from "@/interfaces/products/image"
import { CldImage } from "next-cloudinary"
import { useState } from "react"

interface CarouselProps {
  images: Image[]
}

function Carousel({ images }: CarouselProps) {
  //FIX: improove performance
  const [mainImage, setMainImage] = useState<string>(images[0].imgSrc)
  return (
    <div>
      {/* Main image */}
      <CldImage
        src={mainImage}
        height='500'
        width='500'
        className="aspect-square w-full rounded-md object-cover"
        alt={`product-image`}
        priority
      />
      {/* thumbs */}
      <div className="flex gap-2 mt-4">
        {images.map((image, idx) => (
          <button
            className="h-24 w-24 focus:ring-2 focus:ring-black rounded-md"
            key={image.id}
            onClick={() => setMainImage(images[idx].imgSrc)}
          >
            <CldImage
              src={image.imgSrc}
              className="aspect-square w-full rounded-md object-cover"
              height="84"
              width="84"
              priority
              alt="Product image"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

export default Carousel
