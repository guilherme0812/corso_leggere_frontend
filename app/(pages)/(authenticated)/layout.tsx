import UserLayoutProvider from "@/app/_components/Providers/UserLayoutProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login"); // Redireciona usuário não autenticado
  }

  return <UserLayoutProvider>{children}</UserLayoutProvider>;
}

export default AuthenticatedLayout;
