'use server';
import { revalidateTag } from 'next/cache';
import { api } from '../api/client';
import { components, paths } from '../api/generated/schema';

export async function getAllProducts(
  options: paths['/products']['get']['parameters']['query'],
) {
  const { data, error } = await api.GET('/products', {
    params: {
      query: options,
    },
    next: {
      tags: ['products'],
    },
  });
  return { data, error };
}

export async function getProduct(id: number) {
  const { data, error } = await api.GET('/products/{id}', {
    params: { path: { id: id } },
    next: {
      tags: ['product'],
    },
  });

  return { data, error };
}

export async function createProduct(
  body: components['schemas']['CreateProductDto'],
) {
  const { data, error, response } = await api.POST('/products', {
    body,
  });

  if (response.ok) {
    revalidateTag('products');
  }

  return { data, error };
}

export async function updateProduct(
  id: number,
  body: components['schemas']['UpdateProductDto'],
) {
  const { data, error, response } = await api.PATCH('/products/{id}', {
    params: {
      path: { id },
    },
    body,
  });

  if (response.ok) {
    revalidateTag('product');
    revalidateTag('products');
  }

  return { data, error };
}

export async function deleteProduct(id: number) {
  const { data, error, response } = await api.DELETE('/products/{id}', {
    params: {
      path: { id },
    },
  });

  if (response.ok) {
    revalidateTag('products');
  }

  return { data, error };
}

export async function replaceProductCategories2(
  productId: number,
  categoryIds: number[],
) {
  const { data, error, response } = await api.PUT('/products/{id}/categories', {
    params: {
      path: { id: productId },
    },
    body: { categoryIds },
  });

  if (response.ok) {
    revalidateTag('product');
    revalidateTag('products');
  }

  return { data, error };
}
