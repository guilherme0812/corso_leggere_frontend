import { getFiancialSummary, getFinancialEntry, getMonthReports } from "@/app/_services/finanances";
import FinanceChart from "../../../painel/_compoenents/FinanceChart";
import FinancesTable from "./FinancesTable";
import { LuDollarSign, LuPlus } from "react-icons/lu";
import moment from "moment";
import { numberFormat } from "@/app/_utils";
import { IoArrowDown, IoArrowDownCircle, IoArrowUp, IoArrowUpCircle } from "react-icons/io5";
import ButtonsSection from "./ButtonsSection";

async function FinancialOverviewTab() {
  const startDate = moment().subtract(12, "months").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");

  const monthReports = await getMonthReports({
    startDate,
    endDate,
  });

  const summary = await getFiancialSummary({});
  const payments = await getFinancialEntry({
    limit: 5,
  });
  // const cashFlow = await getCashFlow({});

  // const payments = await getPayments({ startDueDate: firstDay, endDueDate: lastDay });
  // const paidPayments = payments?.filter((payment) => payment.status === PaymentStatus.PAID);
  // const pendingPayments = payments?.filter((payment) => payment.status === PaymentStatus.PENDING);
  // const latePayments = payments?.filter((payment) => payment.status === PaymentStatus.PENDING);

  return (
    <>
      {/* <ButtonsSection /> */}

      <div className="flex gap-4">
        <div className="text-white w-[300px] p-4 min-h-36 mb-6 border-2 bg-green-800 rounded-md flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 rounded-full bg-green-200 text-black flex justify-center items-center">
              <LuDollarSign />
            </div>
            <h3 className="">Saldo total</h3>
          </div>
          <div className="text-2xl font-bold">R$ {numberFormat(summary?.currencentBalance || 0)}</div>
        </div>

        <div className="min-w-[300px] p-4 min-h-36 mb-6 border-2 rounded-md flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 rounded-full bg-green-200 text-black flex justify-center items-center">
              <LuPlus />
            </div>
            
            <h3 className="">Criar conta</h3>
          </div>
          
          <div>
            <ButtonsSection />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md p-4 shadow-custom mb-4">
        <h3 className="font-semibold text-gray-500 text-sm mb-4 uppercase">Resumo das movimentações financeiras</h3>

        <div className="grid grid-col-span-1 md:grid-cols-4 gap-8">
          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <IoArrowDownCircle className="text-3xl text-green-600" />
            </div>

            <div>
              <div className="text-sm font-semibold leading-4">
                {numberFormat(summary?.received || 0)} total recebido
              </div>
              <div className="text-xs text-gray-600">Ver mais detalhes</div>
            </div>
          </div>

          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <IoArrowUpCircle className="text-3xl text-red-600" />
            </div>

            <div>
              <div className="text-sm font-semibold leading-4">{numberFormat(summary?.paid || 0)} total pago</div>
              <div className="text-xs text-gray-600">Ver mais detalhes</div>
            </div>
          </div>

          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <IoArrowDown className="text-3xl text-green-600" />
            </div>

            <div>
              <div className="text-sm font-semibold leading-4">{numberFormat(summary?.receivable || 0)} a receber</div>
              <div className="text-xs text-gray-600">Ver mais detalhes</div>
            </div>
          </div>

          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <IoArrowUp className="text-3xl text-red-600" />
            </div>

            <div>
              <div className="text-sm font-semibold leading-4">{numberFormat(summary?.payable || 0)} a pagar</div>
              <div className="text-xs text-gray-600">Ver mais detalhes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8 min-h-[40vh] flex flex-col">
          <h3 className="font-semibold text-gray-500 text-sm mb-4 uppercase">RESUMO FINANCEIRO DOS ULTIMOS 12 MESES</h3>

          <div className="flex-grow bg-white rounded-md  shadow-custom p-4">
            <FinanceChart data={monthReports || []} />
          </div>
        </div>

        <div className="col-span-12 md:col-span-4 min-h-[40vh] flex flex-col">
          <h3 className="font-semibold text-gray-500 text-sm mb-4 uppercase">As últimas movimentações financeiras</h3>

          <div className="flex-grow bg-white rounded-md  shadow-custom p-4">
            <FinancesTable data={payments || []} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FinancialOverviewTab;
