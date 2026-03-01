import { fetchUsers } from "@/app/actions/admin";
import { UserTable } from "@/components/admin/user-table";

export const dynamic = "force-dynamic";

export default async function UserManagementPage() {
    const users = await fetchUsers();

    return (
        <UserTable users={users} />
    );
}
