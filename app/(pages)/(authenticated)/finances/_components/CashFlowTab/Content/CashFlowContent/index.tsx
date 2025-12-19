"use client";

import { CashFlowDataType, GetMonthReportParams } from "@/app/_services/finanances";
import { useState } from "react";
import Header from "../../Header";
import FinancialTransitionsTable from "../../FinancialTransitionsTable";
import { useCashFLow } from "@/app/_hooks/finances";
import moment from "moment";

function CashFlowContentWrapper({ data: initialData }: { data: CashFlowDataType[] }) {
  const start = moment().clone().startOf("month").toDate();
  const end = moment().clone().endOf("month").toDate();

  const [filters, setFilters] = useState<GetMonthReportParams>({
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  });

  const { data, refetch } = useCashFLow({
    filters,
    initialData: initialData,
  });
  return (
    <div>
      <Header {...{ filters, refetch, setFilters }} />

      <div className="h-[55vh] w-full relative mt-4">
        <FinancialTransitionsTable data={data || []} handleSelecRecord={() => {}}
        
        />
      </div>
    </div>
  );
}

export default CashFlowContentWrapper;
