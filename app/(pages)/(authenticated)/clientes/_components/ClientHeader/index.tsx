"use client";

import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { LuPlus, LuSearch } from "react-icons/lu";
import { Dispatch, SetStateAction } from "react";
import ClientModal from "../ClientModal";
import { IClient } from "@/app/_services/client";
// import { useRouter } from "next/navigation";

function ClientHeader({
  data,
  openModal,
  setOpenModal,
  editData,
}: {
  data: IClient[];
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  editData: IClient | undefined;
}) {
  return (
    <header className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4">
      <div className="col-span-12 md:col-span-3">
        <Label>Nome do cliente</Label>
        <Input placeholder="Digite o nome do cliente" variant="filled" />
      </div>

      <div className="col-span-12 md:col-span-2">
        <Label>Status</Label>

        <Select>
          <SelectTrigger className="w-full" variant="filled">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="light">Ativo</SelectItem>
            <SelectItem value="dark">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-12 md:col-span-7 flex flex-col items-end justify-end gap-2">
        <div className="p-1 px-4 h-8 rounded-3xl bg-yellow-300 text-xs font-semibold flex items-center justify-center">
          {data.length} clientes encontrados
        </div>
        <div className="flex gap-4 items-center">
          <Button>
            <LuSearch />
            Buscar clientes
          </Button>
          <Button variant={"outline"} onClick={() => setOpenModal(true)}>
            <LuPlus />
            Adicionar clientes
          </Button>
        </div>
      </div>

      {openModal && <ClientModal handleClose={setOpenModal as any} editData={editData} />}
    </header>
  );
}

export default ClientHeader;
