import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                // Redirect authenticated users to their specific dashboard if they visit login/home
                const role = (auth.user as any).role;
                // Prevent redirect loop if already on correct dashboard
                if (!nextUrl.pathname.startsWith(`/dashboard/${role.toLowerCase()}`)) {
                    // This logic is handled better in middleware matcher or client-side, 
                    // but we can return Response.redirect here if needed.
                    // For now, we trust the middleware to handle role-based access.
                }
            }
            return true;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (token && session.user) {
                session.user.role = token.role;
                session.user.id = token.id;
                
                // Fetch fresh user data from database to ensure name, email, and image are up-to-date
                if (token.id) {
                    try {
                        const { db } = await import("@/lib/db");
                        const user = await db.user.findUnique({
                            where: { id: token.id },
                            select: {
                                name: true,
                                email: true,
                                role: true,
                                imageUrl: true,
                            }
                        });
                        if (user) {
                            session.user.name = user.name;
                            session.user.email = user.email;
                            session.user.role = user.role;
                            session.user.image = user.imageUrl || undefined;
                        }
                    } catch (error: any) {
                        // Silently fail if database access is not available (e.g., during build)
                        // Fallback to token data
                        if (process.env.NODE_ENV === 'development' && error?.message?.includes('headers') === false) {
                            console.error("Failed to fetch user data for session:", error);
                        }
                    }
                }
            }
            return session;
        },
    },
    providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
