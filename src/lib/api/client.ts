import createClient, { Middleware } from 'openapi-fetch';
import { paths } from './generated/schema';
import { cookies } from 'next/headers';
import { BACKEND_URL } from '@/lib/api/constants';
import { redirect } from 'next/navigation';

export const api = createClient<paths>({
  baseUrl: BACKEND_URL,
});

const myMiddleware: Middleware = {
  async onRequest({ request }) {
    //get token from cookie
    const cookieStore = await cookies();
    const token: string = cookieStore.get('access-token')?.value ?? '';

    request.headers.set('Authorization', `Bearer ${token}`);
    return request;
  },
  async onResponse({ response }) {
    if (response.status === 429) {
      const retryAfterHeader = response.headers.get('Retry-After');
      const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : 60;
      redirect(`/rate-limit?retryAfter=${retryAfter}`);
    }

    if (response.status === 401) {
      const cookieStore = await cookies();
      cookieStore.delete('access-token');
      redirect('/auth/login?error=session_expired');
    }

    return response;
  },
};

api.use(myMiddleware);
