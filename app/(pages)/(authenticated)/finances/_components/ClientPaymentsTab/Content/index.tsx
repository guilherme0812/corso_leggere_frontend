"use client";

import { GetAllPaymentsParams, PaymentDataType } from "@/app/_services/finanances";
import ClientPaymentsTable from "../ClientPaymentsTable";
import Header from "../Header";
import { usePayments } from "@/app/_hooks/finances";
import { useState } from "react";
import Skeleton from "@/app/_components/ui/Skeleton";
import PaymentModal from "@/app/_components/patterns/Payments/PaymentModal";
import PayPaymentModal from "@/app/_components/patterns/Payments/PayPaymentModal";

function Content({ data: initialData }: { data: PaymentDataType[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [paymentToPay, setPaymentToPay] = useState<PaymentDataType>();

  const [filters, setFilters] = useState<GetAllPaymentsParams>({});
  const { data, isLoading, refetch } = usePayments({
    filters,
    initialData: initialData,
  });

  return (
    <div className="h-full md:min-h-[80vh] flex flex-col">
      <Header {...{ filters, setFilters, refetch }} openModal={openModal} setOpenModal={setOpenModal} />

      <div className="flex-grow relative mt-4">
        {isLoading ? (
          <>
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
          </>
        ) : (
          <ClientPaymentsTable data={data || []} handlePay={setPaymentToPay} />
        )}
      </div>

      {openModal ? <PaymentModal editData={undefined} handleClose={() => setOpenModal(false)} /> : undefined}

      {paymentToPay ? (
        <PayPaymentModal
          financialEntryId={paymentToPay?.entries[0]?.id}
          splits={paymentToPay.splits || []}
          case={paymentToPay.case as any}
          handleClose={() => setPaymentToPay(undefined)}
          amount={paymentToPay.amount}
          status={paymentToPay.status}
          dueDate={paymentToPay.dueDate}
        />
      ) : null}
    </div>
  );
}

export default Content;
