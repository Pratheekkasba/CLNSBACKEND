import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userRole = (req.auth?.user as any)?.role?.toLowerCase();

    const isAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isPublicRoute = nextUrl.pathname === "/" || nextUrl.pathname.startsWith("/(marketing)") || nextUrl.pathname === "/login" || nextUrl.pathname === "/signup";
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

    if (isAuthRoute) {
        return;
    }

    if (isDashboardRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/login", nextUrl));
        }

        // Role-based access control
        if (nextUrl.pathname.startsWith("/dashboard/admin") && userRole !== "admin") {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, nextUrl));
        }
        if (nextUrl.pathname.startsWith("/dashboard/advocate") && userRole !== "advocate") {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, nextUrl));
        }
        if (nextUrl.pathname.startsWith("/dashboard/client") && userRole !== "client") {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, nextUrl));
        }
        if (nextUrl.pathname.startsWith("/dashboard/student") && userRole !== "student") {
            return NextResponse.redirect(new URL(`/dashboard/${userRole}`, nextUrl));
        }
    }

    return;
});

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
