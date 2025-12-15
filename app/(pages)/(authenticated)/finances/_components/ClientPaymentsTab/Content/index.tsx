"use client";

import { PaymentDataType } from "@/app/_services/finanances";
import ClientPaymentsTable from "../ClientPaymentsTable";
import Header from "../Header";

function Content({ data }: { data: PaymentDataType[] }) {
  console.log("data", data);
  return (
    <div className="h-full md:min-h-[80vh] flex flex-col">
      <Header  />
      
      <div className="flex-grow relative">
        <ClientPaymentsTable data={data} />
      </div>
    </div>
  );
}

export default Content;
