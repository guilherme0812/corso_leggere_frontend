import { IoChatbubbleOutline } from "react-icons/io5";
import { LuClock, LuMoreHorizontal } from "react-icons/lu";

function TaskCard() {
  return (
    <div className="rounded-md bg-white h-16 p-2 px-4 border shadow-custom hover:shadow-lg transition duration-300 grid grid-cols-12 text-sm">
      <div className="col-span-5 flex flex-col justify-center">
        <div className="font-semibold">Pegar passaporte</div>
        <div className="text-xs">pessoal</div>
      </div>
      <div className="col-span-4 flex items-center gap-2 text-xs">
        <div className="font-semibold flex gap-1 items-center">
          <IoChatbubbleOutline />
          <div>8</div>
        </div>
        <div className="p-2 py-1 rounded-md bg-purple-200 font-semibold">Em andamento</div>
        <div className="p-2 py-1 rounded-md bg-blue-200 font-semibold">Fácil</div>
        <div className="font-semibold flex gap-1 items-center">
          <LuClock />
          <div>32 dias atrás</div>
        </div>
      </div>
      <div className="col-span-3 flex items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="w-[10rem] bg-gray-300 rounded-md overflow-hidden">
            <div className="h-[6px] w-[26%] bg-black"></div>
          </div>
          <div>26%</div>
        </div>

        <div className="cursor-pointer p-4 rounded-full hover:bg-gray-100 transition">
          <LuMoreHorizontal />
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
