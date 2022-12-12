import { unstable_getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginPageForm from "./LoginPageForm";

export default async function LoginPage() {
  const session = await unstable_getServerSession();

  if (session) return redirect("/");

  if (!session)
    return (
      <div className="p-4 pt-24 flex flex-col items-center">
        <LoginPageForm />
      </div>
    );

  return (
    <div className="flex items-center justify-center text-center">
      <p>Loading...</p>
    </div>
  );
}
