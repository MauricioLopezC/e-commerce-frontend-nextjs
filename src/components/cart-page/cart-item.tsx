'use client'
import { PlusIcon, MinusIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateQuantity, deleteCartItem } from "@/queries/cart.api"
import { cartItemsProps } from "@/interfaces/cart-item/cart-item"
import { CldImage } from "next-cloudinary"
import { useToast } from "@/hooks/use-toast"


function CartItem({ productName, imgSrc, productPrice, productQuantity, cartItemId, cartId }: cartItemsProps) {
  //TODO: add color and size selected, simply include product sku in backend
  const [cantidad, setCantidad] = useState(productQuantity)
  const { toast } = useToast()
  const router = useRouter()

  return (
    <div className='flex border-t-2 border-b-2 max-w-fit '>
      <div className='w-48'>
        {/* <img src={imgSrc} alt="" className='object-cover h-48 w-48' /> */}
        <CldImage src={imgSrc}
          width="400"
          height="500"
          crop={{
            type: 'auto',
            source: true
          }}
          alt="cldProductImage"
        />
      </div>
      <div className='w-48 flex flex-col justify-around items-center'>
        <h1 className="font-bold text-md text-center">{productName.toUpperCase()}</h1>
        <div className="flex divide-x">
          <h2 className="text-md text-left text-gray-600 px-3">color</h2>
          <h2 className="text-md text-right text-gray-600 px-3">talle</h2>
        </div>

        <div className="p-2 border border-black flex justify-between">
          <button
            className="px-2 py-1"
            onClick={async () => {
              if (cantidad > 0) {
                const nextCantidad = cantidad - 1
                setCantidad(nextCantidad)
                const res = await updateQuantity(nextCantidad, cartItemId, cartId)
                if (res.ok) {
                  router.refresh()
                  toast({
                    title: "Cantidad del producto actualizada",
                  })
                } else console.log("error updating")
              }
            }}>
            <MinusIcon className="h-4 w-4 hover:text-red-500" />
          </button>
          <h2 className="px-2">{cantidad}</h2>
          <button
            className="px-2 py-1"
            onClick={async () => {
              if (cantidad < 10) {
                const nextCantidad = cantidad + 1
                setCantidad(nextCantidad)
                const res = await updateQuantity(nextCantidad, cartItemId, cartId)
                if (res.ok) {
                  router.refresh()
                  toast({
                    title: "Cantidad del producto actualizada",
                  })
                }

                if (!res.ok && res.status === 409) {
                  toast({
                    variant: 'destructive',
                    title: "No hay suficiente stock",
                  })
                  setCantidad(nextCantidad - 1)
                }
              }
            }}>
            <PlusIcon className="h-4 w-4 hover:text-green-700" />
          </button>
        </div>

        <h2 className="font-normal text-gray-600 mb-3">{productPrice} ARS</h2>
      </div>
      <div>
        <button onClick={async () => {
          const res = await deleteCartItem(cartItemId, cartId)
          if (res.ok) {
            console.log("cartItem deleted successfully")
          } else console.log("error deleting product")
          router.refresh()
        }}>
          <XMarkIcon className="h-5 w-5 mt-2 mr-2 hover:text-red-600" />
        </button>
      </div>
    </div>
  )
}

export default CartItem
