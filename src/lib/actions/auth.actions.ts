'use server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { api } from '../api/client';

export async function logOut() {
  const cookieStore = await cookies();
  cookieStore.delete('access-token');
  revalidatePath('/profile');
}

export async function login(email: string, password: string) {
  const { data, error } = await api.POST('/auth/login', {
    body: { email, password },
  });

  if (data) {
    const cookieStore = await cookies();
    cookieStore.set('access-token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    revalidatePath('/', 'layout');
  }
  return { data, error };
}

export async function getUserById(userId: number) {
  const { data, error } = await api.GET('/users/{id}', {
    params: {
      path: { id: userId },
    },
  });

  return { data, error };
}

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const { data, error } = await api.POST('/auth/register', {
    body: {
      firstName,
      lastName,
      email,
      password,
    },
  });

  return { data, error };
}
