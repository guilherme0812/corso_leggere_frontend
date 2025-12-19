"use client";

import { Button } from "@/app/_components/ui/Button";
import { ICase } from "@/app/_services/case";
// import { Input } from "@/app/_components/ui/Input";
// import { Label } from "@/app/_components/ui/Label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { LuPlus, LuSearch } from "react-icons/lu";
import CaseModal from "../CaseModal";
import { Label } from "@/app/_components/ui/Label";
import { Input } from "@/app/_components/ui/Input";
import { Dispatch, SetStateAction, useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

export default function Header({
  data,
  editData,
  openModal,
  setOpenModal,
  filter,
}: {
  filter: any;
  data: ICase[];
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  editData: ICase | undefined;
}) {
  const [title, setTitle] = useState(filter?.title || "");
  const [clientName, setClientName] = useState(filter?.clientName || "");
  const [processNumber, setProcessNumber] = useState(filter?.processNumber || "");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (title.trim()) {
      params.set("title", title.trim());
    }

    if (clientName.trim()) {
      params.set("clientName", clientName.trim());
    }

    if (processNumber.trim()) {
      params.set("processNumber", processNumber.trim());
    }

    const queryString = params.toString();

    router.push(queryString ? `/processos?${queryString}` : "/processos");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4 rounded-md">
      <div className="col-span-12 md:col-span-2 lg:col-col-span-3 flex flex-col justify-end gap-2">
        <Label>Titulo</Label>
        <Input
          placeholder="Digite o titulo"
          variant="filled"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="col-span-12 md:col-span-2 lg:col-col-span-3  flex flex-col justify-end gap-2">
        <Label>Número do processo</Label>
        <Input
          placeholder="Digite o número do processo"
          variant="filled"
          value={processNumber}
          onChange={(e) => setProcessNumber(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="col-span-12 md:col-span-3 lg:col-col-span-3 flex flex-col justify-end gap-2">
        <Label>Nome do cliente</Label>
        <Input
          placeholder="Digite o nome do cliente"
          variant="filled"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="col-span-12 md:col-span-5 flex flex-col items-end justify-end gap-2">
        <div className="p-1 px-4 h-8 rounded-3xl bg-yellow-300 text-xs font-semibold flex items-center justify-center">
          {data?.length} processos encontrados
        </div>
        <div className="flex gap-4 items-center">
          <Button onClick={handleSearch}>
            <LuSearch />
            Buscar processos
          </Button>
          <Button variant={"outline"} onClick={() => setOpenModal(true)}>
            <LuPlus />
            Adicionar processo
          </Button>
        </div>
      </div>

      {openModal && <CaseModal handleClose={setOpenModal as any} editData={editData} />}
    </div>
  );
}
