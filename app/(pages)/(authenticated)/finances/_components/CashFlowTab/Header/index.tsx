"use client";

import { Label } from "@/app/_components/ui/Label";
import { Button } from "@/app/_components/ui/Button";
import { LuSearch } from "react-icons/lu";
import { Dispatch, SetStateAction, useState } from "react";
import { GetMonthReportParams } from "@/app/_services/finanances";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import moment from "moment";

function Header({
  // openModal,
  //   setOpenModal,
  // filters,
  setFilters,
  refetch,
}: {
  refetch(): void;
  //   openModal: boolean;
  //   setOpenModal: Dispatch<SetStateAction<boolean>>;
  filters: GetMonthReportParams;
  setFilters: Dispatch<SetStateAction<GetMonthReportParams>>;
}) {
  const start = moment().clone().startOf("month").toDate();
  const end = moment().clone().endOf("month").toDate();

  const [startDueDate, setStartDueDate] = useState<Date | undefined>(start);
  const [endDueDate, setEndDueDate] = useState<Date | undefined>(end);

  // const handleSearch = () => {
  //   if (clientName.trim()) {
  //     router.push(`/clientes?name=${encodeURIComponent(clientName.trim())}`);
  //   } else {
  //     router.push("/clientes");
  //   }
  // };

  const handleSearch = () => {
    const options: any = {};

    // if (status) {
    //   options.status = status;
    // }

    if (startDueDate && endDueDate) {
      options.startDate = startDueDate.toISOString().split("T")[0];
      options.endDate = endDueDate.toISOString().split("T")[0];
    }

    setFilters(() => ({ ...options }));
    refetch();
  };

  // const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     handleSearch();
  //   }
  // };

  return (
    <header className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4">
      {/* <div className="col-span-12 md:col-span-2">
        <Label>Status</Label>

        <Select onValueChange={(value) => setStatus(value)}>
          <SelectTrigger className="w-full" variant="filled">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>

          <SelectContent>
            {options.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      <div className="col-span-12 md:col-span-4 ">
        <Label>Intervalo data de vencimento</Label>
        <div className="flex items-end">
          <div className="w-full">
            <DatePicker placeholder="Data inicial" initialValue={start} onChange={setStartDueDate} />
          </div>

          <div className="w-full">
            <DatePicker placeholder="Data final" initialValue={end} onChange={setEndDueDate} />
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col items-end justify-center gap-2">
        <div className="flex gap-4 items-center">
          <Button onClick={handleSearch}>
            <LuSearch />
            Buscar contas
          </Button>
          {/* <Button variant={"outline"} onClick={() => setOpenModal(true)}>
            <LuPlus />
            Adicionar pagamento
          </Button> */}
        </div>
      </div>

      {/* {openModal && <ClientModal handleClose={setOpenModal as any} editData={editData} />} */}
    </header>
  );
}

export default Header;
