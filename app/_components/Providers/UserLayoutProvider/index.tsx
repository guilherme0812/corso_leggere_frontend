"use client";

import { LuCalendar, LuCircleDollarSign, LuFileText, LuNewspaper, LuPieChart, LuUsers } from "react-icons/lu";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { MdOutlineBalance } from "react-icons/md";

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
        // {
        //   icon: <LuFileText />,
        //   label: "Processos",
        //   link: "/processos",
        //   selected: pathname == "/processos",
        // },
        {
          icon: <LuUsers />,
          label: "Clientes",
          link: "/clientes",
          selected: pathname == "/clientes",
        },
        {
          icon: <MdOutlineBalance />,
          label: "Advogados",
          link: "/advogados",
          selected: pathname == "/advogados",
        },
        {
          icon: <LuNewspaper />,
          label: "Documentos",
          link: "/gerador-de-documentos",
          selected: pathname == "/gerador-de-documentos",
        },
        // {
        //   icon: <LuCircleDollarSign />,
        //   label: "Financeiro",
        //   link: "/financeiro",
        //   selected: pathname == "/financeiro",
        // },
        // {
        //   icon: <LuCalendar />,
        //   label: "Calendario",
        //   link: "/calendario",
        //   selected: pathname == "/calendario",
        // },
      ]}
    >
      {children}
    </PrimaryLayout>
  );
}

export default UserLayoutProvider;
