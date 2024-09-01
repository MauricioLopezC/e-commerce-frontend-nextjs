'use client'
import { useState } from "react"
import { Image } from "@/interfaces/products/image"
import { CldImage } from "next-cloudinary"


interface CarouselProps {
  images: Image[]
}

function CarouselCustom({ images }: CarouselProps) {
  const [mainImage, setMainImage] = useState(images[0].imgSrc)
  return (
    <div className="container mx-auto flex flex-col gap-3 items-center">
      <div className="">
        <CldImage src={mainImage}
          width="400"
          height="500"
          crop={{
            type: 'auto',
            source: true
          }}
          alt="cldProductImage"
        />
      </div>
      <div className="bg-red-200 w-full overflow-x-scroll">
        {images.map((image, idx) => (
          <button
            type="button"
            className="w-24 h-24 mr-2 focus:ring focus:ring-black rounded-lg"
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
              className="rounded-t-lg rounded-b-lg"
            />
          </button>
        ))}

      </div>
    </div>
  )
}


export default CarouselCustom
