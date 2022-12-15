import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppLayout from "../components/AppLayout";
import EntriesGroupedByDate from "../components/EntriesGroupedByDate";
import NewEntryForm from "../components/NewEntryForm";
import { getManyEntry } from "../services/entry.service";

export default async function IndexPage() {
  const session = await unstable_getServerSession();

  if (!session?.user?.email) return redirect("/login");

  const entries = await getManyEntry({
    page: 1,
    limit: 30,
    userEmail: session.user.email,
    orderBy: "desc",
  });

  return (
    <AppLayout>
      <div className="mb-24 flex flex-col p-4 gap-4">
        <NewEntryForm />
        <EntriesGroupedByDate entries={entries} />
      </div>
    </AppLayout>
  );
}
