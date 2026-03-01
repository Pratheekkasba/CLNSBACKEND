import { fetchClientCases } from "@/app/actions/client";
import { ClientCaseList } from "@/components/client/client-case-list";

export default async function MyCasesPage() {
    const cases = await fetchClientCases();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">My Cases</h2>
                    <p className="text-slate-400">Track the live status of your legal proceedings.</p>
                </div>
                {/* New Case button could be a link or modal trigger */}
            </div>

            <ClientCaseList initialCases={cases} />
        </div>
    );
}
