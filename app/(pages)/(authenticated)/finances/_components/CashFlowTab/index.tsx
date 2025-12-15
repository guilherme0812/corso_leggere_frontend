import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import { getCashFlow, getProjectionFlow } from "@/app/_services/finanances";
import moment from "moment";
import FinancialTransitionsTable from "./FinancialTransitionsTable";

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
            <TabsTrigger value="1">Fluxo de caixa</TabsTrigger>
            <TabsTrigger value="2">Projeção</TabsTrigger>
          </TabsList>
        </div>

        <div className="overflow-y-auto ">
          <TabsContent value="1" className="w-full overflow-y-auto pb-4">
            <div className="h-[70vh]">
              <FinancialTransitionsTable data={realCashFlow || []} />
            </div>
          </TabsContent>

          <TabsContent value="2">
            <div className="h-[70vh]">
              <FinancialTransitionsTable data={projectedCashFlow || []} />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default CashFlowTab;
