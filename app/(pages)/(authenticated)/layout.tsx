import UserLayoutProvider from "@/app/_components/Providers/UserLayoutProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { handler as authOptions } from "@/app/_utils/auth";

async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login"); // Redireciona usuário não autenticado
  }

  return <UserLayoutProvider>{children}</UserLayoutProvider>;
}

export default AuthenticatedLayout;
