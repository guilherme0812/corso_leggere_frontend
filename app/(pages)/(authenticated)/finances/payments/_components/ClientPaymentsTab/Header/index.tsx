"use client";

import { Label } from "@/app/_components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { LuSearch } from "react-icons/lu";
import { Dispatch, SetStateAction, useState } from "react";
import { GetAllPaymentsParams } from "@/app/_services/finanances";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import { UseCases } from "@/app/_hooks/cases";

function Header({
  filters,
  setFilters,
  refetch,
}: {
  refetch(): void;
  filters: GetAllPaymentsParams;
  setFilters: Dispatch<SetStateAction<GetAllPaymentsParams>>;
}) {
  const [status, setStatus] = useState<string>();
  const [processNumber, setProcessNumber] = useState<string>(filters?.processNumber as any);
  const [startDueDate, setStartDueDate] = useState<Date>();
  const [endDueDate, setEndDueDate] = useState<Date>();

  const { data: cases, isLoading: casesIsLoading } = UseCases({});

  // const handleSearch = () => {
  //   if (clientName.trim()) {
  //     router.push(`/clientes?name=${encodeURIComponent(clientName.trim())}`);
  //   } else {
  //     router.push("/clientes");
  //   }
  // };

  console.log(filters);

  const handleSearch = () => {
    const options: any = {};

    if (status) {
      options.status = status;
    }

    if (processNumber) {
      options.processNumber = processNumber;
    }

    if (startDueDate && endDueDate) {
      options.startDueDate = startDueDate.toISOString().split("T")[0];
      options.endDueDate = endDueDate.toISOString().split("T")[0];
    }

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
      value: "LATE",
      label: "Atrasado",
    },
    {
      value: "PENDING",
      label: "Pendente",
    },
    {
      value: "PARTIAL",
      label: "Parcialmente pago",
    },
    {
      value: "CANCELLED",
      label: "Cancelado",
    },
    {
      value: "REFUNDED",
      label: "Estornado",
    },
    {
      value: "PAID",
      label: "Completamente pago",
    },
  ];
  return (
    <header className=" grid grid-cols-12 gap-4 shadow-md bg-white p-4">
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

      <div className="col-span-12 md:col-span-4 ">
        <Label>Intervalo data de vencimento</Label>
        <div className="flex items-end">
          <div className="w-full">
            <DatePicker placeholder="Data inicial" onChange={setStartDueDate} />
          </div>

          <div className="w-full">
            <DatePicker placeholder="Data final" onChange={setEndDueDate} />
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-2">
        <Label>Processo</Label>

        <Select value={filters.processNumber || ""} onValueChange={(value) => setProcessNumber(value)}>
          <SelectTrigger className="w-full" variant="filled">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>

          <SelectContent>
            {casesIsLoading ? <div>Carregando...</div> : []}
            {cases?.map((item) => (
              <SelectItem key={item.id} value={item.processNumber || item.id}>
                {item.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col items-end justify-end gap-2">
        <div className="flex gap-4 items-center">
          <Button onClick={handleSearch}>
            <LuSearch />
            Buscar pagamentos
          </Button>
        </div>
      </div>

      {/* {openModal && <ClientModal handleClose={setOpenModal as any} editData={editData} />} */}
    </header>
  );
}

export default Header;
