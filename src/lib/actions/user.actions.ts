'use server';
import { revalidatePath } from 'next/cache';
import { User } from '@/interfaces/users';
import { paths } from '../api/generated/schema';
import { api } from '../api/client';

export interface UsersData {
  users: User[];
  metadata: { _count: number };
}

export async function getUsers(
  options: paths['/users']['get']['parameters']['query'],
) {
  const { data, error } = await api.GET('/users', {
    params: {
      query: options,
    },
  });

  return { data, error };
}

export async function deleteUser(userId: number) {
  const { data, error, response } = await api.DELETE('/users/{id}', {
    params: {
      path: { id: userId },
    },
  });

  if (response.ok) {
    revalidatePath('/dashboard/users');
  }

  return { data, error };
}

export async function banUser(userId: number) {
  const { data, error, response } = await api.PATCH('/users/{id}/ban', {
    params: {
      path: {
        id: userId,
      },
    },
  });

  if (response.ok) {
    revalidatePath('/dashboard/users');
  }

  return { data, error };
}

export async function unBanUser(userId: number) {
  const { data, error, response } = await api.PATCH('/users/{id}/unban', {
    params: {
      path: {
        id: userId,
      },
    },
  });

  if (response.ok) {
    revalidatePath('/dashboard/users');
  }

  return { data, error };
}
