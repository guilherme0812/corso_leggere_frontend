"use client";

import { CashFlowDataType, GetMonthReportParams } from "@/app/_services/finanances";
import { useState } from "react";
import Header from "../../Header";
import FinancialTransitionsTable from "../../FinancialTransitionsTable";
import { useProjectionFLow } from "@/app/_hooks/finances";
import moment from "moment";
import PayPaymentModal from "@/app/_components/patterns/Payments/PayPaymentModal";

function ProjectionFlowContentWrapper({ data: initialData }: { data: CashFlowDataType[] }) {
  const start = moment().clone().startOf("month").toDate();
  const end = moment().clone().endOf("month").toDate();
  const [financialEntryToPay, setFinancialEntryToPay] = useState<CashFlowDataType>();

  const [filters, setFilters] = useState<GetMonthReportParams>({
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  });

  const { data, refetch } = useProjectionFLow({
    filters,
    initialData: initialData,
  });
  return (
    <div>
      <Header {...{ filters, refetch, setFilters }} />

      <div className="h-[55vh] w-full relative mt-4">
        <FinancialTransitionsTable data={data || []} handleSelecRecord={setFinancialEntryToPay} />
      </div>

      {financialEntryToPay ? (
        <PayPaymentModal
          financialEntryId={financialEntryToPay.id}
          splits={financialEntryToPay.split ? [financialEntryToPay.split] : []}
          case={financialEntryToPay.case as any}
          handleClose={() => setFinancialEntryToPay(undefined)}
          status={financialEntryToPay.status}
          description={financialEntryToPay?.description}
          amount={financialEntryToPay.amount}
          dueDate={financialEntryToPay.dueDate}
        />
      ) : null}
    </div>
  );
}

export default ProjectionFlowContentWrapper;
