'use client'
import { peso } from "@/lib/constants"
import { CldImage } from "next-cloudinary"
import Link from "next/link"
interface ProductCardProdps {
  id: number,
  title: string,
  price: number,
  imgSrc: string
}

function ProductCard({ id, title, price, imgSrc }: ProductCardProdps) {
  return (
    <div>
      <Link href={`/products/${id}`}>
        <div className="w-72 bg-white border border-gray-200 rounded-lg shadow">
          <CldImage src={imgSrc}
            width="400"
            height="500"
            crop={{
              type: 'auto',
              source: true
            }}
            alt="hola"
            priority
          />
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight">{title}</h5>
            <p className="mb-3 font-normal text-gray-400">
              {peso.format(price)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
