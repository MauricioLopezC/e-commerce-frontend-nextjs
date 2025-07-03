'use server'
import { cookies } from "next/headers"
import { getPayload } from "../jwt-decode"
import { revalidateTag } from "next/cache"
import { BACKEND_URL } from "@/queries/constants"
import { Cart, CartItem } from "@/interfaces/cart-item/cart"
import { ErrorResponse } from "@/interfaces/responses"

interface CartData {
  cart: Cart,
  metadata: { cartTotal: number }
}

interface CartResponse {
  cartData?: CartData;
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
    },
    next: {
      tags: ['cart']
    }
  })
  if (res.ok) {
    const cart = await res.json()
    return { cartData: cart }
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
  const { cartData, error: cartError } = await getCart()
  if (!cartData) return { error: cartError }

  const res = await fetch(`${BACKEND_URL}/cart/${cartData.cart.id}/cart-items`, {
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
  revalidateTag('cart-items')
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
      tags: ['cart-items']
    }
  })
  if (res.ok) {
    const cartItems = await res.json()
    return { cartItems }
  }
  const error = await res.json()
  return { error }
}

interface OneCartItemResponse {
  cartItem?: CartItem
  error?: ErrorResponse
}

export async function updateCartItemQuantity(quantity: number, cartItemId: number, cartId: number): Promise<OneCartItemResponse> {
  const token = cookies().get('access-token')?.value ?? ''

  const res = await fetch(`${BACKEND_URL}/cart/${cartId}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify({
      quantity,
    }),
  })
  if (res.ok) {
    revalidateTag('discount-amount')
    revalidateTag('cart-items')
    revalidateTag('cart')
    const cartItem = await res.json()
    return { cartItem }
  }
  const error = await res.json()
  return { error }
}


export async function deleteCartItem(cartId: number, cartItemId: number): Promise<OneCartItemResponse> {
  const token = cookies().get('access-token')?.value ?? ''

  const res = await fetch(`${BACKEND_URL}/cart/${cartId}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    },
  })
  if (res.ok) {
    revalidateTag('discount-amount')
    revalidateTag('cart-items')
    revalidateTag('cart')
    const cartItem = await res.json()
    return { cartItem }
  }
  const error = await res.json()
  return { error }
}

interface AppliedDiscount {
  discountId: number
  discountName: string
  discountValue: number
  discountAmount: number
  appliedTimes: number
}

export interface CalcDiscountsData {
  appliedDiscounts: AppliedDiscount[]
  discountAmount: number
  finalTotal: number
}

interface CalcDiscountsResponse {
  calcDiscountsData?: CalcDiscountsData
  error?: ErrorResponse
}


export async function calculateDiscounts(): Promise<CalcDiscountsResponse> {
  const token = cookies().get('access-token')?.value ?? ''
  const userSession = getPayload(token)
  const userId = userSession?.id
  //TODO: handle error if userId is null
  //
  const res = await fetch(`${BACKEND_URL}/users/${userId}/cart/total-discount`, {
    credentials: 'include',
    method: "GET",
    headers: {
      Cookie: `access-token=${token}`
    },
    next: {
      tags: ['discount-amount']
    }
  })
  if (res.ok) {
    const calcDiscountsData = await res.json()
    return { calcDiscountsData }
  }
  const error = await res.json()
  return { error }

}


