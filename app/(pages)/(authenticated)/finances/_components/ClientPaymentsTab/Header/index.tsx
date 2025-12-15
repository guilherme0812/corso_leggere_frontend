"use client";

import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { LuPlus, LuSearch } from "react-icons/lu";
import { Dispatch, SetStateAction, useState, KeyboardEvent } from "react";
// import ClientModal from "../ClientModal";
import { IClient } from "@/app/_services/client";
import { useRouter } from "next/navigation";

function Header({
  openModal,
  setOpenModal,
  editData,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  editData: IClient | undefined;
}) {
  const [clientName, setClientName] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (clientName.trim()) {
      router.push(`/clientes?name=${encodeURIComponent(clientName.trim())}`);
    } else {
      router.push("/clientes");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const options = [
    {
      value: "PENDING",
      label: "Pendente",
    },
    {
      value: "PAID",
      label: "Pago",
    },
    {
      value: "LATE",
      label: "Atrasado",
    },
  ];

  return (
    <header className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4">
      <div className="col-span-12 md:col-span-2">
        <Label>Status</Label>

        <Select>
          <SelectTrigger className="w-full" variant="filled">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>

          <SelectContent>
            {options.map((item) => (
              <SelectItem value={item.value}>{item.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-12 md:col-span-2">
        <Label>Data inicial</Label>
      </div>

      <div className="col-span-12 md:col-span-2">
        <Label>Data inicial</Label>
      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col items-end justify-end gap-2">
        <div className="flex gap-4 items-center">
          <Button onClick={handleSearch}>
            <LuSearch />
            Buscar
          </Button>
          <Button variant={"outline"} onClick={() => setOpenModal(true)}>
            <LuPlus />
            Adicionar pagamento
          </Button>
        </div>
      </div>

      {/* {openModal && <ClientModal handleClose={setOpenModal as any} editData={editData} />} */}
    </header>
  );
}

export default Header;
