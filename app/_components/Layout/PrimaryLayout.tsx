"use client";

import { ReactNode, useState } from "react";
import DrawerItem, { DrawerItemType } from "./DrawerItem";
import { LuSettings } from "react-icons/lu";
import Logo from "./Logo";
import Link from "next/link";

type PrimaryLayoutType = {
  children: ReactNode;
  itens: DrawerItemType[];
};

function PrimaryLayout({ children, itens }: PrimaryLayoutType) {
  const [open, setOpen] = useState(false);
  const drawerWidth = "w-[280px]";

  return (
    <div className="flex min-h-[100dvh]">
      <div
        className={`relative max-h-[100vh] transition-all duration-300 flex-shrink-0 ${
          !open ? "w-[4.5rem]" : drawerWidth
        }`}
      >
        {/* fixed-container */}
        <div
          className={`fixed h-full p-3 pb-0  transition-all duration-300 border-r ${
            !open ? "w-[4.5rem]" : drawerWidth
          }`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* drawer-content */}
          <div className="h-full flex flex-col overflow-hidden justify-between rounded-sm ">
            <div className="flex flex-col gap-12">
              <Logo />

              <ul className="mb-4 p-0 flex flex-col gap-2">
                {itens.map((item, index) => (
                  <Link href={item.link} key={index}>
                    <DrawerItem {...item} key={index} />
                  </Link>
                ))}
              </ul>
            </div>

            <ul className="mb-4 p-0 flex flex-col gap-2">
              <DrawerItem icon={<LuSettings />} label="Configurações" />
            </ul>
          </div>
        </div>
      </div>
      <main className="p-3 flex-grow bg-gray-50">{children}</main>
    </div>
  );
}

export default PrimaryLayout;
