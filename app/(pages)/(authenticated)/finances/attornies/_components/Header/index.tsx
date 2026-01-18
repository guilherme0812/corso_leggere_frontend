"use client";

import { Button } from "@/app/_components/ui/Button";
import { LuSearch } from "react-icons/lu";
import { Dispatch, SetStateAction } from "react";
import { GetTransactionsParams } from "@/app/_services/finanances";

function Header({
  // filters,
  setFilters,
  refetch,
}: {
  refetch(): void;
  filters: GetTransactionsParams;
  setFilters: Dispatch<SetStateAction<GetTransactionsParams>>;
}) {
  const handleSearch = () => {
    const options: any = {};

    setFilters(() => ({ ...options }));
    refetch();
  };

  return (
    <header className=" grid grid-cols-12 gap-4 shadow-md bg-white p-4">
      {/* <div className="col-span-12 md:col-span-4">
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
      </div> */}

      <div className="col-span-12 md:col-span-12 flex flex-col items-end justify-end gap-2">
        <div className="flex gap-4 items-center">
          <Button onClick={handleSearch}>
            <LuSearch />
            Buscar beneficiarios
          </Button>
        </div>
      </div>

      {/* {openModal && <ClientModal handleClose={setOpenModal as any} editData={editData} />} */}
    </header>
  );
}

export default Header;
