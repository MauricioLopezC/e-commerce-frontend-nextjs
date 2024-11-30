import { CartItemInterface } from "@/queries/cart.api"
import CartItem from "./cart-item";
import { ShoppingCart } from "lucide-react";

async function CartList({ cartItems }: { cartItems: CartItemInterface[] }) {
  return (
    <div>
      <h1 className='font-bold text-lg flex justify-center lg:justify-start'>PRODUCTOS</h1>
      <div className='flex flex-col gap-4 items-center'>
        {cartItems.length === 0 &&
          <div className="flex items-center mt-6 space-x-2">
            <ShoppingCart className="w-6 h-6" />
            <p>Carrito Vació</p>

          </div>
        }
        {cartItems.map((cartItem, idx: number) => (
          <CartItem
            key={idx}
            cartItem={cartItem}
          />
        ))}
      </div>
    </div>
  )
}

export default CartList
