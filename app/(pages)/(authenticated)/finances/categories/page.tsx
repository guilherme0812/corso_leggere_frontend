import { LuBookText } from "react-icons/lu";

function Page() {
  return (
    <div>
      <div className="p-2 border-b w-full mb-4">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuBookText className="size-5" />
          <span className="text-base font-semibold">Categorias do financeiro</span>
        </div>
      </div>
    </div>
  );
}

export default Page;
