import { Product, ProductSku } from "@/interfaces/products/product";
import { BACKEND_URL } from "./constants"
//TODO: move this opeations to cart.actions.ts

/**
 *
 */
export async function addToCart(productId: number, productSkuId: number, quantity: number, cartId: number, token: string) {
  const res = await fetch(`${BACKEND_URL}/cart/${cartId}/cart-items`, {
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
  return res
}

export interface CartItemInterface {
  id: number;
  cartId: number;
  productId: number;
  productSkuId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  productSku: ProductSku;
}


export interface ErrorResponse {
  statusCode: number,
  message: 'string'

}

export async function getCartItems(cartId: number, token: string): Promise<CartItemInterface[]> {
  const res = await fetch(`${BACKEND_URL}/cart/${cartId}/cart-items`, {
    credentials: 'include',
    method: "GET",
    headers: {
      Cookie: `access-token=${token}`
    }
  })
  return res.json()
}

/**
 * server request
 */
export async function getCartId(userId: number, token: string): Promise<number | undefined> {
  //check if is returning undefinded in fail case
  const res = await fetch(`${BACKEND_URL}/users/${userId}/cart`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    }
  })
  const cart = await res.json()
  console.log('CART', cart)
  return cart?.id
}


/**
 * used in client component, access-token will be sent automatically with the request
 * @param quantity    new cartItem quantity
 * @param cartId      id of userCart
 * @param cartItemId  id of cartItem
 */
export async function updateQuantity(quantity: number, cartItemId: number, cartId: number) {
  const res = await fetch(`${BACKEND_URL}/cart/${cartId}/cart-items/${cartItemId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quantity,
    }),
  })
  return res
}

/**
 * used in client component, access-token will be sent automatically with the request
 * @param cartId      id of userCart
 * @param cartItemId  id of cartItem
 */
export async function deleteCartItem(cartItemId: number, cartId: number) {
  const res = await fetch(`${BACKEND_URL}/cart/${cartId}/cart-items/${cartItemId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    }
  })
  return res
}

