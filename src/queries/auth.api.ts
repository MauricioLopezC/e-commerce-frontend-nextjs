import { BACKEND_URL } from "./constants";

/**
 * if request is made from a server component the request
 * will not include cookies automatically
 * @param {string} cookie - the value of access-token cookie
 */
export async function getProfile(cookie: string) {
  console.log(cookie)
  const res = await fetch(`${BACKEND_URL}/auth/profile`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${cookie}`
    }
  })
  return res
}


