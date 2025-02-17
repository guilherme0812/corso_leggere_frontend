import UserLayoutProvider from "@/app/_components/Providers/UserLayoutProvider";
import { ReactNode } from "react";

function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <UserLayoutProvider>{children}</UserLayoutProvider>;
}

export default AuthenticatedLayout;
