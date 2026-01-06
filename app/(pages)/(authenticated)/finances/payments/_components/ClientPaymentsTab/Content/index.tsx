"use client";

import { GetAllPaymentsParams, PaymentDataType } from "@/app/_services/finanances";
import ClientPaymentsTable from "../ClientPaymentsTable";
import Header from "../Header";
import { usePayments } from "@/app/_hooks/finances";
import { useState } from "react";
import Skeleton from "@/app/_components/ui/Skeleton";
import PaymentModal from "@/app/_components/patterns/Payments/PaymentModal";
import PayPaymentModal from "@/app/_components/patterns/Payments/PayPaymentModal";
import { LuUsers } from "react-icons/lu";

function Content({ data: initialData }: { data: PaymentDataType[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [paymentToPay, setPaymentToPay] = useState<PaymentDataType>();

  const [filters, setFilters] = useState<GetAllPaymentsParams>({});
  const { data, isLoading, refetch } = usePayments({
    filters,
    initialData: initialData,
  });

  return (
    <div className="min-h-[calc(100vh-1.5rem)] flex flex-col h-full">
      <div className="p-2 border-b w-full mb-4">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuUsers className="size-5" />
          <span className="text-base font-semibold">Pagamento dos clientes</span>
        </div>
      </div>

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
