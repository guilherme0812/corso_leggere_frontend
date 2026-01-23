"use client";

import { FinancialCompanyReportDataType } from "@/app/_services/finanances";
import { numberFormat } from "@/app/_utils";
import { typeTranslate } from "@/app/_utils/beneficiaries";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ExpenseByBeneficiaryChart({
  data,
}: {
  data: Pick<FinancialCompanyReportDataType, "expenseByBeneficiary">;
}) {
  const { expenseByBeneficiary } = data;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload?.find((item: any) => item.dataKey === "totalAmount");
      const realName = data?.payload?.realName;
      const type = data?.payload?.type;
      const expense = data?.value;

      return (
        <div className="bg-background shadow-md p-2 text-sm">
          <div className="flex items-center gap-2">
            <div>{(typeTranslate as any)[type]}:</div>
            <div>{realName}</div>
          </div>
          <div className="font-semibold text-red-500">
            Despesa:{" "}
            <span className="font-semibold">
              {numberFormat(expense, "pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full h-full text-xs flex flex-col justify-between">
      <div className="w-full h-full text-xs">
        <ResponsiveContainer width="100%" height={"100%"}>
          <BarChart
            data={
              expenseByBeneficiary.map((item, index) => {
                const nameSplitted = item.beneficiary.name.split(" ");

                return {
                  id: index,
                  totalAmount: item.totalAmount,
                  name: `${nameSplitted[0][0]}. ${nameSplitted[1]}`,
                  realName: item.beneficiary.name,
                  type: item.beneficiary.type,
                  document: item.beneficiary.document,
                };
              }) || []
            }
            layout="vertical"
            margin={{ left: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              type="number"
              tick={({ x, y, payload }: any) => (
                <g>
                  <text x={x - 20} y={y + 10} className="text-xs">
                    R$ {numberFormat(payload.value)}
                  </text>
                </g>
              )}
            />

            <YAxis
              dataKey="name"
              type="category"
              tick={({ x, y, payload }: any) => (
                <g>
                  <text x={x - 80} y={y} className="text-xs">
                    {payload.value}
                  </text>
                </g>
              )}
            />

            <Tooltip content={CustomTooltip} />

            <Bar dataKey="totalAmount" fill="#FECACA" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
