import CartList from "@/components/cart-page/cart-list";
import Link from "next/link";
import TotalList from "@/components/cart-page/total-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculateDiscounts, getCart, getCartItems } from "@/lib/actions/cart.actions";
import { Separator } from "@/components/ui/separator";

async function CartPage() {
  const { cartData } = await getCart();
  if (!cartData) return null;
  const { cartItems } = await getCartItems(cartData.cart.id);
  if (!cartItems) return null;

  const { calcDiscountsData } = await calculateDiscounts();
  console.log(calcDiscountsData)
  if (!calcDiscountsData) return null;

  return (
    <main>
      <h1 className="font-bold text-2xl flex justify-center items-center mt-4">
        CARRITO
      </h1>
      <section className="container mx-auto mb-6 min-h-[70vh] lg:flex lg:justify-center lg:space-x-24 mt-4">
        <div>
          <h1 className="font-bold text-xl text-start mb-4">PRODUCTOS</h1>
          <CartList cartItems={cartItems} />
        </div>
        <div className="flex flex-col justify-start max-w-md">
          <h2 className="font-bold text-xl text-start mb-4">TOTAL</h2>
          <Separator />
          <TotalList cartTotal={cartData.metadata.cartTotal} calcDiscountsData={calcDiscountsData} />
          {/* Promo and checkout button */}
          <div>
            <div className="max-w-md">
              <label htmlFor="codeInput" className="block py-2">
                Tienes un código de descuento?
              </label>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Código" />
                <Button type="submit" className="px-6">
                  APLICAR
                </Button>
              </div>
            </div>
            {cartItems.length !== 0 && (
              <Link href={"/checkout"} className="">
                <Button className="w-full mt-2">VERIFICAR</Button>
              </Link>
            )}
            {cartItems.length === 0 && (
              <Button className="w-full mt-2" disabled>
                VERIFICAR
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default CartPage;
