"use client";

import { GetTransactionsParams } from "@/app/_services/finanances";
import TransactionTable from "../TransactionTable";
import Header from "../Header";
import { useTransactions } from "@/app/_hooks/finances";
import { useState } from "react";
import Skeleton from "@/app/_components/ui/Skeleton";
import { LuPlus, LuUsers } from "react-icons/lu";
import { Button } from "@/app/_components/ui/Button";

function Content() {
  // const [openModal, setOpenModal] = useState(false);
  // const [paymentToPay, setPaymentToPay] = useState<PaymentDataType>();

  const [filters, setFilters] = useState<GetTransactionsParams>({});
  const { data, isLoading, refetch } = useTransactions({
    filters,
    // initialData: [],
  });

  return (
    <div className="min-h-[calc(100vh-1.5rem)] flex flex-col h-full">
      <div className="p-2 border-b w-full mb-4 flex justify-between">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuUsers className="size-5" />
          <span className="text-base font-semibold">Transações</span>
        </div>

        <Button
          variant={"outline"}
          // onClick={() => setOpenModal(true)}
        >
          <LuPlus />
          Nova Transação
        </Button>
      </div>

      <Header {...{ filters, setFilters, refetch }} />

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
          <TransactionTable
            data={data || []}
            // handlePay={setPaymentToPay}
          />
        )}
      </div>

      {/* {openModal ? <PaymentModal editData={undefined} handleClose={() => setOpenModal(false)} /> : undefined} */}

      {/* {paymentToPay ? <PayPaymentModal handleClose={() => setPaymentToPay(undefined)} data={paymentToPay} /> : null} */}
    </div>
  );
}

export default Content;
