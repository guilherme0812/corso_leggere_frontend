export const revalidate = 0

import UserLayoutProvider from "@/app/_components/Providers/UserLayoutProvider";
import { LoginDataType } from "@/app/_types";
import { UserDataType, UserStatusEnum } from "@/app/_types/login";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if ((session?.user as any as UserDataType)?.status == UserStatusEnum.PENDING) {
    return redirect("/pending");
  }

  if (!session) {
    return redirect("/login"); // Redireciona usuário não autenticado
  }

  return <UserLayoutProvider user={session?.user as LoginDataType}>{children}</UserLayoutProvider>;
}

export default AuthenticatedLayout;
