'use server';

import { api } from '../api/client';

export async function searchByName(productName: string) {
  const { data, error } = await api.GET('/search/products', {
    params: {
      query: {
        productName,
      },
    },
  });
  return { data, error };
}
