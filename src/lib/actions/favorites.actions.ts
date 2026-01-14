'use server'
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/queries/constants"
import { getPayload } from "../jwt-decode"
import { Favorite } from "@/interfaces/favorites"
import { revalidatePath } from "next/cache"
import { ErrorResponse } from "@/interfaces/responses";

interface FavoritesData {
  favorites: Favorite[];
  metadata: { _count: number };
}

interface FavoritesResponse {
  favoritesData?: FavoritesData;
  error?: ErrorResponse
}

interface GetFavoritesOptions {
  limit?: number;
  page?: number;
  productId?: number;
}

export async function getFavorites(options: GetFavoritesOptions): Promise<FavoritesResponse> {
  const token = cookies().get('access-token')?.value ?? ''

  const queryParams = new URLSearchParams()
  let key: keyof GetFavoritesOptions
  for (key in options) {
    const value = options[key]
    if (value) {
      queryParams.set(key, value.toString())
    }
  }

  const res = await fetch(`${BACKEND_URL}/me/favorites?${queryParams.toString()}`, {
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

  const error = await res.json()
  return {
    error
  }
}


interface CreateOrDeleteFavoriteResponse {
  favorite?: Favorite;
  error?: ErrorResponse
}

export async function addFavorite(productId: number): Promise<CreateOrDeleteFavoriteResponse> {
  const token = cookies().get('access-token')?.value ?? ''

  const res = await fetch(`${BACKEND_URL}/me/favorites`, {
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
  const token = cookies().get('access-token')?.value ?? ''

  const res = await fetch(`${BACKEND_URL}/me/favorites/${favoriteId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    },
  })
  revalidatePath('/favorites')
  if (res.ok) {
    const favorite = await res.json()
    return {
      favorite
    }
  }
  const error = res.json()
  return {
    error
  }
}


