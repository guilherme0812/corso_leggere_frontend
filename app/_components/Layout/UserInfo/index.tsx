"use client";

import { LoginDataType } from "@/app/_types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import SimpleUserDetailModal from "../../patterns/users/SimpleUserDetailModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/_components/ui/DropdownMenu";
import { Button } from "../../ui/Button";
import ChangePasswordModal from "../../patterns/users/ChangePasswordModal";

type UserInfoType = {
  open: boolean;
};

function UserInfo({ open }: UserInfoType) {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [openUserModal, setOpenUserModal] = useState(false);
  const { data } = useSession();

  const user = data?.user as LoginDataType;

  return (
    <div
      data-state={open ? "open" : "closed"}
      className={`cursor-pointer inline-flex font-medium text-sm leading-5 rounded-xl whitespace-nowrap items-center normal-case transition duration-300 w-full pr-2 hover:bg-gray-100`}
    >
      <div
        data-name="carbonfair-ui-drawer-item-icon"
        data-state={open ? "open" : "closed"}
        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl border-2"
      >
        <div className="relative overflow-hidden rounded-xl w-10 h-10">
          <Image
            src="https://images.pexels.com/photos/302831/pexels-photo-302831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            layout="fill"
            alt="imge"
          />
        </div>
      </div>

      <div
        data-name="carbonfair-ui-drawer-item-label"
        className={`text-ellipsis overflow-hidden pl-1 font-semibold flex-grow`}
      >
        <div className="leading-3">{user?.company?.name}</div>
        <div className="text-sm font-normal">{user?.firstName}</div>
      </div>

      <div className="h-12 pt-2">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" aria-label="Open menu" size="icon">
              <MdMoreVert />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel>Suas ações</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => setOpenUserModal(true)}>informações</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setOpenChangePasswordModal(true)}>Alterar senha</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* <div role="button" className="p-1 hover:bg-gray-200 rounded-md" onClick={() => setOpenUserModal(true)}>
          <MdMoreVert />
        </div> */}
      </div>

      {openUserModal ? <SimpleUserDetailModal editData={user} handleClose={() => setOpenUserModal(false)} /> : null}
      {openChangePasswordModal ? <ChangePasswordModal handleClose={() => setOpenChangePasswordModal(false)} /> : null}
    </div>
  );
}

export default UserInfo;
