import { CartItemInterface } from "@/queries/cart.api";

function TotalList({ cartItems }: { cartItems: CartItemInterface[] }) {
  const total = cartItems.reduce((previous, current) => (
    previous + current.product.price * current.quantity
  ), 0)

  return (
    <div className='flex flex-col divide-y-2 justify-around'>
      <div className='py-6'>
        <div className='flex justify-between'>
          <p className='font-bold'>Subtotal</p>
          <p>{total} USD</p>
        </div>
        <div className='flex justify-between'>
          <p className='font-bold'>Delivery</p>
          <p>Free</p>
        </div>
      </div>
      <div className='flex justify-between py-6'>
        <p className='font-bold'>Precio total</p>
        <p>{total} USD</p>
      </div>
    </div>
  )
}

export default TotalList
