import { BACKEND_URL } from "./products"
export async function addToCart(productId: number, productSkuId: number, quantity: number) {
  const res = await fetch(`${BACKEND_URL}/cart/2/cart-items`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      productId,
      productSkuId,
      quantity
    })
  })

  console.log(res)
  console.log(await res.json())
  return res
}

export async function getCartItems(cartId: number) {
  const res = await fetch(`${BACKEND_URL}/cart/${cartId}/cart-items`, {
    method: "GET"
  })
  return res
}
