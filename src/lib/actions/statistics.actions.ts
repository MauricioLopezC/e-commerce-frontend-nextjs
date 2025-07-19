'use server'
import { ErrorResponse } from "@/interfaces/responses";
import { SalesByCategory, TotalSalesByMonth } from "@/interfaces/statistics";
import { BACKEND_URL } from "@/queries/constants";
import { cookies } from "next/headers";


interface SalesByUser {
  _count: number,
  userId: number,
  userName: string,
  _sum: {
    finalTotal: number
  }
}

interface SalesByUserResponse {
  data?: SalesByUser[]
  error?: ErrorResponse
}

interface SalesByMonthResponse {
  data?: TotalSalesByMonth[]
  error?: ErrorResponse
}

export async function salesByMonth(startDate: Date, endDate: Date): Promise<SalesByMonthResponse> {
  const token = cookies().get("access-token")?.value;
  const res = await fetch(`${BACKEND_URL}/statistics/sales/monthly?startDate=${startDate}&endDate=${endDate}`, {
    method: 'GET',
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
  })
  if (res.ok) {
    const data = await res.json()
    return { data }
  }
  const error = await res.json()
  return { error }
}

export async function salesByUser(): Promise<SalesByUserResponse> {
  const token = cookies().get("access-token")?.value;

  const res = await fetch(`${BACKEND_URL}/statistics/sales/by-user`, {
    method: 'GET',
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
  })
  if (res.ok) {
    const data = await res.json()
    return { data }
  }
  const error = await res.json()
  return { error }
}

interface SalesByCategoryResponse {
  data?: SalesByCategory[]
  error?: ErrorResponse
}

export async function salesByCategory(startDate: Date, endDate: Date): Promise<SalesByCategoryResponse> {
  const token = cookies().get("access-token")?.value;

  const res = await fetch(`${BACKEND_URL}/statistics/sales/by-category?startDate=${startDate}&endDate=${endDate}`, {
    method: 'GET',
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
  })
  if (res.ok) {
    const data = await res.json()
    return { data }
  }
  const error = await res.json()
  return { error }
}
