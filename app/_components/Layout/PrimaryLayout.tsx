"use client";

import { ReactNode, useState } from "react";
import DrawerItem, { DrawerItemType } from "./DrawerItem";
import { LuLogOut, LuMenu, LuSettings } from "react-icons/lu";
import Link from "next/link";
import UserInfo from "./UserInfo";
import { signOut } from "next-auth/react";
import { MdOutlineBalance } from "react-icons/md";

type PrimaryLayoutType = {
  children: ReactNode;
  itens: DrawerItemType[];
};

function PrimaryLayout({ children, itens }: PrimaryLayoutType) {
  const [open, setOpen] = useState(false);
  const drawerWidth = "md:w-[280px]";

  return (
    <div className="flex flex-col md:flex-row min-h-[100dvh]">
      <div
        className={`relative max-h-[100vh] transition-all duration-300 flex-shrink-0 border-b md:border-b-0 ${
          !open ? "md:w-[4.5rem]" : drawerWidth
        }`}
      >
        {/* fixed-container */}
        <div
          className={`md:fixed h-full p-3  transition-all duration-300 border-r ${
            !open ? "md:w-[4.5rem]" : drawerWidth
          }`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* drawer-content */}
          <div className="h-full flex flex-col overflow-hidden justify-between rounded-sm">
            <div className="flex justify-between items-center md:mb-8">
              <DrawerItem
                icon={
                    <MdOutlineBalance className="text-2xl" />
                  
                }
                label="Leggere"
              />

              <div onClick={() => setOpen(!open)}>
                <LuMenu className="text-2xl" />
              </div>
            </div>

            <div
              className={`flex flex-col gap-4 flex-grow transition-all duration-300 ease-in h-auto ${
                open ? "max-h-[9999px] overflow-y-auto" : "max-h-[0px]"
              } md:max-h-[none] overflow-hidden scrollbar-thin pt-4 md:pt-0 border-current md:border-b-0`}
            >
              <div className="">
                <div className="mb-4">
                  <UserInfo {...{ open }} />
                </div>

                <ul className="p-0 flex flex-col gap-2">
                  {itens.map((item, index) => (
                    <Link href={item.link} key={index}>
                      <DrawerItem {...item} key={index} />
                    </Link>
                  ))}
                </ul>
              </div>

              <div className="p-0 flex flex-col gap-2">
                <hr className="border-t border-gray-300 w-full" />

                <DrawerItem icon={<LuSettings />} label="Configurações" />
                <DrawerItem icon={<LuLogOut />} label="Signout" onClick={signOut} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="p-3 pt-6 md:pt-3 flex-grow bg-gray-50">{children}</main>
    </div>
  );
}

export default PrimaryLayout;
