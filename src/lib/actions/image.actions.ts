'use server';
import { revalidateTag } from 'next/cache';
import { api } from '../api/client';

export async function uploadImage(formData: FormData) {
  console.log(formData);
  const file = formData.get('file') as File;
  const productId = Number(formData.get('productId'));
  const productSkuId = Number(formData.get('productSkuId'));

  const { data, error, response } = await api.POST('/images', {
    body: {
      productId: productId,
      productSkuId: productSkuId,
    },
    bodySerializer: (body) => {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('productId', body.productId.toString());
      fd.append('productSkuId', body.productSkuId.toString());
      return fd;
    },
  });
  if (response.ok) {
    revalidateTag('product');
  }
  return { data, error };
}

export async function deleteImage(imageId: number) {
  const { data, error, response } = await api.DELETE('/images/{id}', {
    params: {
      path: { id: imageId },
    },
  });

  if (response.ok) {
    revalidateTag('product');
  }

  return { data, error };
}
