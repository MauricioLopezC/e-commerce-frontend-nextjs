import { cookies } from 'next/headers';

export function getTokenFromCookies(): string {
  return cookies().get('access-token')?.value ?? '';
}
