import { Label } from "@/app/_components/ui/Label";
import ButtonsSection from "../ButtonsSection";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import { useState } from "react";
import { Button } from "@/app/_components/ui/Button";
import moment from "moment";

function Header({ handleChangeParams }: { handleChangeParams(startDate: Date, endDate: Date): void }) {
  const [startDate, setStartDate] = useState<Date>(new Date(moment().subtract(12, "months").format("YYYY-MM-DD")));
  const [endDate, setEndDate] = useState<Date>(new Date(moment().format("YYYY-MM-DD")));

  return (
    <div className="flex justify-between gap-4">
      <div className="flex items-end gap-4">
        <div>
          <Label>Intervalo data de vencimento</Label>
          <div className="flex items-end min-w-[400px]">
            <div className="w-full">
              <DatePicker initialValue={startDate} placeholder="Data inicial" onChange={setStartDate as any} />
            </div>

            <div className="w-full">
              <DatePicker initialValue={endDate} placeholder="Data final" onChange={setEndDate as any} />
            </div>
          </div>
        </div>

        <Button onClick={() => handleChangeParams(startDate, endDate)}>Buscar</Button>
      </div>

      <ButtonsSection />
    </div>
  );
}

export default Header;
