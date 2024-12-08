'use server'
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/queries/constants"
import { revalidatePath } from "next/cache"
import { User } from "@/interfaces/users";

interface ErrorResponse {
  ok: boolean;
  message: string;
}

export interface UsersData {
  users: User[];
  aggregate: { _count: number }
}

interface UsersResponse {
  usersData?: UsersData;
  error?: ErrorResponse;
}

//NOTE: better approach to handle api responses
export async function getUsers(limit: number = 10, page: number = 1): Promise<UsersResponse> {
  const token = cookies().get('access-token')?.value

  const res = await fetch(`${BACKEND_URL}/users?limit=${limit}&page=${page}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    },
  })
  console.log(res)
  if (res.ok) {
    console.log("OK")

    const data = await res.json()
    return {
      usersData: data
    }
  }

  if (res.status === 401) {
    return {
      error: {
        ok: false,
        message: "No autorizado"
      }
    }
  }
  return {
    error: {
      ok: false,
      message: "Error al traer los usuarios"
    }
  }
}

export async function deleteUser(userId: number) {
  const token = cookies().get('access-token')?.value
  console.log("USERID ===> ", userId)

  const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    },
  })

  revalidatePath('/dashboard/users')
  if (res.ok) {
    const data = await res.json()
    return {
      user: data
    }
  }

  const error = await res.json()
  return {
    error
  }
}
