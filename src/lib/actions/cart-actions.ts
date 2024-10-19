'use server'
import { addToCart, getCartId } from "@/queries/cart.api"
import { cookies } from "next/headers"
import { getPayload } from "../jwt-decode"
import { revalidatePath } from "next/cache"

export async function addToCartAction(productId: number, productSkuId: number, quantity: number) {
  const cookie = cookies().get('access-token')
  if (!cookie) return { error: "user is not logged in", message: "user is not logged in", statusCode: 401 }
  const token = cookie.value

  const payload = getPayload(token)
  const cartId = await getCartId(payload.id, token)
  if (!cartId) return { ok: false, message: "error al obtener el cartId" }

  const response = await addToCart(productId, productSkuId, quantity, cartId, token)
  revalidatePath('/cart')
  return response.json()
}
