import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterPageForm from "./RegisterPageForm";

export default async function RegisterPage() {
  const session = await unstable_getServerSession();

  if (session) return redirect("/");

  if (!session)
    return (
      <div className="p-4 pt-24 flex flex-col items-center">
        <RegisterPageForm />
      </div>
    );

  return (
    <div className="flex items-center justify-center text-center">
      <p>Loading...</p>
    </div>
  );
}
