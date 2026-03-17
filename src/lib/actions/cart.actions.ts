'use server';
import { updateTag } from 'next/cache';
import { api } from '../api/client';
import { components } from '../api/generated/schema';

export async function getCart() {
  const { data, error } = await api.GET('/me/cart', {
    next: {
      tags: ['cart'],
    },
  });

  return { data, error };
}

export async function addCartItem(
  productId: number,
  productSkuId: number,
  quantity: number,
) {
  const { data, error, response } = await api.POST('/me/cart-items', {
    body: {
      productId,
      productSkuId,
      quantity,
    },
  });

  if (response.ok) {
    updateTag('cart-items');
  }

  return { data, error };
}

export async function getCartItems() {
  const { data, error } = await api.GET('/me/cart-items', {
    next: {
      tags: ['cart-items'],
    },
  });
  return { data, error };
}

export async function updateCartItemQuantity(
  quantity: number,
  cartItemId: number,
) {
  const { data, error, response } = await api.PATCH('/me/cart-items/{id}', {
    params: {
      path: { id: cartItemId },
    },
    body: {
      quantity,
    },
  });

  if (response.ok) {
    updateTag('discount-amount');
    updateTag('cart-items');
    updateTag('cart');
  }
  return { data, error };
}

export async function deleteCartItem(id: number) {
  const { data, error, response } = await api.DELETE('/me/cart-items/{id}', {
    params: {
      path: {
        id,
      },
    },
  });
  if (response.ok) {
    updateTag('discount-amount');
    updateTag('cart-items');
    updateTag('cart');
  }
  return { data, error };
}

export type CalcDiscountsData =
  components['schemas']['CalculateDiscountsResponseDto'];

export async function calculateDiscounts2() {
  const { data, error } = await api.GET('/me/cart/total-discount', {
    next: {
      tags: ['discount-amount'],
    },
  });
  return { data, error };
}
