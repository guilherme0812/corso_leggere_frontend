"use client";

import { LuChartPie, LuNewspaper, LuUsers } from "react-icons/lu";
import PrimaryLayout from "../../Layout/PrimaryLayout";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MdOutlineAdminPanelSettings, MdOutlineBalance } from "react-icons/md";
import { LoginDataType, UserRole } from "@/app/_types";

function UserLayoutProvider({ children, user }: { children: ReactNode; user: LoginDataType }) {
  const pathname = usePathname();

  const list = [
    {
      icon: <LuChartPie />,
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
  ];

  const [items, setItems] = useState(list);

  useEffect(() => {
    if (user?.role == UserRole.admin) {
      setItems(() => [
        ...list,
        {
          icon: <MdOutlineAdminPanelSettings />,
          label: "Admin",
          link: "/admin",
          selected: pathname.includes("/admin"),
        },
      ]);
    } else {
      setItems(() => [...list]);
    }
  }, [pathname]);

  return <PrimaryLayout itens={items}>{children}</PrimaryLayout>;
}

export default UserLayoutProvider;
