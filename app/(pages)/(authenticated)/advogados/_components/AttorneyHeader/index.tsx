"use client";

import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { LuPlus, LuSearch } from "react-icons/lu";
import { useState, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { IAttorney } from "@/app/_services/attorney";
import AttorneyModal from "../AttorneyModal";

function AttorneyHeader({
  data,
  editData,
  openModal,
  setOpenModal,
}: {
  data: IAttorney[];
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  editData: IAttorney | undefined;
}) {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (name.trim()) {
      router.push(`/advogados?name=${encodeURIComponent(name.trim())}`);
    } else {
      router.push("/advogados");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4">
      <div className="col-span-12 md:col-span-3">
        <Label>Nome do Advogado</Label>
        <Input
          placeholder="Digite o nome do advogado"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
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
          {data?.length} advogados encontrados
        </div>
        <div className="flex gap-4 items-center">
          <Button onClick={handleSearch}>
            <LuSearch />
            Buscar advogados
          </Button>
          <Button variant={"outline"} onClick={() => setOpenModal(true)}>
            <LuPlus />
            Adicionar advogado
          </Button>
        </div>
      </div>

      {openModal && <AttorneyModal handleClose={setOpenModal as any} editData={editData} />}
    </header>
  );
}

export default AttorneyHeader;
