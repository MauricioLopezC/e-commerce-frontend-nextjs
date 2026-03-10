import createClient, { Middleware } from 'openapi-fetch';
import { paths } from './generated/schema';
import { cookies } from 'next/headers';
import { BACKEND_URL } from '@/lib/api/constants';

export const api = createClient<paths>({
  baseUrl: BACKEND_URL,
});

const myMiddleware: Middleware = {
  async onRequest({ request }) {
    // set cookie
    const token: string = cookies().get('access-token')?.value ?? '';

    request.headers.set('cookie', `access-token=${token}`);
    return request;
  },
};

api.use(myMiddleware);
