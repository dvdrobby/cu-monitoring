import NextAuth from "next-auth"

import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig)
import {
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  apiPrefix,
  authRoutes,
  adminRoutes,
  superuserRoutes
} from "@/routes"
import { auth as getSession } from "@/auth"

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const session = await getSession();
  const isAdmin = session?.user.role == "ADMIN";
  const isSuperuser = session?.user.role == "SUPERUSER" | session?.user.role == "ADMIN";

  const isApiRoute = nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);
  const isSuperuserRoute = superuserRoutes.includes(nextUrl.pathname);
  
  if(isApiRoute) {
    return null
  }

  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return null
  }

  if(!isAdmin && isAdminRoute){
    return Response.redirect(new URL("/", nextUrl))
  }

  if(!isSuperuser && isSuperuserRoute){
    return Response.redirect(new URL("/", nextUrl))
  }

  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL("/login", nextUrl))
  }


})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}