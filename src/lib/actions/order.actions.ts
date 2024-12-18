'use server'
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/queries/constants"
import { getPayload } from "../jwt-decode"
import { Order } from "@/interfaces/orders"
import { revalidatePath } from "next/cache"

export async function addOrder(formData: FormData) {
  const token = cookies().get('access-token')?.value
  const user = getPayload(token ?? '')
  if (!user) return null

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
  if (!user) return null

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

export interface OrdersData {
  orders: Order[];
  aggregate: { _sum: { total: number }, _count: number };
}

interface OrdersResponse {
  ordersData?: OrdersData;
  error?: any;
}

interface GetOrdersOptions {
  limit?: number;
  page?: number;
}

export async function getAllOrders(options: GetOrdersOptions): Promise<OrdersResponse> {
  const token = cookies().get('access-token')?.value

  const queryParams = new URLSearchParams()
  let key: keyof GetOrdersOptions
  for (key in options) {
    const value = options[key]
    if (value) {
      queryParams.set(key, value.toString())
    }
  }


  const res = await fetch(`${BACKEND_URL}/orders?${queryParams.toString()}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    }
  })
  if (res.ok) {
    const ordersData = await res.json()
    return {
      ordersData
    }
  }
  return {
    error: await res.json()
  }
}
