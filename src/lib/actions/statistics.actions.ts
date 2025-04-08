'use server'

import { ErrorResponse } from "@/interfaces/responses";
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
