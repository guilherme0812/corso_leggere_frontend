import { Button } from "@/app/_components/ui/Button";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { LuSearch } from "react-icons/lu";

export default function Header() {
  return (
    <div className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4">
      <div className="col-span-12 md:col-span-3">
        <Label>Nome do cliente</Label>
        <Input placeholder="Digite o nome do cliente" variant="filled" />
      </div>

      <div className="col-span-12 md:col-span-2">
        <Label>Status</Label>

        <Select>
          <SelectTrigger className="w-full" variant="filled">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="light">Ativo</SelectItem>
            <SelectItem value="dark">Inativo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-12 md:col-span-7 flex flex-col items-end justify-end gap-2">
        <div className="p-1 px-4 h-8 rounded-3xl bg-yellow-300 text-xs font-semibold flex items-center justify-center">
          100 processos encontrados
        </div>
        <div>
          <Button>
            <LuSearch />
            Buscar processos
          </Button>
        </div>
      </div>
    </div>
  );
}
