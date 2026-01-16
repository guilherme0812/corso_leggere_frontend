"use client";

import { Label } from "@/app/_components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { LuSearch } from "react-icons/lu";
import { Dispatch, SetStateAction, useState } from "react";
import { GetTransactionsParams } from "@/app/_services/finanances";
import { UseCases } from "@/app/_hooks/cases";

function Header({
  // filters,
  setFilters,
  refetch,
}: {
  refetch(): void;
  filters: GetTransactionsParams;
  setFilters: Dispatch<SetStateAction<GetTransactionsParams>>;
}) {
  const [status, setStatus] = useState<string>();
  const [caseId, setCaseId] = useState<string>();

  const { data: cases, isLoading: casesIsLoading } = UseCases({});

  // const handleSearch = () => {
  //   if (clientName.trim()) {
  //     router.push(`/clientes?name=${encodeURIComponent(clientName.trim())}`);
  //   } else {
  //     router.push("/clientes");
  //   }
  // };

  const handleSearch = () => {
    const options: any = {};

    if (status) {
      options.status = status;
    }

    if (caseId) {
      options.caseId = caseId;
    }

    // if (startDueDate && endDueDate) {
    //   options.startDueDate = startDueDate.toISOString().split("T")[0];
    //   options.endDueDate = endDueDate.toISOString().split("T")[0];
    // }

    setFilters(() => ({ ...options }));
    refetch();
  };

  // const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  const options = [
    {
      value: "COMPLETED",
      label: "Concluída",
    },
    {
      value: "PENDING",
      label: "Pendente",
    },
    {
      value: "FAILED",
      label: "Falhou",
    },
    {
      value: "CANCELLED",
      label: "Cancelado",
    },
    {
      value: "REVERSED",
      label: "Estornada",
    },
  ];

  return (
    <header className=" grid grid-cols-12 gap-4 shadow-md bg-white p-4">
      <div className="col-span-12 md:col-span-4">
        <Label>Processo</Label>

        <Select onValueChange={(value) => setCaseId(value)}>
          <SelectTrigger className="w-full" variant="filled">
            <SelectValue placeholder="Selecione o processo" />
          </SelectTrigger>

          <SelectContent>
            {casesIsLoading ? "Carregando..." : ""}
            {cases?.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title} - {item.processNumber}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-12 md:col-span-2">
        <Label>Status</Label>

        <Select onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-full" variant="filled">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>

          <SelectContent>
            {options.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-12 md:col-span-6 flex flex-col items-end justify-end gap-2">
        <div className="flex gap-4 items-center">
          <Button onClick={handleSearch}>
            <LuSearch />
            Buscar transaçoes
          </Button>
        </div>
      </div>

      {/* {openModal && <ClientModal handleClose={setOpenModal as any} editData={editData} />} */}
    </header>
  );
}

export default Header;
