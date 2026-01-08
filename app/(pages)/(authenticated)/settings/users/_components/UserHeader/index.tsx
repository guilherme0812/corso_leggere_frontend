"use client";

// import { Input } from "@/app/_components/ui/Input";
// import { Label } from "@/app/_components/ui/Label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { LuPlus, LuSearch, LuUsers } from "react-icons/lu";
import { Dispatch, SetStateAction, useState } from "react";
// import ClientModal from "../ClientModal";
import { useRouter } from "next/navigation";
import { UserDataType } from "@/app/_types/login";
import UserModal from "@/app/_components/patterns/users/UserModal";

function UserHeader({
  data,
  openModal,
  setOpenModal,
  editData,
  handleCloseModal,
}: {
  data: UserDataType[];
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  editData: UserDataType | undefined;
  handleCloseModal: () => void;
}) {
  const [name] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (name.trim()) {
      router.push(`/settings/users?name=${encodeURIComponent(name.trim())}`);
    } else {
      router.push("/users");
    }
  };

  return (
    <header className="h-full grid grid-cols-12 gap-4 pb-4 border-b">
      <div className="col-span-12 md:col-span-5">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuUsers className="size-5" />
          <span className="text-base font-semibold">Usuários </span>
        </div>
      </div>

      <div className="col-span-12 md:col-span-7 flex flex-col items-end justify-end gap-2">
        <div className="p-1 px-4 h-8 rounded-3xl bg-yellow-300 text-xs font-semibold flex items-center justify-center">
          {data.length} usuarios encontrados
        </div>
        <div className="flex gap-4 items-center">
          <Button onClick={handleSearch}>
            <LuSearch />
            Buscar usuarios
          </Button>
          <Button variant={"outline"} onClick={() => setOpenModal(true)}>
            <LuPlus />
            Adicionar usuarios
          </Button>
        </div>
      </div>

      {openModal && <UserModal companies={[]} handleClose={handleCloseModal} editData={editData} />}
    </header>
  );
}

export default UserHeader;
