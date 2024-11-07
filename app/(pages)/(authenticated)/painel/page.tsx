import Header from "@/app/_components/patterns/Header";
import { LuAlarmClock, LuCalendarDays, LuClipboardList } from "react-icons/lu";
import { MdOutlineBalance } from "react-icons/md";
import ProcessChart from "./_compoenents/ProcessChart";
import TaskCard from "./_compoenents/TaskCard";
import FinanceChart from "./_compoenents/FinanceChart";

function Dashboard() {
  return (
    <div className="max-w-[1700px] m-auto">
      <Header title="Painel" />

      <div className="mt-6 bg-white rounded-md p-4 shadow-custom mb-6">
        <h3 className="font-medium mb-4">Resumo do meu mês</h3>

        <div className="grid grid-col-span-1 md:grid-cols-4 gap-8">
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
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4  min-h-64 flex flex-col">
            <h3 className="font-semibold text-gray-500 text-sm mb-4">INDICADORES DE DESEMPENHO</h3>

            <div className="flex-grow bg-white rounded-md  shadow-custom p-4">
              <ProcessChart />
            </div>
          </div>

          <div className="col-span-12 md:col-span-2 rounded-md min-h-64 flex gap-4 flex-col">
            <div className="h-5"></div>

            <div className="flex gap-2 items-center bg-white shadow-custom flex-grow p-4 rounded-md">
              <div className="text-2xl font-semibold">104</div>
              <div className="">
                <div className="text-sm">processos ao total</div>
              </div>
            </div>

            <div className="flex gap-2 items-center bg-white shadow-custom flex-grow p-4 rounded-md">
              <div className="text-2xl font-semibold">80</div>
              <div className="">
                <div className="text-sm">Finzalizados</div>
              </div>
            </div>

            <div className="flex gap-2 items-center bg-white shadow-custom flex-grow p-4 rounded-md">
              <div className="text-2xl font-semibold">24</div>
              <div className="">
                <div className="text-sm">Ativos</div>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-6  min-h-64 flex flex-col">
            <h3 className="font-semibold text-gray-500 text-sm mb-4">RESUMO FINANCEIRO</h3>

            <div className="flex-grow bg-white rounded-md  shadow-custom p-4">
              <FinanceChart />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-500 text-sm mb-4">ATIVIDADES</h3>

        <div className="flex flex-col gap-4">
          <TaskCard />
          <TaskCard />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
