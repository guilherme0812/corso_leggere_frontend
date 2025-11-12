import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PendingCard from "./_components/PendingCard";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login"); // Redireciona usuário não autenticado
  }

  return (
    <div className="p-8 h-[100vh] w-full flex items-center">
      <PendingCard />
    </div>
  );
}

export default Page;
