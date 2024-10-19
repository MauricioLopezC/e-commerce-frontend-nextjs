import { CartItemInterface } from "@/queries/cart.api"
import CartItem from "./cart-item";

async function CartList({ cartItems }: { cartItems: CartItemInterface[] }) {
  return (
    <div>
      <h1 className='font-bold text-lg flex justify-center lg:justify-start'>PRODUCTOS</h1>
      <div className='flex flex-col gap-4 items-center'>
        {cartItems.map((cartItem, idx: number) => (
          <CartItem
            key={idx}
            productName={cartItem.product.name}
            imgSrc={cartItem.product.images[0].imgSrc}
            productPrice={cartItem.product.price}
            productQuantity={cartItem.quantity}
            cartItemId={cartItem.id}
            cartId={cartItem.cartId}
          />
        ))}
      </div>
    </div>
  )
}

export default CartList
