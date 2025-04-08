import CartList from "@/components/cart-page/cart-list"
import CheckOutForm from "@/components/checkout/CheckOutForm"
import NotLoggedPage from "@/components/common/notlogged-page"
import { getPayload, isTokenExpired } from "@/lib/jwt-decode"
import { getCartId, getCartItems } from "@/queries/cart.api"
import { cookies } from "next/headers"
async function CheckOutPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('access-token')
  if (!token) return (<NotLoggedPage />)
  if (isTokenExpired(token?.value ?? '')) return (<NotLoggedPage />) //expired session

  const user = getPayload(token?.value ?? '')
  if (!user) return null
  const cartId = await getCartId(user.id, token.value)
  console.log("CARDID", cartId)
  if (!cartId) return (<NotLoggedPage />)
  const cart = await getCartItems(cartId, token.value)

  //OPTIMIZE: perform this calculation in backend instead hera
  //for avoid round errors
  const total = cart.reduce((previous, current) => (
    previous + current.product.price * current.quantity
  ), 0)

  return (
    <>
      <h1 className="font-bold text-xl flex justify-center items-center mt-4">
        VERIFICAR
      </h1>
      <section className="container mx-auto mb-6 lg:flex lg:justify-center lg:space-x-24 min-h-[70vh]">
        <CheckOutForm />
        <div className=" divide-y">
          <CartList cartItems={cart} />
          <div className="flex mt-6 pt-2  justify-between">
            <p className="font-bold">PRECIO TOTAL</p>
            <p className="font-bold">{total} ARS</p>
          </div>
        </div>

      </section>
    </>
  )
}

export default CheckOutPage
