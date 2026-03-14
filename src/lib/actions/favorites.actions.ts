'use server';
import { revalidatePath } from 'next/cache';
import { api } from '../api/client';
import { paths } from '../api/generated/schema';

type QueryParams = paths['/me/favorites']['get']['parameters']['query'];

export async function getFavorites(params: QueryParams) {
  const { data, error } = await api.GET('/me/favorites', {
    params: {
      query: params,
    },
  });

  return { data, error };
}

export async function addFavorite(productId: number) {
  const { data, error, response } = await api.POST('/me/favorites', {
    body: { productId },
  });

  if (response.ok) {
    revalidatePath('/favorites');
  }

  return { data, error };
}

export async function deleteFavorite(favoriteId: number) {
  const { data, error, response } = await api.DELETE('/me/favorites/{id}', {
    params: {
      path: { id: favoriteId },
    },
  });

  if (response.ok) {
    revalidatePath('/favorites');
  }

  return { data, error };
}
