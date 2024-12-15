'use client'
import { useState } from "react"
import { Image } from "@/interfaces/products/image"
import { CldImage } from "next-cloudinary"


interface CarouselProps {
  images: Image[]
}

function CarouselCustom({ images }: CarouselProps) {
  //TODO: make image bigger in lg screens but responsive in small screens
  //FIX: improove performance
  const [mainImage, setMainImage] = useState(images[0].imgSrc)
  return (
    <div className="flex flex-col gap-3 items-start max-w-xl">
      <CldImage src={mainImage}
        width="400"
        height="500"
        sizes="100vh"
        crop={{
          type: 'auto',
          source: true
        }}
        alt="cldProductImage"
        className="rounded-sm w-[100%] h-auto"
      />
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, idx) => (
          <button
            type="button"
            className="w-16 h-16 md:h-24 md:w-24 focus:ring-2 focus:ring-black rounded-sm"
            key={image.id}
            onClick={() => {
              setMainImage(images[idx].imgSrc)
            }}
          >
            <CldImage src={image.imgSrc}
              width="400"
              height="400"
              crop={{
                type: 'auto',
                source: true
              }}
              alt="cldProductImage"
              className="rounded-sm"
            />
          </button>
        ))}

      </div>
    </div>
  )
}


export default CarouselCustom
