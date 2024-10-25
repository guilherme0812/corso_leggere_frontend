import Header from "@/app/_components/patterns/Header";
import { LuAlarmClock, LuCalendarDays, LuClipboardList } from "react-icons/lu";
import { MdOutlineBalance } from "react-icons/md";

function Dashboard() {
  return (
    <div>
      <Header title="Painel" />

      <div className="mt-6 bg-white rounded-md p-4 shadow-md mb-6">
        <h3 className="font-medium mb-4">Resumo do meu mês</h3>

        <div className="grid grid-cols-4 gap-8">
          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <MdOutlineBalance className="text-3xl text-yellow-600" />
            </div>

            <div>
              <div className="text-sm font-semibold">12 audiências marcadas</div>
              <div className="text-xs text-gray-600">04 para essa semana</div>
            </div>
          </div>

          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <LuAlarmClock className="text-3xl text-green-600" />
            </div>

            <div>
              <div className="text-sm font-semibold">30 prazos ativos</div>
              <div className="text-xs text-gray-600">02 para essa semana</div>
            </div>
          </div>

          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <LuCalendarDays className="text-3xl text-purple-600" />
            </div>

            <div>
              <div className="text-sm font-semibold">05 reuniões marcadas</div>
              <div className="text-xs text-gray-600">ver mais detalhes</div>
            </div>
          </div>

          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <LuClipboardList className="text-3xl text-blue-600" />
            </div>

            <div>
              <div className="text-sm font-semibold">58 atividades criadas</div>
              <div className="text-xs text-gray-600">02% concluídas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-500 text-sm mb-4">INDICADORES DE DESEMPENHO</h3>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-9 bg-white rounded-md min-h-64 shadow p-4"></div>
          <div className="col-span-3 bg-white rounded-md min-h-64 shadow p-4">
            <div>Taxa de sucesso</div>
            <div>Tempo médio de resolução</div>
            <div>Novos processos</div>
            <div>Processos resolvidos</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-500 text-sm mb-4">ATIVIDADES</h3>

        <div className="flex flex-col gap-4">
          <div className="rounded-md bg-white h-14 p-4 shadow-sm hover:shadow-lg transition duration-300"></div>
          <div className="rounded-md bg-white h-14 p-4 shadow-sm hover:shadow-lg transition duration-300"></div>
          <div className="rounded-md bg-white h-14 p-4 shadow-sm hover:shadow-lg transition duration-300"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
