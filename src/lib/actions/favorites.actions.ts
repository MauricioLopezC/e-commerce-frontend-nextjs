'use server'
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/queries/constants"
import { getPayload } from "../jwt-decode"
import { Favorite } from "@/interfaces/favorites"
import { revalidatePath } from "next/cache"

interface FavoritesResponse {
  favorites?: Favorite[];
  error?: any
}

export async function getFavorites(): Promise<FavoritesResponse> {
  const token = cookies().get('access-token')?.value
  if (!token) return { error: { message: 'user not logged in' } }
  const user = getPayload(token)

  const res = await fetch(`${BACKEND_URL}/users/${user?.id}/favorites`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    }
  })

  if (res.ok) {
    const data = await res.json()
    return {
      favorites: data
    }
  }

  const error = res.json()
  return {
    error
  }
}

interface CreateOrDeleteFavoriteResponse {
  favorite?: Favorite;
  error?: any
}

export async function addFavorite(productId: number): Promise<CreateOrDeleteFavoriteResponse> {
  const token = cookies().get('access-token')?.value
  const user = getPayload(token ?? '')

  console.log('SERVER ACTION', productId)
  console.log('SERVER ACTION', typeof productId)

  const res = await fetch(`${BACKEND_URL}/users/${user?.id}/favorites`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify({ productId })
  })

  revalidatePath('/favorites')
  if (res.ok) {
    const data = await res.json()
    return {
      favorite: data
    }
  }

  const error = await res.json()
  return {
    error
  }
}

export async function deleteFavorite(favoriteId: number) {
  const token = cookies().get('access-token')?.value
  const user = getPayload(token ?? '')

  const res = await fetch(`${BACKEND_URL}/users/${user?.id}/favorites/${favoriteId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    },
  })
  revalidatePath('/favorites')
  if (res.ok) {
    const data = await res.json()
    return {
      favorite: data
    }
  }
  const error = res.json()
  return {
    error
  }
}


