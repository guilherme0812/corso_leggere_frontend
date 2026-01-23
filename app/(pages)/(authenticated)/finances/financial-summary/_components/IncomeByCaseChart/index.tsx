"use client";

import { FinancialCompanyReportDataType } from "@/app/_services/finanances";
import { numberFormat } from "@/app/_utils";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function IncomeByCaseChart({ data }: { data: Pick<FinancialCompanyReportDataType, "incomeByCase"> }) {
  const { incomeByCase } = data;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload?.find((item: any) => item.dataKey === "totalAmount");
      const realName = data?.payload?.realName;
      const income = data?.value;

      return (
        <div className="bg-background shadow-md p-2 text-sm">
          <div className="flex items-center gap-2">
            <div>{realName}</div>
          </div>
          <div className="font-semibold text-green-500">
            Receita de:{" "}
            <span className="font-semibold">
              {numberFormat(income, "pt-BR", {
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={
              incomeByCase.map((item, index) => {
                return {
                  id: index,
                  totalAmount: item.totalAmount,
                  name: item.caseName.length > 10 ? item.caseName.slice(0, 10) : item.caseName,
                  realName: item.caseName,
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

            <Bar dataKey="totalAmount" fill="#66bba0" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
