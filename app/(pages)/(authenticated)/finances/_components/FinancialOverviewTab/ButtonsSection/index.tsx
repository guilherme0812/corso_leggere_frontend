"use client";

import { Button } from "@/app/_components/ui/Button";
import { useState } from "react";
import EntryPaymentModal from "../../ClientPaymentsTab/EntryPaymentModal";

function ButtonsSection() {
  const [entryPaymentModalType, setEntryPaymentModalType] = useState<"RECEIVABLE" | "PAYABLE">();

  return (
    <>
      <div className="flex gap-2">
        <Button className="bg-green-700 hover:bg-gray-800" onClick={() => setEntryPaymentModalType("RECEIVABLE")}>
          Conta a receber
        </Button>
        <Button className="bg-red-700 hover:bg-red-800" onClick={() => setEntryPaymentModalType("PAYABLE")}>
          Conta a pagar
        </Button>
      </div>

      {entryPaymentModalType ? (
        <EntryPaymentModal type={entryPaymentModalType} handleClose={() => setEntryPaymentModalType(undefined)} />
      ) : null}
    </>
  );
}

export default ButtonsSection;
