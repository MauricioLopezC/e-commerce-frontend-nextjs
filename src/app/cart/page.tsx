import CartList from "@/components/cart-page/cart-list";
import Link from "next/link";
import TotalList from "@/components/cart-page/total-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCart, getCartItems } from "@/lib/actions/cart.actions";

async function CartPage() {
  const { cart, error } = await getCart()
  if (!cart) return null
  const { cartItems, error: cartItemsError } = await getCartItems(cart.id)
  if (!cartItems) return null

  return (
    <>
      <h1 className="font-bold text-xl flex justify-center items-center mt-4">CARRITO</h1>
      <section className='container mx-auto mb-6 min-h-[70vh] lg:flex lg:justify-center lg:space-x-24 mt-4'>

        <CartList cartItems={cartItems} />

        <div className='flex flex-col items-center'>
          <div className='max-w-md mt-6 divide-y-2'>
            <h2 className='py-6 font-bold text-xl'>TOTAL</h2>
            <TotalList cartItems={cartItems} />
            {/* Promo and chekout button */}
            <div>
              <div className='max-w-md'>
                <label htmlFor="codeInput" className='block py-2'>Tienes un codigo de descuento?</label>
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="text" placeholder="Código" />
                  <Button type="submit" className="px-6">APLICAR</Button>
                </div>
              </div>
              {cartItems.length !== 0 &&
                <Link href={'/checkout'} className="">
                  <Button className="w-full mt-2">VERIFICAR</Button>
                </Link>
              }
              {cartItems.length === 0 &&
                <Button className="w-full mt-2" disabled>VERIFICAR</Button>
              }
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default CartPage
