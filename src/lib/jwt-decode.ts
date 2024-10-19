interface User {
  id: number,
  email: string,
  role: string,
  iat: number,
  exp: number
}

export function getPayload(token: string): User {
  const arrayToken = token.split('.')
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return tokenPayload
}

export function isTokenExpired(token: string) {
  const arrayToken = token.split('.');
  const tokenPayload = JSON.parse(atob(arrayToken[1]));
  return Math.floor(new Date().getTime() / 1000) >= tokenPayload?.sub;
}
