"use client";

import { Button } from "@/app/_components/ui/Button";
import Skeleton from "@/app/_components/ui/Skeleton";
import { useCaseTimeSeries } from "@/app/_hooks/cases";
import { CaseTimeSeriesPeriod } from "@/app/_services/case";
import { numberFormat } from "@/app/_utils";
import { LineChart } from "carbonfair-ui";
import { useState } from "react";

export default function ProcessChart() {
  const [period, setPeriod] = useState<CaseTimeSeriesPeriod>("month");
  const { data, isLoading } = useCaseTimeSeries({ filters: { period: period }, initialData: [] });

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const date = payload[0]?.payload?.month;
      const closedCases = payload?.find((item: any) => item.dataKey === "closedCases")?.value;
      const newCases = payload?.find((item: any) => item.dataKey === "newCases")?.value;

      return (
        <div className="bg-background shadow-md p-2 text-sm">
          <div></div>
          <div className="">{date}</div>
          <div className="font-semibold" style={{ color: "#ca8a04" }}>
            Novos prpcessos: {numberFormat(newCases)}
          </div>
          <div className="font-semibold" style={{ color: "#588157" }}>
            Processos finalizados: {numberFormat(closedCases)}
          </div>
        </div>
      );
    }

    return null;
  };

  if (isLoading) {
    return (
      <>
        <Skeleton className="w-full h-10 mb-1 bg-gray-200" />
        <Skeleton className="w-full h-10 mb-1 bg-gray-200" />
        <Skeleton className="w-full h-10 mb-1 bg-gray-200" />
        <Skeleton className="w-full h-10 mb-1 bg-gray-200" />
      </>
    );
  }

  return (
    <div className="w-full h-full">
      <div className="h-[40px] flex justify-end gap-2">
        <Button size={"sm"} variant={period == "week" ? "secondary" : "ghost"} className="h-7 rounded-full" onClick={() => setPeriod("week")}>
          semana
        </Button>
        <Button size={"sm"} variant={period == "month" ? "secondary" : "ghost"} className="h-7 rounded-full" onClick={() => setPeriod("month")}>
          mensal
        </Button>
        <Button size={"sm"} variant={period == "year" ? "secondary" : "ghost"} className="h-7 rounded-full" onClick={() => setPeriod("year")}>
          anual
        </Button>
      </div>
      <div className="w-full h-[calc(100%-40px)] text-xs">
        <LineChart
          width={"100%"}
          height={"100%"}
          data={data || []}
          yAxisProps={
            {
              axisLine: false,
              tickLine: false,
              tick: ({ x, y, payload }: any) => (
                <g>
                  <text x={x - 35} y={y} className="text-xs">
                    {payload.value}
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
                    {payload.value}
                  </text>
                </g>
              ),
            } as any
          }
          lineList={[
            {
              type: "monotone",
              dataKey: "newCases",
              stroke: "#ca8a04",
              strokeWidth: 3,
            },
            {
              type: "monotone",
              dataKey: "closedCases",
              stroke: "#588157",
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
          xAxisDataKey="label"
          tooltipProps={{
            content: <CustomTooltip />,
          }}
        />
      </div>
    </div>
  );
}
