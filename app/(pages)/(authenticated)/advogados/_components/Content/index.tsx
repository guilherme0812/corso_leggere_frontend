"use client";

import { IAttorney } from "@/app/_services/attorney";
import AttorneyHeader from "../AttorneyHeader";
import { useEffect, useState } from "react";
import AttorneyTable from "../AttorneyTable";

function Content({ attorneys }: { attorneys: IAttorney[] }) {
  const [data, setData] = useState(attorneys);

  useEffect(() => {
    setData(() => attorneys);
  }, [attorneys]);

  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <AttorneyHeader data={data} />

      <AttorneyTable data={data} handleDelete={() => {}} handleEdit={() => {}} />
    </div>
  );
}

export default Content;
