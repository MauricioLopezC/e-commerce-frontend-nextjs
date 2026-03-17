'use server';
import { updateTag } from 'next/cache';
import { components } from '../api/generated/schema';
import { api } from '../api/client';

type CreateProductSkuDto2 = components['schemas']['CreateProductSkusDto'];

export async function createProductSku(
  productId: number,
  body: CreateProductSkuDto2,
) {
  const { data, error, response } = await api.POST(
    '/products/{productId}/product-skus',
    {
      params: {
        path: { productId },
      },
      body,
    },
  );

  if (response.ok) updateTag('productSkus');
  return { data, error };
}

export async function createBatchProductSkus(
  productId: number,
  body: components['schemas']['CreateBatchProductSkusDto'],
) {
  const { data, error, response } = await api.POST(
    '/products/{productId}/product-skus/batch',
    {
      params: {
        path: { productId },
      },
      body,
    },
  );

  if (response.ok) updateTag('productSkus');
  return { data, error };
}

export async function getAllProductsSkus(productId: number) {
  const { data, error } = await api.GET('/products/{productId}/product-skus', {
    params: {
      path: { productId },
    },
    next: {
      tags: ['productSkus'],
    },
  });

  return { data, error };
}

export async function updateProductSku2(
  productId: number,
  productSkuId: number,
  body: components['schemas']['UpdateProductSkusDto'],
) {
  const { data, error, response } = await api.PATCH(
    '/products/{productId}/product-skus/{id}',
    {
      params: {
        path: {
          productId,
          id: productSkuId,
        },
      },
      body,
    },
  );
  if (response.ok) updateTag('productSkus');

  return { data, error };
}

export async function deleteProductSku2(
  productId: number,
  productSkuId: number,
) {
  const { data, error, response } = await api.DELETE(
    '/products/{productId}/product-skus/{id}',
    {
      params: {
        path: {
          productId,
          id: productSkuId,
        },
      },
    },
  );

  if (response.ok) updateTag('productSkus');

  return { data, error };
}
