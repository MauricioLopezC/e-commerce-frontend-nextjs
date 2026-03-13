'use server';

import { revalidateTag } from 'next/cache';
import { api } from '../api/client';
import { components, paths } from '../api/generated/schema';

type CreateDiscountDto = components['schemas']['CreateDiscountDto'];

export async function createDiscount(body: CreateDiscountDto) {
  const { data, error, response } = await api.POST('/promotions/discounts', {
    body,
  });
  if (response.ok) {
    revalidateTag('discounts');
  }

  return { data, error };
}

type QueryParams = paths['/promotions/discounts']['get']['parameters']['query'];

export async function getAllDiscounts(options: QueryParams) {
  const { data, error } = await api.GET('/promotions/discounts', {
    params: {
      query: options,
    },
  });
  return { data, error };
}

export async function getOneDiscount(id: number) {
  const { data, error } = await api.GET('/promotions/discounts/{id}', {
    params: {
      path: { id },
    },
  });
  return { data, error };
}

export async function updateDiscount(
  id: number,
  body: components['schemas']['UpdateDiscountDto'],
) {
  const { data, error, response } = await api.PATCH(
    '/promotions/discounts/{id}',
    {
      params: {
        path: { id },
      },
      body,
    },
  );

  if (response.ok) {
    revalidateTag('discounts');
    revalidateTag('discount-amount');
  }

  return { data, error };
}

export async function deleteDiscount(id: number) {
  const { data, error, response } = await api.DELETE(
    '/promotions/discounts/{id}',
    {
      params: {
        path: { id },
      },
    },
  );

  if (response.ok) {
    revalidateTag('discounts');
  }

  return { data, error };
}
