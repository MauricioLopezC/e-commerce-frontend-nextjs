'use server'

import { Discount } from "@/interfaces/discounts"
import { BACKEND_URL } from "@/queries/constants"
import { cookies } from "next/headers"

interface OneDiscountResponse {
  discount?: Discount;
  error?: any

}

export async function getAllDiscounts() {
  const res = await fetch(`${BACKEND_URL}/promotions/discounts`, {
    method: 'GET',
  })
  if (res.ok) {
    const discounts = await res.json()
    return { discounts }
  }
  const error = await res.json()
  return { error }
}

export async function getOneDiscount(id: number): Promise<OneDiscountResponse> {
  const token = cookies().get("access-token")?.value;

  const res = await fetch(`${BACKEND_URL}/promotions/discounts/${id}`, {
    headers: {
      Cookie: `access-token=${token}`,
    },
    method: 'GET',
  })
  if (res.ok) {
    const discount = await res.json()
    return { discount }
  }
  const error = await res.json()
  return { error }
}
