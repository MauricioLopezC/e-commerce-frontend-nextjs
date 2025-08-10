'use server'

import { Discount } from "@/interfaces/discounts"
import { ErrorResponse } from "@/interfaces/responses";
import { BACKEND_URL } from "@/queries/constants"
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers"

interface OneDiscountResponse {
  discount?: Discount;
  error?: ErrorResponse;
}

interface CreateDiscountDto {
  name: string
  description: string
  discountType: string
  value: number
  startDate: Date
  endDate: Date
  applicableTo: string
  orderThreshold: number
  maxUses?: number
  isActive: boolean
  products?: number[]
  categories?: number[]
}

export async function createDiscount(data: CreateDiscountDto) {
  const token = cookies().get("access-token")?.value;

  const res = await fetch(`${BACKEND_URL}/promotions/discounts`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`,
    },
    body: JSON.stringify(data)

  })
  if (res.ok) {
    revalidateTag('discounts')
    const discount: Discount = await res.json()
    return { discount }
  }
  const error: ErrorResponse = await res.json()
  return { error }
}

interface GetDiscountOptions {
  limit?: number;
  page?: number;
  orderBy?: string;
  isActive?: boolean
}

interface DiscountsData {
  discounts: Discount[];
  metadata: { _count: number }
}

interface DiscountsResponse {
  discountsData?: DiscountsData
  error?: ErrorResponse
}

export async function getAllDiscounts(options: GetDiscountOptions): Promise<DiscountsResponse> {
  const queryParams = new URLSearchParams();
  let key: keyof GetDiscountOptions;
  for (key in options) {
    const value = options[key];
    if (value) {
      queryParams.set(key, value.toString());
    }
  }

  const res = await fetch(`${BACKEND_URL}/promotions/discounts?${queryParams.toString()}`, {
    method: 'GET',
    next: {
      tags: ['discounts']
    }
  })
  if (res.ok) {
    const discountsData = await res.json()
    return { discountsData }
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

export async function updateDiscount(id: number, data: Partial<CreateDiscountDto>): Promise<OneDiscountResponse> {
  console.log(data)
  const token = cookies().get("access-token")?.value;
  const res = await fetch(`${BACKEND_URL}/promotions/discounts/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`,
    },
    method: 'PATCH',
    body: JSON.stringify(data)
  })
  revalidateTag('discounts')
  revalidateTag('discount-amount')
  if (res.ok) {
    const discount: Discount = await res.json()
    return { discount }
  }
  const error: ErrorResponse = await res.json()
  return { error }

}

export async function deleteDiscount(id: number): Promise<OneDiscountResponse> {
  const token = cookies().get("access-token")?.value;
  const res = await fetch(`${BACKEND_URL}/promotions/discounts/${id}`, {
    headers: {
      Cookie: `access-token=${token}`,
    },
    method: 'DELETE',
  })
  revalidateTag('discounts')
  if (res.ok) {
    const discount: Discount = await res.json()
    return { discount }
  }
  const error: ErrorResponse = await res.json()
  return { error }
}

export async function connectProducts(discountId: number, productIds: number[]) {
  const token = cookies().get("access-token")?.value;
  const res = await fetch(`${BACKEND_URL}/promotions/discounts/${discountId}/products`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`,
    },
    method: 'POST',
    body: JSON.stringify({ productIds })
  })
  revalidatePath('/dashboard/promotions/discounts/edit/[discountId]/', 'page')
  if (res.ok) {
    const discount = await res.json()
    return { discount }
  }
  const error = await res.json()
  return { error }
}

export async function disconnectProducts(discountId: number, productIds: number[]) {

  const token = cookies().get("access-token")?.value;
  const res = await fetch(`${BACKEND_URL}/promotions/discounts/${discountId}/products`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`,
    },
    method: 'DELETE',
    body: JSON.stringify({ productIds })
  })
  revalidatePath('/dashboard/promotions/discounts/edit/[discountId]/', 'page')
  if (res.ok) {
    const discount = await res.json()
    return { discount }
  }
  const error = await res.json()
  return { error }
}

export async function connectCategories(discountId: number, categoryIds: number[]): Promise<OneDiscountResponse> {
  const token = cookies().get("access-token")?.value;
  const res = await fetch(`${BACKEND_URL}/promotions/discounts/${discountId}/categories`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`,
    },
    method: 'POST',
    body: JSON.stringify({ categoryIds })
  })
  revalidatePath('/dashboard/promotions/discounts/edit/[discountId]/', 'page')
  if (res.ok) {
    const discount = await res.json()
    return { discount }
  }
  const error = await res.json()
  return { error }
}

export async function disconnectCategories(discountId: number, categoryIds: number[]): Promise<OneDiscountResponse> {
  const token = cookies().get("access-token")?.value;
  const res = await fetch(`${BACKEND_URL}/promotions/discounts/${discountId}/categories`, {
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`,
    },
    method: 'DELETE',
    body: JSON.stringify({ categoryIds })
  })
  revalidatePath('/dashboard/promotions/discounts/edit/[discountId]/', 'page')
  if (res.ok) {
    const discount = await res.json()
    return { discount }
  }
  const error = await res.json()
  return error
}
