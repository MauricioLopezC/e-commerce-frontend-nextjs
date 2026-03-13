'use server';
import { api } from '../api/client';

export async function salesByMonth(startDate: Date, endDate: Date) {
  const { data, error } = await api.GET('/statistics/sales/monthly', {
    params: {
      query: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    },
  });

  return { data, error };
}

export async function salesByUser(startDate: Date, endDate: Date) {
  const { data, error } = await api.GET('/statistics/sales/by-user', {
    params: {
      query: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    },
  });

  return { data, error };
}

export async function salesByCategory(startDate: Date, endDate: Date) {
  const { data, error } = await api.GET('/statistics/sales/by-category', {
    params: {
      query: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    },
  });

  return { data, error };
}

export async function salesByProduct(startDate: Date, endDate: Date) {
  const { data, error } = await api.GET('/statistics/sales/by-product', {
    params: {
      query: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
    },
  });

  return { data, error };
}
