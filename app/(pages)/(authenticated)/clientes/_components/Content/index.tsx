"use client";

import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";

function Content() {
  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <div className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4">
        <div className="col-span-12 md:col-span-3">
          <Label>Nome do cliente</Label>
          <Input placeholder="Digite o nome do cliente" variant="filled" />
        </div>

        <div className="col-span-12 md:col-span-2">
          <Label>Status</Label>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="light">Ativo</SelectItem>
              <SelectItem value="dark">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-full"></div>
    </div>
  );
}

export default Content;
