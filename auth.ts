import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { z } from "zod"; // Assuming Zod is available or we use basic validation
import { db } from "@/lib/db";
import { authConfig } from "./auth.config";

async function getUser(email: string) {
    try {
        const user = await db.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;

                    if (user.status === "REJECTED" || user.status === "SUSPENDED") {
                        console.warn(`Blocked login attempt for ${email} with status ${user.status}`);
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (passwordsMatch) {
                        try {
                            await db.systemLog.create({
                                data: {
                                    action: "USER_LOGIN",
                                    description: `User verified login: ${email}`,
                                    userId: user.id
                                }
                            });
                        } catch (e) {
                            console.error("Failed to log login", e)
                        }
                        return user;
                    }
                }
                console.log("Invalid credentials");
                return null;
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        ...authConfig.callbacks,
        async signIn({ user, account, profile }) {
            // Handle Google OAuth sign in
            if (account?.provider === "google" && user.email) {
                try {
                    // Check if user exists with this email
                    const existingUser = await db.user.findUnique({
                        where: { email: user.email }
                    });

                    if (existingUser) {
                        // Link Google account to existing user
                        if (existingUser.status === "REJECTED" || existingUser.status === "SUSPENDED") {
                            return false; // Block sign in
                        }
                        return true;
                    } else {
                        // Create new user from Google account
                        const newUser = await db.user.create({
                            data: {
                                email: user.email,
                                name: user.name || (profile as any)?.name || "User",
                                password: await bcrypt.hash(Math.random().toString(36), 10),
                                role: "PROSPECT",
                                status: "ACTIVE",
                            }
                        });

                        await db.systemLog.create({
                            data: {
                                action: "USER_REGISTERED",
                                description: `New user registered via Google: ${user.email}`,
                                userId: newUser.id
                            }
                        });
                    }
                } catch (error) {
                    console.error("Error in Google sign in:", error);
                    return false;
                }
            }
            return true;
        },
    },
});
