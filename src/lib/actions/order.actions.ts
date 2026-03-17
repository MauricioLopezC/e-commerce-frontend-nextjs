'use server';
import { revalidatePath, updateTag } from 'next/cache';
import { components, paths } from '../api/generated/schema';
import { api } from '../api/client';

type QueryParams = paths['/orders']['get']['parameters']['query'];

export async function getAllOrders(params: QueryParams) {
  const { data, error } = await api.GET('/orders', {
    params: {
      query: params,
    },
    next: {
      tags: ['orders'],
    },
  });

  return { data, error };
}

type CreateOrderDto2 = components['schemas']['CreateOrderDto'];

export async function createOrder2(body: CreateOrderDto2) {
  const { data, error, response } = await api.POST('/me/orders', {
    body,
  });
  if (response.ok) {
    updateTag('orders');
    revalidatePath('/products/[productId]', 'page');
    revalidatePath('dashboard/products');
  }
  return { data, error };
}

export async function getMyOrders() {
  const { data, error } = await api.GET('/me/orders');
  return { data, error };
}

type UpdateOrderDto = components['schemas']['UpdateOrderDto'];

export async function updateOrderStatus2(
  orderId: number,
  body: UpdateOrderDto,
) {
  const { data, error, response } = await api.PATCH('/orders/{id}', {
    params: {
      path: { id: orderId },
    },
    body,
  });
  if (response.ok) {
    updateTag('orders');
  }
  return { data, error };
}
