import { Button } from "@/app/_components/ui/Button";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Dispatch, SetStateAction } from "react";
import { LuPlus } from "react-icons/lu";

function CompanyHeader({
  handleOpenModal,
  setCompanyFilterName
}: {
  handleOpenModal: () => void;
  setCompanyFilterName: Dispatch<SetStateAction<string>>;
}) {
  return (
    <header className="mt-6 bg-white rounded-md p-4 shadow-custom mb-6">
      <div className="flex justify-between items-center">
        <div className="">
          <Label>Nome</Label>
          <Input className="" variant="filled" onChange={e => setCompanyFilterName(e.target.value)} placeholder="Ex: Super empresa" />
        </div>

        <div>
          <Button onClick={handleOpenModal}>
            <LuPlus />
            Adicionar empresa
          </Button>
        </div>
      </div>
    </header>
  );
}

export default CompanyHeader;
