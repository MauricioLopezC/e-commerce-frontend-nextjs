'use server'
import { BACKEND_URL } from "@/queries/constants"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { getPayload } from "../jwt-decode"
import { User } from "@/interfaces/users"
import { ClassValidatorResponse, UnauthorizedResponse } from "@/interfaces/responses"

export async function logOut() {
  const cookieStore = cookies()
  cookieStore.delete('access-token')
  revalidatePath('/profile')
}


// interface LoginSuccess {
//   access_token: string;
// }

interface LoginResponse {
  access_token?: string;
  error?: UnauthorizedResponse | ClassValidatorResponse;
}


export async function logIn(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  if (res.ok) {
    const data = await res.json()
    const cookieStore = cookies()
    cookieStore.set('access-token', data.access_token)
    revalidatePath('/', 'layout')
    return {
      access_token: data,
      error: undefined
    }
  }
  const data = await res.json()
  return {
    error: data,
  }
}


interface UserResponse {
  user?: User;
  error?: any
}

/**
 *Only andmin
 */
export async function getUserById(): Promise<UserResponse> {
  //TODO: fix error
  const token = cookies().get('access-token')?.value
  const user = getPayload(token ?? '')

  const res = await fetch(`${BACKEND_URL}/users/${user?.id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    }
  })
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

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string
): Promise<UserResponse> {

  const res = await fetch(`${BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })
  })

  if (res.ok) {
    const user = await res.json()
    return {
      user
    }
  }
  const error = await res.json()
  return {
    error
  }
}
