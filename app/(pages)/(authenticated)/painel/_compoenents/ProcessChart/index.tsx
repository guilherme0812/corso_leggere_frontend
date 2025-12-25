"use client";

import { numberFormat } from "@/app/_utils";
import { LineChart } from "carbonfair-ui";

export default function ProcessChart() {
  const data = [
    {
      label: "01",
      newCases: 10,
      closedCases: 5,
    },
    {
      label: "02",
      newCases: 10,
      closedCases: 5,
    },
    {
      label: "03",
      newCases: 0,
      closedCases: 0,
    },
    {
      label: "04",
      newCases: 10,
      closedCases: 5,
    },
    {
      label: "05",
      newCases: 5,
      closedCases: 4,
    },
    {
      label: "06",
      newCases: 10,
      closedCases: 5,
    },
    {
      label: "07",
      newCases: 8,
      closedCases: 10,
    },
    {
      label: "08",
      newCases: 4,
      closedCases: 12,
    },
    {
      label: "09",
      newCases: 1,
      closedCases: 11,
    },
    {
      label: "10",
      newCases: 0,
      closedCases: 0,
    },
    {
      label: "11",
      newCases: 10,
      closedCases: 5,
    },
    {
      label: "12",
      newCases: 10,
      closedCases: 20,
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const date = payload[0]?.payload?.month;
      console.log(payload);
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

  return (
    <div className="w-full h-full text-xs">
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
  );
}
