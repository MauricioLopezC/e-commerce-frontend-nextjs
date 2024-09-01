import { getCartItems } from "@/queries/cart.api"

async function CartPage() {
  const cartItems = await getCartItems(2);
  if (!cartItems.ok) {
    return null
  }

  return (
    <>
      <h1>MI CARRITO CHAMVAL</h1>
    </>
  )
}

export default CartPage
