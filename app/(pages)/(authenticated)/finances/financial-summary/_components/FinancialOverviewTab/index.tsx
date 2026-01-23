"use client";

import FinancesTable from "./FinancesTable";
import { LuArrowDownRight, LuArrowUpRight, LuDollarSign, LuTrendingUp } from "react-icons/lu";
// import moment from "moment";
import { numberFormat } from "@/app/_utils";
import { LucideBarChart3 } from "lucide-react";
import ButtonsSection from "../ButtonsSection";
import { useFinancialCompanyReport, useTransactions } from "@/app/_hooks/finances";
import moment from "moment";
import ExpenseByBeneficiaryChart from "../ExpenseByBeneficiaryChart";
import IncomeByCaseChart from "../IncomeByCaseChart";
import Skeleton from "@/app/_components/ui/Skeleton";

function FinancialOverviewTab() {
  const startDate = moment().subtract(12, "months").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");
  const { data: companyReportData, isFetching: companyReportIsLoading } = useFinancialCompanyReport({
    params: { startDate, endDate },
  });
  const { data: transactions, isFetching: transactionsIsLoading } = useTransactions({
    filters: { limit: 5 },
    initialData: [],
  });

  return (
    <>
      <div className="p-2 border-b w-full mb-4">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuDollarSign className="size-5" />
          <span className="text-base font-semibold">Resumo financeiro</span>
        </div>
      </div>

      <div className="bg-white rounded-md p-4 shadow-custom mb-4 flex justify-end gap-4">
        {!companyReportIsLoading ? (
          <ButtonsSection />
        ) : (
          <Skeleton className="h-[40px] w-[250px] bg-gray-300 rounded-md" />
        )}
      </div>

      <div>
        <h3 className="font-semibold text-gray-500 text-sm mb-2 uppercase">Resumo das movimentações financeiras</h3>
        {!companyReportIsLoading && companyReportData ? (
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
                {numberFormat(companyReportData?.summary.currentBalance || 0, "pt-br", {
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
              <p className="text-slate-600 text-sm font-medium mb-1">Receitas</p>
              <p className="text-2xl font-bold text-slate-900">
                {numberFormat(companyReportData?.summary.totalIncome || 0, "pt-br", {
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
              <p className="text-slate-600 text-sm font-medium mb-1">Despesas</p>
              <p className="text-2xl font-bold text-slate-900">
                {numberFormat(companyReportData?.summary.totalExpenses || 0, "pt-br", {
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
                {numberFormat(companyReportData?.summary.netProfit || 0, "pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              {/* <p className="text-emerald-100 text-xs mt-2">Margem: 64%</p> */}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Skeleton className="h-[145px] bg-gray-300 w-full rounded-md" />
            <Skeleton className="h-[145px] bg-gray-300 w-full rounded-md" />
            <Skeleton className="h-[145px] bg-gray-300 w-full rounded-md" />
            <Skeleton className="h-[145px] bg-gray-300 w-full rounded-md" />
          </div>
        )}
      </div>

      {!transactionsIsLoading || !companyReportIsLoading ? (
        <div className="grid grid-cols-11 gap-4">
          <div className="col-span-12 md:col-span-3 min-h-[45vh] flex flex-col">
            <h3 className="font-semibold text-gray-500 text-sm mb-2 uppercase">Receita por processo</h3>

            <div className="flex-grow bg-white rounded-md  shadow-custom p-4">
              {companyReportData && <IncomeByCaseChart data={companyReportData} />}
            </div>
          </div>

          <div className="col-span-12 md:col-span-3 min-h-[45vh] flex flex-col">
            <h3 className="font-semibold text-gray-500 text-sm mb-2 uppercase">despesas por Beneficiario</h3>

            <div className="flex-grow bg-white rounded-md  shadow-custom p-4">
              {companyReportData && <ExpenseByBeneficiaryChart data={companyReportData} />}
            </div>
          </div>

          <div className="col-span-12 md:col-span-5 min-h-[40vh] flex flex-col">
            <h3 className="font-semibold text-gray-500 text-sm mb-2 uppercase">As últimas movimentações financeiras</h3>

            <div className="flex-grow bg-white rounded-md  shadow-custom">
              <FinancesTable data={transactions || []} />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-11 gap-4">
          <Skeleton className="col-span-12 md:col-span-3 min-h-[45vh] bg-gray-300 rounded-md" />
          <Skeleton className="col-span-12 md:col-span-3 min-h-[45vh] bg-gray-300 rounded-md" />
          <Skeleton className="col-span-12 md:col-span-5 min-h-[45vh] bg-gray-300 rounded-md" />
        </div>
      )}
    </>
  );
}

export default FinancialOverviewTab;
