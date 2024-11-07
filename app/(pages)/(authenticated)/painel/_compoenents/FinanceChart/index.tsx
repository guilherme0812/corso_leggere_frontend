"use client";

import { numberFormat } from "@/app/_utils";
import { LineChart } from "carbonfair-ui";

export default function FinanceChart() {
  const data = [
    {
      name: "Jan",
      valores_recebidos: 15000,
      valores_pagos: 18000,
      amt: 3000,
    },
    {
      name: "Fev",
      valores_recebidos: 22000,
      valores_pagos: 16000,
      amt: 3200,
    },
    {
      name: "Mar",
      valores_recebidos: 14000,
      valores_pagos: 19000,
      amt: 2800,
    },
    {
      name: "Abr",
      valores_recebidos: 21000,
      valores_pagos: 17000,
      amt: 3400,
    },
    {
      name: "Mai",
      valores_recebidos: 25000,
      valores_pagos: 20000,
      amt: 3000,
    },
    {
      name: "Jun",
      valores_recebidos: 18000,
      valores_pagos: 17000,
      amt: 2500,
    },
    {
      name: "Jul",
      valores_recebidos: 20000,
      valores_pagos: 15000,
      amt: 2700,
    },
    {
      name: "Ago",
      valores_recebidos: 17000,
      valores_pagos: 10000,
      amt: 2600,
    },
    {
      name: "Set",
      valores_recebidos: 19000,
      valores_pagos: 16000,
      amt: 2900,
    },
    {
      name: "Out",
      valores_recebidos: 22000,
      valores_pagos: 24000,
      amt: 3100,
    },
    {
      name: "Nov",
      valores_recebidos: 15000,
      valores_pagos: 18000,
      amt: 2700,
    },
    {
      name: "Dez",
      valores_recebidos: 24000,
      valores_pagos: 16000,
      amt: 3300,
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
            dataKey: "valores_recebidos",
            stroke: "#588157 ",
            strokeWidth: 3,
          },
          {
            type: "monotone",
            dataKey: "valores_pagos",
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
      />
    </div>
  );
}
