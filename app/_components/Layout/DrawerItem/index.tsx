import * as React from "react";

export type DrawerItemType = {
  selected?: boolean;
  icon: string | React.ReactNode;
  label: string;
  open?: boolean;
  onClick?(): void;
  link: string;
  target?: string;
};

const DrawerItem = ({ icon, label, selected, open, onClick }: Omit<DrawerItemType, "link">) => {
  return (
    <div
      onClick={onClick}
      data-state={open ? "open" : "closed"}
      className={`cursor-pointer inline-flex font-medium text-sm leading-5 rounded-xl whitespace-nowrap items-center normal-case transition duration-300 w-full pr-2  ${
        selected ? "bg-gray-900 text-white hover:bg-gray-950" : "hover:bg-gray-950 hover:text-background"
      }`}
    >
      <div
        data-name="carbonfair-ui-drawer-item-icon"
        data-state={open ? "open" : "closed"}
        className="flex-shrink-0 flex items-center justify-center w-12 h-12"
      >
        {icon}
      </div>

      <div
        data-name="carbonfair-ui-drawer-item-label"
        className={`text-ellipsis overflow-hidden font-semibold ${open ? 1 : 0}`}
      >
        {label}
      </div>
    </div>
  );
};

export default DrawerItem;
