import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { getCashFlow, getProjectionFlow } from "@/app/_services/finanances";
import moment from "moment";
import CashFlowContentWrapper from "./Content/CashFlowContent";
import ProjectionFlowContentWrapper from "./Content/ProjectionFlowContent";

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
