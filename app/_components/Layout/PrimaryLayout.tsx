"use client";

import { ReactNode, useState } from "react";
import DrawerItem from "./DrawerItem";
import { LuHome } from "react-icons/lu";

type PrimaryLayoutType = {
  children: ReactNode;
};

function PrimaryLayout({ children }: PrimaryLayoutType) {
  const [open, setOpen] = useState(false);
  const drawerWidth = "w-[280px]";

  return (
    <div className="flex min-h-[100dvh]">
      <div
        className={`relative max-h-[100vh] transition duration-300 flex-shrink-0 ${!open ? "w-[4.5rem]" : drawerWidth}`}
      >
        {/* fixed-container */}
        <div className={`fixed h-full p-3 transition duration-300 border-r ${!open ? "w-[4.5rem]" : drawerWidth}`}>
          {/* drawer-content */}
          <div className="h-full flex flex-col overflow-hidden justify-between rounded-sm ">
            <ul className="mb-4 p-0 flex flex-col gap-2 flex-grow">
              <DrawerItem selected icon={<LuHome />} label="Home" />
              <DrawerItem icon={<LuHome />} label="Home" />
              <DrawerItem icon={<LuHome />} label="Home" />
            </ul>
          </div>
        </div>
      </div>
      <main className="p-3 flex-grow">{children}</main>
    </div>
  );
}

export default PrimaryLayout;
