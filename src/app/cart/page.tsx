import Link from "next/link";
import TotalList from "@/components/cart-page/total-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { calculateDiscounts, getCart, getCartItems } from "@/lib/actions/cart.actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import CartItemCard from "@/components/cart-page/cart-itemv2";

async function CartPage() {
  const { cartData } = await getCart();
  if (!cartData) return null;
  const { cartItems } = await getCartItems(cartData.cart.id);
  if (!cartItems) return null;

  const { calcDiscountsData } = await calculateDiscounts();
  if (!calcDiscountsData) return null;
  console.log(calcDiscountsData)

  return (
    <main className="max-w-6xl mx-auto p-6 min-h-screen">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Products Section */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">CARRITO</h1>
            <Badge variant="secondary" className="text-sm">
              {cartItems.length} productos
            </Badge>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">PRODUCTOS</h2>
            {/* TODO: empty cart section  */}
            {cartItems.map((cartItem) => (
              <CartItemCard cartItem={cartItem} key={cartItem.id} />
            ))}
          </div>
        </section>

        {/* Order Summary */}
        <div className="lg-col-span-1">
          <Card className="sticky top-6 bg-gray-50">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-6">TOTAL</h2>

              <TotalList cartTotal={cartData.metadata.cartTotal} calcDiscountsData={calcDiscountsData} />
              {/* Promo and checkout button */}
              <div>
                <div className="max-w-md">
                  <label htmlFor="codeInput" className="block py-2">
                    Tienes un código de descuento?
                  </label>
                  <div className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="Código" id="codeInput" />
                    <Button className="px-6">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
