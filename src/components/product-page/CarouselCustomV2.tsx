'use client'
import { Image } from "@/interfaces/products/image"
import { CldImage } from "next-cloudinary"
import { useState } from "react"

interface CarouselProps {
  images: Image[]
}

function Carousel({ images }: CarouselProps) {
  const [mainImage, setMainImage] = useState<string>(images[0].imgSrc)
  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
        <CldImage
          src={mainImage}
          fill
          className="object-cover"
          alt={`product-image`}
          priority
        />
      </div>
      {/* thumbs */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, idx) => (
          <button
            className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 focus:ring focus:ring-black focus:ring-offset-2"
            key={image.id}
            onClick={() => setMainImage(images[idx].imgSrc)}
          >
            <CldImage
              src={image.imgSrc}
              className="object-cover"
              fill
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
