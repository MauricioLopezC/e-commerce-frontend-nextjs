import { BACKEND_URL } from "./constants";

export async function logIn(email: string, password: string) {
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    })
  })
  console.log(res)
  return res.json()
}

export async function register(firstName: string, lastName: string, email: string, password: string) {
  const res = await fetch(`${BACKEND_URL}/auth/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })
  })
  return res
}

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

export async function getProfileClient() {
  const res = await fetch(`${BACKEND_URL}/auth/profile`, {
    method: 'GET',
    credentials: 'include',
  })
  return res
}

/**
 *This one request will be made from a client component
 */
export async function logOut() {
  const res = await fetch(`${BACKEND_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })
  return res
}

export async function isLoggedIn(): Promise<boolean> {
  const res = await getProfileClient()
  if (res.ok) {
    return true
  }
  return false
}
