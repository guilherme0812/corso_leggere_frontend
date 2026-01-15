import { Button } from "@/app/_components/ui/Button";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { LuPlus, LuSearch } from "react-icons/lu";
import { Dispatch, SetStateAction, useState, KeyboardEvent } from "react";

function UserHeader({
  handleOpenModal,
  setUserFilterName,
  dataLength,
}: {
  dataLength: number;
  handleOpenModal: () => void;
  setUserFilterName: Dispatch<SetStateAction<string>>;
}) {
  const [name, setName] = useState("");

  const handleSearch = () => {
    setUserFilterName(name);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <header className="mt-6 bg-white rounded-md p-4 shadow-custom mb-6 grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4">
        <Label>Nome</Label>
        <Input
          placeholder="Digite o nome"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="col-span-12 md:col-span-8 flex flex-col items-end justify-end gap-2">
        <div className="p-1 px-4 h-8 rounded-3xl bg-yellow-300 text-xs font-semibold flex items-center justify-center">
          {dataLength} registros encontrados
        </div>
        <div className="flex gap-4 items-center">
          <Button onClick={handleSearch}>
            <LuSearch />
            Buscar registros
          </Button>
          <Button variant={"outline"} onClick={handleOpenModal}>
            <LuPlus />
            Adicionar clientes
          </Button>
        </div>
      </div>
    </header>
  );
}

export default UserHeader;
