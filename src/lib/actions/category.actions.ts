'use server';
import { revalidateTag } from 'next/cache';
import { api } from '../api/client';
import { components } from '../api/generated/schema';

export async function getAllCategories() {
  const { data, error } = await api.GET('/categories', {
    next: {
      tags: ['categories'],
    },
  });
  return { data, error };
}

type CreateCategoryDto = components['schemas']['CreateCategoryDto'];

export async function createCategory2(createCategoryDto: CreateCategoryDto) {
  const { data, error, response } = await api.POST('/categories', {
    body: createCategoryDto,
  });

  if (response.ok) {
    revalidateTag('categories');
  }
  return { data, error };
}
