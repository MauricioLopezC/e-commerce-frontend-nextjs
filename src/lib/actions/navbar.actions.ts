'use server'
import { cookies } from "next/headers"
import { getPayload } from "../jwt-decode"
export async function checkSession(): Promise<boolean> {
  const cookieStore = cookies()
  const token = cookieStore.get('access-token')
  if (!token) return false
  return true
}

export async function isAdminAction(): Promise<boolean> {
  const cookieStore = cookies()
  const token = cookieStore.get('access-token')
  if (!token) return false
  const user = getPayload(token?.value ?? '')
  if (user.role !== 'ADMIN') return false
  return true
}
