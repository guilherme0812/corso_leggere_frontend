import PrimaryLayout from "@/app/_components/Layout/PrimaryLayout";
import { ReactNode } from "react";

function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <PrimaryLayout>{children}</PrimaryLayout>;
}

export default AuthenticatedLayout;
