"use client";

// import { Input } from "@/app/_components/ui/Input";
// import { Label } from "@/app/_components/ui/Label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { LuPlus, LuSearch } from "react-icons/lu";
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
  handleCloseModal
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
      router.push(`/users?name=${encodeURIComponent(name.trim())}`);
    } else {
      router.push("/users");
    }
  };

  // const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };



  return (
    <header className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4">
      <div className="col-span-12 md:col-span-3">
        {/* <Label>Nome</Label>
        <Input
          placeholder="Digite o nome do usuario"
          variant="filled"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          onKeyDown={handleKeyDown}
        /> */}
      </div>

      <div className="col-span-12 md:col-span-2">
        {/* <Label>Status</Label>

        <Select>
          <SelectTrigger className="w-full" variant="filled">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="light">Ativo</SelectItem>
            <SelectItem value="dark">Inativo</SelectItem>
          </SelectContent>
        </Select> */}
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
