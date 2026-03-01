import { fetchAvailableAdvocates } from "@/app/actions/client";
import { FindLawyerContent } from "@/components/client/find-lawyer-content";

export const dynamic = "force-dynamic";

export default async function FindLawyerPage() {
    const advocates = await fetchAvailableAdvocates();

    return <FindLawyerContent initialAdvocates={advocates} />;
}
