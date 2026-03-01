import { ClientLayout } from "@/components/ui/client-layout";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ClientLayout>{children}</ClientLayout>;
}
