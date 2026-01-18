"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { LuArrowRightLeft, LuBookText, LuCreditCard, LuDollarSign, LuUsers } from "react-icons/lu";
import { MdCurrencyExchange, MdOutlineBalance } from "react-icons/md";

function Layout({ children }: { children: ReactNode }) {
  const path = usePathname();
  const pages = [
    {
      link: "/finances/financial-summary",
      label: "Resumo financeiro",
      icon: <LuDollarSign className="size-4 shrink-0" />,
    },
    {
      link: "/finances/transactions",
      label: "Transações",
      icon: <LuArrowRightLeft className="size-4 shrink-0" />,
    },
    // {
    //   link: "/finances/pending",
    //   label: "Pendências",
    //   icon: <LuClock3 className="size-4 shrink-0" />,
    // },
    {
      link: "/finances/attornies",
      label: "Advogados",
      icon: <MdOutlineBalance className="size-4 shrink-0" />,
    },
    {
      link: "/finances/beneficiaries",
      label: "Beneficiarios",
      icon: <LuUsers className="size-4 shrink-0" />,
    },
    {
      link: "/finances/payments",
      label: "Pagamento de clientes",
      icon: <LuCreditCard className="size-4 shrink-0" />,
    },
    {
      link: "/finances/categories",
      label: "Categorias",
      icon: <LuBookText className="size-4 shrink-0" />,
    },
  ];

  return (
    <div className="max-w-[1700px] m-auto h-full grid grid-cols-12 gap-4">
      <aside className="col-span-2 md:col-span-4 lg:col-span-3 xl:col-span-2 h-full">
        <nav className="border bg-white w-full">
          <div className="flex flex-col gap-2 p-2 border-b">
            <div className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 text-sm data-[slot=sidebar-menu-button]:!p-1.5">
              <MdCurrencyExchange />
              <span className="text-base font-semibold">Financeiro</span>
            </div>
          </div>

          <div className="relative flex w-full min-w-0 flex-col p-2">
            <div className="text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0">
              Menu
            </div>
            <ul className="flex w-full min-w-0 flex-col gap-1">
              {pages.map((item, key) => (
                <Link href={item.link} key={key}>
                  <li className="group/menu-item relative">
                    <button
                      data-active={item.link == path}
                      className="
                    flex h-8 w-full items-center gap-2 rounded-md p-2 text-left text-sm
                    transition-colors
                        hover:bg-gray-700 hover:text-white

                        data-[active=true]:bg-gray-800
                        data-[active=true]:text-white
                        data-[active=true]:font-medium
                    "
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      <div className="col-span-10 md:col-span-8 lg:col-span-9 xl:col-span-10 w-full h-full">{children}</div>
    </div>
  );
}

export default Layout;
