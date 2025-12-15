import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/_components/ui/tabs";
import FinancialOverviewTab from "./_components/FinancialOverviewTab";
import CashFlowTab from "./_components/CashFlowTab";
import ClientPaymentsTab from "./_components/ClientPaymentsTab";
// import FinancialTransitionsTab from "./_components/FinancialTransitionsTab";

async function Page({}: { searchParams: { [key: string]: string } }) {
  return (
    <>
      <Tabs
        defaultValue="1"
        className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-[calc(100vh-1.5rem)] max-h-full"
      >
        <div className="bg-background shadow-custom p-4 mb-4 md:flex items-center justify-between">
          <div className="mb-2 font-medium">Financeiro</div>
          <TabsList>
            <TabsTrigger value="1">Resumo financeiro</TabsTrigger>
            <TabsTrigger value="2">Movimentação financeira</TabsTrigger>
            <TabsTrigger value="3">Pag. Clientes</TabsTrigger>
          </TabsList>
        </div>

        <div className="overflow-y-auto">
          <TabsContent value="1" className="w-full overflow-y-auto pb-4">
            <FinancialOverviewTab />
          </TabsContent>

          <TabsContent value="2">
            <CashFlowTab />
          </TabsContent>

          <TabsContent value="3">
            <ClientPaymentsTab />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}

export default Page;
