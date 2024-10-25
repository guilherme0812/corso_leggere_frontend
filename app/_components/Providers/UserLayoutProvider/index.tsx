"use client";

import { LuCalendar, LuCircleDollarSign, LuFileText, LuPieChart, LuUsers } from "react-icons/lu";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

function UserLayoutProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <PrimaryLayout
      itens={[
        {
          icon: <LuPieChart />,
          label: "Painel",
          link: "/painel",
          selected: pathname == "/painel",
        },
        {
          icon: <LuFileText />,
          label: "Processos",
          link: "/processos",
          selected: pathname == "/processos",
        },
        {
          icon: <LuUsers />,
          label: "Clientes",
          link: "/",
          selected: pathname == "/clientes",
        },
        {
          icon: <LuCircleDollarSign />,
          label: "Financeiro",
          link: "/financeiro",
          selected: pathname == "/financeiro",
        },
        {
          icon: <LuCalendar />,
          label: "Calendario",
          link: "/calendario",
          selected: pathname == "/financeiro",
        },
      ]}
    >
      {children}
    </PrimaryLayout>
  );
}

export default UserLayoutProvider;
