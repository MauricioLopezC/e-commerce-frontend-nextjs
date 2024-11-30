'use server'
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/queries/constants"
import { getPayload } from "../jwt-decode"
import { Order } from "@/interfaces/orders"
import { ErrorResponse } from "@/queries/cart.api"
import { revalidatePath } from "next/cache"

export async function addOrder(formData: FormData) {
  const token = cookies().get('access-token')?.value
  const user = getPayload(token ?? '')

  const shipping = {
    country: formData.get('countryInput'),
    city: formData.get('cityInput'),
    postalCode: formData.get('cpInput'),
    adress: formData.get('addressInput')
  }

  const payment = { provider: formData.get('paymentMethod') }
  const email = formData.get('emailInput')

  const res = await fetch(`${BACKEND_URL}/users/${user.id}/orders`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify({
      email,
      shipping,
      payment
    })
  })
  revalidatePath('/products/[productId]', 'page')
  revalidatePath('dashboard/products')

  if (res.ok) {
    const data = await res.json()
    return {
      data
    }
  }
  return {
    error: await res.json()
  }
}

export async function getUserOrders() {
  const token = cookies().get('access-token')?.value
  const user = getPayload(token ?? '')

  const res = await fetch(`${BACKEND_URL}/users/${user.id}/orders`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    }
  })
  if (res.ok) {
    const data = await res.json()
    return {
      data
    }
  }
  return {
    error: await res.json()
  }
}

export interface OrderData {
  orders: Order[];
  aggregate: { _sum: { total: number }, _count: number };
}

interface OrdersResponse {
  data?: OrderData;
  error?: any;
}

export async function getAllOrders(limit: number = 10, page: number = 1): Promise<OrdersResponse> {
  const token = cookies().get('access-token')?.value

  const res = await fetch(`${BACKEND_URL}/orders?limit=${limit}&page=${page}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    }
  })
  if (res.ok) {
    const data = await res.json()
    return {
      data
    }
  }
  return {
    error: await res.json()
  }
}
