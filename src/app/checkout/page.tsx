import CheckOutForm from "@/components/checkout/CheckOutForm"
import { calculateDiscounts, getCart, getCartItems } from "@/lib/actions/cart.actions"
import { peso } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card";
import TotalList from "@/components/cart-page/total-list";
import CheckOutFormv2 from "@/components/checkout/CheckOutFormv2";

async function CheckOutPage() {
  const { cartData, error } = await getCart()
  if (!cartData) return null
  const { cartItems } = await getCartItems(cartData.cart.id);
  if (!cartItems) return null;
  //TODO: get user email for autofill

  const { calcDiscountsData } = await calculateDiscounts();
  if (!calcDiscountsData) return null;
  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-2xl font-bold">VERIFICAR</h1>
        <main className="grid gap-8 lg:grid-cols-3">
          {/* form */}
          <div className="lg:col-span-2 space-y-6">
            {/* <CheckOutForm /> */}
            <CheckOutFormv2 />
          </div>
          {/* summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 bg-gray-50">
              <CardContent className="p-6">
                <TotalList cartTotal={cartData.metadata.cartTotal} calcDiscountsData={calcDiscountsData} />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CheckOutPage
