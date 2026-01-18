import { useAttorneyPendingPayments, useAttorneyReceivedByCase, useAttorneyTotalReceived } from "@/app/_hooks/attorney";
import { IAttorney } from "@/app/_services/attorney";
import { numberFormat } from "@/app/_utils";
import { LucideBarChart3 } from "lucide-react";
import { LuArrowLeft, LuArrowUpRight, LuCreditCard, LuDollarSign } from "react-icons/lu";
import ReceivedByCaseTable from "./ReceivedByCaseTable";
import PendingPaymentsTable from "./PendingPaymentsTable";

interface FinancialAttorneyCardProps {
  data: IAttorney;
  handleBack: () => void;
}

function FinancialAttorneyCard({ data, handleBack }: FinancialAttorneyCardProps) {
  const { data: cases } = useAttorneyReceivedByCase({
    filters: {
      attorneyId: data.id,
    },
  });

  const { data: totalReceivedData } = useAttorneyTotalReceived({
    filters: {
      attorneyId: data.id,
    },
  });

  const { data: pendingPayments } = useAttorneyPendingPayments({
    filters: {
      attorneyId: data.id,
    },
    initialData: [],
  });

  return (
    <div>
      <div>
        <button
          onClick={() => handleBack()}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-black transition-colors group font-medium"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
            <LuArrowLeft className="w-5 h-5" />
          </div>
          <span className="">Voltar</span>
        </button>
      </div>

      <div>
        <div className="grid grid-cols-12 gap-4 mb-6">
          <div className="col-span-6 md:col-col-span-5 xl:col-span-3 p-4 border-2 rounded-xl flex gap-4">
            <div
              className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br bg-blue-600 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all group-hover:scale-110`}
            >
              <span className="text-xl font-black text-white">
                {data.firstName[0]} {data.lastName[0]}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-black text-gray-900 group-hover:text-white transition-colors mb-1">
                {data.firstName} {data.lastName}
              </h3>

              <div className="flex items-center gap-3">
                <div className="px-2 md:px-4 md:py-1 bg-gray-200 rounded-full">
                  <span className="text-gray-700 font-medium text-xs">{data.licenceJurisdiction}</span>
                </div>
                <div className="px-4 py-1 bg-gray-200 rounded-full">
                  <span className="text-gray-700 font-medium text-xs">{data.licenceNumber}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 xl:col-span-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-4 text-white shadow-xl shadow-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <LuDollarSign className="w-4 h-4" />
              </div>
              <LucideBarChart3 className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Total recebido</p>
            <p className="text-2xl font-bold">
              {numberFormat(totalReceivedData?.amount || 0, "pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            {/* <p className="text-emerald-100 text-xs mt-2">Margem: 64%</p> */}
          </div>

          <div className="col-span-4 xl:col-span-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 text-white shadow-xl shadow-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <LuArrowUpRight className="w-4 h-4" />
              </div>
              <LucideBarChart3 className="w-5 h-5 opacity-80" />
            </div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Total a receber</p>
            <p className="text-2xl font-bold">
              {numberFormat(
                pendingPayments?.reduce((sum, s) => {
                  if (s.percentage) {
                    return sum + (s.percentage || 0);
                  }

                  return sum + (s.fixedAmount || 0);
                }, 0) || 0,
                "pt-br",
                {
                  style: "currency",
                  currency: "BRL",
                },
              )}
            </p>
            {/* <p className="text-emerald-100 text-xs mt-2">Margem: 64%</p> */}
          </div>

          <div className="col-span-4 xl:col-span-3 bg-gradient-to-br from-purple-500 to-blue-700 rounded-2xl p-4 text-white shadow-xl shadow-emerald-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <LuCreditCard className="w-4 h-4" />
              </div>
            </div>
            <p className="text-emerald-100 text-sm font-medium mb-1">Total pagamentos pendentes</p>
            <p className="text-2xl font-bold">{numberFormat(pendingPayments?.length || 0)}</p>
            {/* <p className="text-emerald-100 text-xs mt-2">Margem: 64%</p> */}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-500 text-sm mb-2 uppercase">Resumo pago por processo</h3>
        <div className="relative  h-[30vh]">
          <ReceivedByCaseTable data={cases || []} />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-500 text-sm mb-2 uppercase">Pagamentos pendentes</h3>
        <div className="relative  h-[50vh]">
          <PendingPaymentsTable data={pendingPayments || []} />
        </div>
      </div>
    </div>
  );
}

export default FinancialAttorneyCard;
