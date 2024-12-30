import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { getPayload } from "./lib/jwt-decode";

const publicRoutes = ["/", "/products", "/search", "/about"]
const authRoutes = ["/auth/login", "auth/register"]


export default async function middleware(req: NextRequest) {
  const token = cookies().get('access-token')?.value
  const { nextUrl } = req
  const userSession = getPayload(token ?? '')
  const path = req.nextUrl.pathname

  if (publicRoutes.includes(path) || path.startsWith('/products/')) {
    return NextResponse.next()
  }
  if (!userSession && path === '/auth/register') return NextResponse.next()
  if (!userSession && path === '/auth/login') return NextResponse.next()

  if (userSession?.role !== 'ADMIN' && path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  if (
    !userSession &&
    !authRoutes.includes(path) &&
    !publicRoutes.includes(path)
  ) {
    return NextResponse.redirect(new URL(`/auth/login?redirect=${path}`, nextUrl))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
