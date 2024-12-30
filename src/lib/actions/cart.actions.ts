'use server'
import { cookies } from "next/headers"
import { getPayload } from "../jwt-decode"
import { revalidateTag } from "next/cache"
import { BACKEND_URL } from "@/queries/constants"
import { Cart, CartItem } from "@/interfaces/cart-item/cart"

interface CartResponse {
  cart?: Cart;
  error?: any;
}

export async function getCart(): Promise<CartResponse> {
  const token = cookies().get('access-token')?.value ?? ''
  const userSession = getPayload(token)
  const userId = userSession?.id

  const res = await fetch(`${BACKEND_URL}/users/${userId}/cart`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    }
  })
  if (res.ok) {
    const cart = await res.json()
    return { cart }
  }
  const error = await res.json()
  return { error }
}

export async function addCartItem(
  productId: number,
  productSkuId: number,
  quantity: number,
) {
  const token = cookies().get('access-token')?.value ?? ''
  const { cart, error: cartError } = await getCart()
  if (!cart) return { error: cartError }

  const res = await fetch(`${BACKEND_URL}/cart/${cart.id}/cart-items`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify({
      productId,
      productSkuId,
      quantity
    })
  })
  revalidateTag('cartItems')
  if (res.ok) {
    const cartItem = await res.json()
    return { cartItem }
  }
  const error = await res.json()
  return { error }
}

interface CartItemsResponse {
  cartItems?: CartItem[];
  error?: any;
}

export async function getCartItems(cartId: number): Promise<CartItemsResponse> {
  const token = cookies().get('access-token')?.value ?? ''
  const res = await fetch(`${BACKEND_URL}/cart/${cartId}/cart-items`, {
    credentials: 'include',
    method: "GET",
    headers: {
      Cookie: `access-token=${token}`
    },
    next: {
      tags: ['cartItems']
    }
  })
  if (res.ok) {
    const cartItems = await res.json()
    return { cartItems }
  }
  const error = await res.json()
  return { error }
}


