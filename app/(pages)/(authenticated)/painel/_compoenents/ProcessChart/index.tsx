"use client";

import { numberFormat } from "@/app/_utils";
import { LineChart } from "carbonfair-ui";

export default function ProcessChart() {
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Fev",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Abr",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Mai",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
    {
      name: "Ago",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Set",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Out",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Nov",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Dez",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
  ];

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
                  {numberFormat(payload.value)}
                </text>
              </g>
            ),
          } as any
        }
        lineList={[
          {
            type: "monotone",
            dataKey: "pv",
            stroke: "#ca8a04 ",
            strokeWidth: 3,
          },
          {
            type: "monotone",
            dataKey: "uv",
            stroke: "#9333ea ",
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
      />
    </div>
  );
}
