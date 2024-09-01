'use client'
import { HeartIcon } from "@heroicons/react/24/outline"
import { useState } from 'react'
import CantidadSelect from "./Select"
import { addToCart } from "@/queries/cart.api"

interface ProductOptionsProps {
  productId: number;
  userId: number;
}

function ProductOptions({ productId, userId }: ProductOptionsProps) {
  const [quantity, setQuanity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  return (
    <>
      <div className="flex flex-row gap-2 mt-2">
        <div className="basis-5/6 border border-black">
          <CantidadSelect setValue={setQuanity} />
        </div>
        <button
          className="border border-black basis-1/6 flex justify-center py-1 px-1"
          onClick={() => {
            setIsFavorite(!isFavorite)
          }}
        >
          {isFavorite
            ? <HeartIcon className="w-6 h-6 fill-red-500 text-red-500" />
            : <HeartIcon className="w-6 h-6 hover:text-red-600 " />
          }
        </button>
      </div>
      <button
        className='max-w-md w-full px-4 py-2 bg-black text-white mt-2'
        onClick={async () => {
          const res = await addToCart(productId, 2, quantity)
          if (!res.ok) {
            return alert("Login for add to cart")
          }
          console.log(productId, userId, quantity)
        }}
      >
        Agregar al carrito
      </button>
      {/* <ConfirmDialog isOpen={isOpen} setIsOpen={setIsOpen} /> */}

    </>
  )
}

export default ProductOptions
