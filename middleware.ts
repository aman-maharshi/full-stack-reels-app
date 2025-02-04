import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {},
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // public routes - auth related
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true
        }

        // public routes
        if (
          pathname === "/" ||
          pathname.startsWith("/api/videos")
        ) {
          return true
        }

        // private routes ( token required )

        return !!token // return true if token is present
      }
    }
  }
)

// paths where middleware should run
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).)*$"],  
}
