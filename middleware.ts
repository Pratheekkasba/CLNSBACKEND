import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const userRole = (req.auth?.user as any)?.role?.toLowerCase();

    const isAuthRoute = nextUrl.pathname.startsWith("/api/auth");
    const isAdminRoute = nextUrl.pathname.startsWith("/dashboard/admin");
    const isMaintenanceApi = nextUrl.pathname.startsWith("/api/admin/maintenance");
    const isPublicRoute =
        nextUrl.pathname === "/" ||
        nextUrl.pathname.startsWith("/(marketing)") ||
        nextUrl.pathname === "/login" ||
        nextUrl.pathname === "/signup" ||
        nextUrl.pathname.startsWith("/affiliation") ||
        nextUrl.pathname.startsWith("/services") ||
        nextUrl.pathname.startsWith("/about") ||
        nextUrl.pathname.startsWith("/contact") ||
        nextUrl.pathname.startsWith("/careers");
    const isDashboardRoute = nextUrl.pathname.startsWith("/dashboard");

    // Always allow API auth routes and the maintenance API itself
    if (isAuthRoute || isMaintenanceApi) {
        return;
    }

    // Check maintenance mode — allow admin to always pass
    if (!isAdminRoute && userRole !== "admin") {
        try {
            const maintenanceRes = await fetch(
                new URL("/api/admin/maintenance", nextUrl).toString()
            );
            const { maintenanceMode } = await maintenanceRes.json();

            if (maintenanceMode) {
                // Redirect everyone (logged in or not) to home page during maintenance
                if (!isPublicRoute || nextUrl.pathname === "/login" || nextUrl.pathname === "/signup") {
                    return NextResponse.redirect(new URL("/", nextUrl));
                }
            }
        } catch {
            // If check fails, let through (fail-open to avoid blocking real traffic)
        }
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
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
