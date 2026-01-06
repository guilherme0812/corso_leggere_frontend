import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { getCashFlow, getProjectionFlow } from "@/app/_services/finanances";
import moment from "moment";
import CashFlowContentWrapper from "./Content/CashFlowContent";
import ProjectionFlowContentWrapper from "./Content/ProjectionFlowContent";
import { MdCurrencyExchange } from "react-icons/md";

async function CashFlowTab() {
  const start = moment().clone().startOf("month");

  const end = moment().clone().endOf("month");
  const realCashFlow = await getCashFlow({
    startDate: start.format("YYYY-MM-DD"),
    endDate: end.format("YYYY-MM-DD"),
  });
  const projectedCashFlow = await getProjectionFlow({
    startDate: start.format("YYYY-MM-DD"),
    endDate: end.format("YYYY-MM-DD"),
  });

  return (
    <div className="">
      <div className="p-2 border-b w-full mb-4">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <MdCurrencyExchange className="size-5" />
          <span className="text-base font-semibold">Movimentação financeira</span>
        </div>
      </div>

      <Tabs
        defaultValue="1"
        // className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-[calc(100vh-1.5rem)] max-h-full"
      >
        <div className="">
          <TabsList>
            <TabsTrigger value="1">Caixa Realizado</TabsTrigger>
            <TabsTrigger value="2">Caixa Previsto</TabsTrigger>
          </TabsList>
        </div>

        <div className="overflow-y-auto ">
          <TabsContent value="1" className="w-full overflow-y-auto pb-4">
            <CashFlowContentWrapper data={realCashFlow || []} />
          </TabsContent>

          <TabsContent value="2">
            <ProjectionFlowContentWrapper data={projectedCashFlow || []} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default CashFlowTab;
