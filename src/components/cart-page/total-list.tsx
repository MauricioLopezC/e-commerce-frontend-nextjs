import { peso } from "@/lib/constants";
import { CartItemInterface } from "@/queries/cart.api";
import { Separator } from "../ui/separator";

function TotalList({ cartItems }: { cartItems: CartItemInterface[] }) {
  const total = cartItems.reduce((previous, current) => (
    previous + current.product.price * current.quantity
  ), 0)


  return (
    <div className='flex flex-col w-full justify-around'>
      <div className='py-6 space-y-4'>
        <div className='flex justify-between'>
          <p className='font-bold'>Subtotal</p>
          <p>{peso.format(total)}</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-bold'>Delivery</p>
          <p>Free</p>
        </div>
      </div>
      <Separator />
      <div className='flex justify-between py-6'>
        <p className='font-bold'>Precio total</p>
        <p>{peso.format(total)}</p>
      </div>
    </div>
  )
}

export default TotalList
