import { Button } from "@/app/_components/ui/Button";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { LuPlus } from "react-icons/lu";

function CompanyHeader() {
  return (
    <header className="mt-6 bg-white rounded-md p-4 shadow-custom mb-6">
      <div className="flex justify-between items-center">
        <div className="">
          <Label>Nome</Label>
          <Input className="" variant="filled" placeholder="Ex: Super empresa" />
        </div>

        <div>


        <Button>
          <LuPlus />
          Adicionar empresa
        </Button>
        </div>
      </div>
    </header>
  );
}

export default CompanyHeader;
