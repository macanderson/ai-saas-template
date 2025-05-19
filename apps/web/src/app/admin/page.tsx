import { redirect } from "next/navigation";
import { checkRole } from "./../../../../../packages/utils/roles";
import { SearchUsers } from "./components/SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./_actions";
import Layout from './../../components/Layout';
import { User } from "@clerk/nextjs/server";

export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!(await checkRole("admin"))) {
    redirect("/");
  }

  const query = params.searchParams.search;
  const users = query ? await clerkClient.users.getUserList({ query }) : [];

  return (
    <Layout>
      <h2 className="mb-4 text-xl">Admin Dashboard</h2>
      <p className="mb-4">
        This is the protected admin dashboard restricted to users with the
        `admin` role.
      </p>

      <SearchUsers />

      <div className="space-y-4">
        {users.map((user: User) => (
          <div key={user.id} className="rounded-lg border p-4">
            <div className="font-medium">
              {user.firstName} {user.lastName}
            </div>

            <div className="text-gray-600">
              {user.emailAddresses.find(
                (email) => email.id === user.primaryEmailAddressId
              )?.emailAddress}
            </div>

            <div className="mb-2 text-sm text-gray-500">
              Role: {user.publicMetadata.role as string}
            </div>

            <div className="space-x-2">
              <form action={setRole} className="inline">
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button 
                  type="submit"
                  className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                >
                  Make Admin
                </button>
              </form>

              <form action={setRole} className="inline">
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <button 
                  type="submit"
                  className="rounded bg-green-500 px-3 py-1 text-sm text-white hover:bg-green-600"
                >
                  Make Moderator
                </button>
              </form>

              <form action={removeRole} className="inline">
                <input type="hidden" value={user.id} name="userId" />
                <button 
                  type="submit"
                  className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  Remove Role
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
