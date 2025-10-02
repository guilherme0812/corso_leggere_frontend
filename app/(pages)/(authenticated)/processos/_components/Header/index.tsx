import { Button } from "@/app/_components/ui/Button";
import { ICase } from "@/app/_services/case";
import { Dispatch, SetStateAction } from "react";
// import { Input } from "@/app/_components/ui/Input";
// import { Label } from "@/app/_components/ui/Label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { LuPlus, LuSearch } from "react-icons/lu";

export default function Header({
  data,
  openModal,
  setOpenModal,
  editData,
}: {
  data: ICase[];
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  editData: ICase | undefined;
}) {
  return (
    <div className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4 rounded-md">
      <div className="col-span-12 md:col-span-3">
        {/* <Label>Nome do cliente</Label>
        <Input placeholder="Digite o nome do cliente" variant="filled" /> */}
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
          {data?.length} processos encontrados
        </div>
        <div className="flex gap-4 items-center">
          <Button>
            <LuSearch />
            Buscar processos
          </Button>
          <Button variant={"outline"}>
            <LuPlus />
            Adicionar processo
          </Button>
        </div>
      </div>
    </div>
  );
}
