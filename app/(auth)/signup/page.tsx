import { Metadata } from "next";
import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
    title: "Create Account | CLNS",
    description: "Join the CLNS network today",
};

export default function SignupPage() {
    return (
        <AuthLayout
            title="Create an account"
            subtitle="Select your role to get started with CLNS"
        >
            <SignupForm />
        </AuthLayout>
    );
}
