"use client";

import { Button } from "@/app/_components/ui/Button";
import { useState } from "react";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";
import CreateTransactionModal from "../CreateTransactionModal";

function ButtonsSection() {
  const [type, setType] = useState<"INCOME" | "EXPENSE">();

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => setType("INCOME")}
        className="transition-all bg-gradient-to-br from-emerald-500 to-emerald-600  hover:from-emerald-500 duration-500 hover:to-emerald-700"
      >
        <LuArrowUpRight /> Conta a receber
      </Button>
      <Button
        onClick={() => setType("EXPENSE")}
        className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
      >
        <LuArrowDownRight /> Conta a pagar
      </Button>

      {type ? <CreateTransactionModal type={type} handleClose={() => setType(undefined)} /> : null}
    </div>
  );
}

export default ButtonsSection;
