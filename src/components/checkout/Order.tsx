import { CartItemInterface } from '@/queries/cart.api'
import React from 'react'

function Order({ cartItems }: { cartItems: CartItemInterface[] }) {

  const total = cartItems.reduce((previous, current) => (
    previous + current.product.price * current.quantity
  ), 0)

  return (
    <div id="PagoGroup">
      <div id="orderGroup" className="">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl">TU ORDEN</h1>
          <div className='flex flex-col gap-4 items-stretch mt-4'>
            {cartItems.map((cartItem, idx) => (
              <div key={idx} className="flex  justify-between">
                <h1 className="font-bold">{cartItem.quantity}X {cartItem.product.name.toUpperCase()}</h1>
                <h1 className="ml-6 font-bold">{cartItem.product.price}ARS</h1>
              </div>
            ))}
          </div>
        </div>
        <div className="flex mt-6 justify-between">
          <p className="font-bold">PRECIO TOTAL</p>
          <p className="font-bold">{total} ARS</p>
        </div>
      </div >
      {/* <ConfirmDialog isOpen={confirmOpen} setIsOpen={setConfirmOpen} /> */}
    </div >
  )
}

export default Order
