import { Button } from "@/app/_components/ui/Button";
import { Label } from "@/app/_components/ui/Label";

function Page() {
  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_auto_1fr] gap-4 h-full">
      <div className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4">
        <div className="col-span-4">
          <Label>Período de visualização</Label>
          <div className="flex gap-4 items-center mt-2">
            <Button size={"sm"} variant={"secondary"}>
              Mensal
            </Button>
            <Button size={"sm"} variant={"default"}>
              semestral
            </Button>
            <Button size={"sm"} variant={"secondary"}>
              Anual
            </Button>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 flex flex-col items-end justify-end gap-2"></div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-4 border rounded-xl h-64"></div>
        <div className="col-span-12 md:col-span-4 border rounded-xl h-64"></div>
        <div className="col-span-12 md:col-span-4 border rounded-xl h-64"></div>
      </div>

      <div className="bg-white rounded-md h-full p-4 shadow-custom"></div>
    </div>
  );
}

export default Page;
