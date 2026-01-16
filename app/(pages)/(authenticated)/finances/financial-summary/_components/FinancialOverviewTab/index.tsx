import { getMonthReports, getTransactions } from "@/app/_services/finanances";
import FinanceChart from "../../../../painel/_compoenents/FinanceChart";
import FinancesTable from "./FinancesTable";
import { LuArrowDownRight, LuArrowUpRight, LuDollarSign, LuTrendingUp } from "react-icons/lu";
import moment from "moment";
import { numberFormat } from "@/app/_utils";
import { LucideBarChart3 } from "lucide-react";
import { Button } from "@/app/_components/ui/Button";

async function FinancialOverviewTab({ companyReportData }: { companyReportData: any }) {
  const mockData = companyReportData;

  const startDate = moment().subtract(12, "months").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");

  const monthReports = await getMonthReports({
    startDate,
    endDate,
  });

  // const summary = await getFiancialSummary({});
  const transactions = await getTransactions({
    limit: 5,
  });
  // const cashFlow = await getCashFlow({});

  // const payments = await getPayments({ startDueDate: firstDay, endDueDate: lastDay });
  // const paidPayments = payments?.filter((payment) => payment.status === PaymentStatus.PAID);
  // const pendingPayments = payments?.filter((payment) => payment.status === PaymentStatus.PENDING);
  // const latePayments = payments?.filter((payment) => payment.status === PaymentStatus.PENDING);

  return (
    <>
      <div className="p-2 border-b w-full mb-4">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuDollarSign className="size-5" />
          <span className="text-base font-semibold">Resumo financeiro</span>
        </div>
      </div>

      {/* <div className="flex gap-4">
        <div className="text-white w-[300px] p-4 min-h-36 mb-6 border-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 rounded-full bg-green-200 text-black flex justify-center items-center">
              <LuDollarSign />
            </div>
            <h3 className="font-semibold">Saldo total</h3>
          </div>
          <div className="text-2xl font-bold">R$ {numberFormat(summary?.currencentBalance || 0)}</div>
        </div>

        <div className="min-w-[300px] p-4 min-h-36 mb-6 border-2 rounded-md flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 rounded-full bg-green-200 text-black flex justify-center items-center">
              <LuPlus />
            </div>

            <h3 className="font-semibold">Criar conta</h3>
          </div>

          <div>
            <ButtonsSection />
          </div>
        </div>
      </div> */}

      <div className="bg-white rounded-md p-4 shadow-custom mb-4 flex justify-end gap-4">
        <Button className="transition-all bg-gradient-to-br from-emerald-500 to-emerald-600  hover:from-emerald-500 duration-500 hover:to-emerald-700">
          <LuArrowUpRight /> Conta a receber
        </Button>
        <Button className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700">
          <LuArrowDownRight /> Conta a pagar
        </Button>
      </div>

      <div>
        <h3 className="font-semibold text-gray-500 text-sm mb-2 uppercase">Resumo das movimentações financeiras</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Saldo em Caixa */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-xl shadow-blue-200">
            <div className="flex items-center justify-between mb-2">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <LuDollarSign className="w-4 h-4" />
              </div>
              <LuTrendingUp className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">Saldo em Caixa</p>
            <p className="text-2xl font-bold">
              {numberFormat(mockData.summary.currentBalance, "pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            {/* <p className="text-blue-100 text-xs mt-2">↑ 12% vs mês anterior</p> */}
          </div>

          {/* Receitas */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <LuArrowUpRight className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium"></span>
            </div>
            <p className="text-slate-600 text-sm font-medium mb-1">Receitas (mês)</p>
            <p className="text-2xl font-bold text-slate-900">
              {numberFormat(mockData.summary.totalIncome, "pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          {/* Despesas */}
          <div className="bg-white rounded-2xl p-4 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <LuArrowDownRight className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-red-600 text-sm font-medium"></span>
            </div>
            <p className="text-slate-600 text-sm font-medium mb-1">Despesas (mês)</p>
            <p className="text-2xl font-bold text-slate-900">
              {numberFormat(mockData.summary.totalExpenses, "pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          {/* Lucro Líquido */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white shadow-xl shadow-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <LuTrendingUp className="w-4 h-4" />
              </div>
              <LucideBarChart3 className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Lucro Líquido</p>
            <p className="text-2xl font-bold">
              {numberFormat(mockData.summary.netProfit, "pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            {/* <p className="text-emerald-100 text-xs mt-2">Margem: 64%</p> */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-7 min-h-[45vh] flex flex-col">
          <h3 className="font-semibold text-gray-500 text-sm mb-2 uppercase">RESUMO FINANCEIRO DOS ULTIMOS 12 MESES</h3>

          <div className="flex-grow bg-white rounded-md  shadow-custom p-4">
            <FinanceChart data={monthReports || []} />
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 min-h-[40vh] flex flex-col">
          <h3 className="font-semibold text-gray-500 text-sm mb-2 uppercase">As últimas movimentações financeiras</h3>

          <div className="flex-grow bg-white rounded-md  shadow-custom p-4">
            <FinancesTable data={transactions || []} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FinancialOverviewTab;
