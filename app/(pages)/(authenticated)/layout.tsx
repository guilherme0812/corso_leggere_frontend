import UserLayoutProvider from "@/app/_components/Providers/UserLayoutProvider";
import { LEGGERE_TOKEN_KEY } from "@/app/_services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const token = cookies().get(LEGGERE_TOKEN_KEY)?.value;

  if (!token) {
    redirect("/login");
  }
  return <UserLayoutProvider>{children}</UserLayoutProvider>;
}

export default AuthenticatedLayout;
