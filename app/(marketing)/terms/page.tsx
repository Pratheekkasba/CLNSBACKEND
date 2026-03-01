import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | CLNS",
    description: "Terms of Service for CLNS Platform",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#020817] text-white">
            <div className="container mx-auto px-6 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                
                <div className="space-y-6 text-slate-300">
                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the CLNS (Centralised Legal Network Solutions) platform, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily use CLNS platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose</li>
                            <li>Attempt to decompile or reverse engineer any software</li>
                            <li>Remove any copyright or other proprietary notations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
                        <p>
                            You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Privacy Policy</h2>
                        <p>
                            Your use of CLNS is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
                        <p>
                            In no event shall CLNS or its suppliers be liable for any damages arising out of the use or inability to use the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Revisions</h2>
                        <p>
                            CLNS may revise these terms of service at any time without notice. By using this platform you are agreeing to be bound by the then current version of these terms of service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Information</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us through our contact page.
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10">
                    <p className="text-sm text-slate-400">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
