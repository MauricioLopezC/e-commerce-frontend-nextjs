interface UserPayload {
  id: number,
  email: string,
  role: string,
  iat: number,
  exp: number
}

export function getPayload(token: string): UserPayload | null {
  try {
    const arrayToken = token.split('.')
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    return tokenPayload
  } catch (error) {
    return null
  }
}

export function isTokenExpired(token: string) {
  const arrayToken = token.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.sub;
}
