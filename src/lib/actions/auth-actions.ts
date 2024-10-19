'use server'
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
export async function logOut() {
  const cookieStore = cookies()
  const token = cookieStore.delete('access-token')
  revalidatePath('/profile')
}
