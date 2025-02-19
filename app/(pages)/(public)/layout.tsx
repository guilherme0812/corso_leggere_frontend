import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { handler as authOptions } from "@/app/_utils/auth";

async function PublicLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect("/painel");
  }

  return <>{children}</>;
}

export default PublicLayout;
