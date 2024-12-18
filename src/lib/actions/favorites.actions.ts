'use server'
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/queries/constants"
import { getPayload } from "../jwt-decode"
import { Favorite } from "@/interfaces/favorites"
import { revalidatePath } from "next/cache"

interface FavoritesData {
  favorites: Favorite[];
  aggregate: { _count: number };
}

interface FavoritesResponse {
  favoritesData?: FavoritesData;
  error?: any
}

interface GetFavoritesOptions {
  limit?: number;
  page?: number;
  productId?: number;
}

export async function getFavorites(options: GetFavoritesOptions): Promise<FavoritesResponse> {
  const token = cookies().get('access-token')?.value
  if (!token) return { error: { message: 'user not logged in' } }
  const user = getPayload(token)

  const queryParams = new URLSearchParams()
  let key: keyof GetFavoritesOptions
  for (key in options) {
    const value = options[key]
    if (value) {
      queryParams.set(key, value.toString())
    }
  }

  const res = await fetch(`${BACKEND_URL}/users/${user?.id}/favorites?${queryParams.toString()}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    }
  })

  if (res.ok) {
    const favoritesData = await res.json()
    return {
      favoritesData
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


