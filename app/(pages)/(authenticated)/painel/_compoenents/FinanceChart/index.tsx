"use client";

import { MonthReport } from "@/app/_services/finanances";
import { numberFormat } from "@/app/_utils";
import { LineChart } from "carbonfair-ui";

export default function FinanceChart({ data }: { data: MonthReport[] }) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const date = payload[0]?.payload?.month;
      const expense = payload?.find((item: any) => item.dataKey === "total_paid")?.value;
      const income = payload?.find((item: any) => item.dataKey === "total_received")?.value;

      return (
        <div className="bg-background shadow-md p-2 text-sm">
          <div></div>
          <div className="">{date}</div>
          <div className="font-semibold text-green-500">Receita: {numberFormat(income)}</div>
          <div className="font-semibold text-red-500">Despesa: {numberFormat(expense)}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-full h-full text-xs flex flex-col justify-between">
      <div className="w-full h-[calc(100%-30px)] text-xs">
        <LineChart
          width={"100%"}
          height={"100%"}
          data={data}
          yAxisProps={
            {
              axisLine: false,
              tickLine: false,
              tick: ({ x, y, payload }: any) => (
                <g>
                  <text x={x - 35} y={y} className="text-xs">
                    {numberFormat(payload.value)}
                  </text>
                </g>
              ),
            } as any
          }
          xAxisProps={
            {
              axisLine: false,
              tickLine: false,
              tick: ({ x, y, payload }: any) => (
                <g>
                  <text x={x - 20} y={y + 10} className="text-xs">
                    {/* {moment(payload.value).format("MM/YYYY")} */}
                    {payload.value}
                  </text>
                </g>
              ),
            } as any
          }
          lineList={[
            {
              type: "monotone",
              dataKey: "total_received",
              stroke: "#588157 ",
              strokeWidth: 3,
            },
            {
              type: "monotone",
              dataKey: "total_paid",
              stroke: "#ef233c ",
              strokeWidth: 3,
            },
          ]}
          showLegend={false}
          margin={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          xAxisDataKey="month"
          tooltipProps={{
            content: <CustomTooltip />,
          }}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#588157]"></div>
          <div>Valor recebido</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ef233c]"></div>
          <div>Valor pago</div>
        </div>
      </div>
    </div>
  );
}
