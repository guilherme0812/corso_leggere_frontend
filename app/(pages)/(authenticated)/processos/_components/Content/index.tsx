"use client";

import { ICase } from "@/app/_services/case";
import Header from "../Header";
import TableProceeding from "../TableProceeding";
import { useEffect, useState } from "react";

function Content({ cases }: { cases: ICase[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<ICase[]>(cases);
  const [editData] = useState<ICase>();

  useEffect(() => {
    setData(() => cases);
  }, [cases]);

  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <Header {...{ data, editData, openModal, setOpenModal }} />

      <div className="h-full">
        <TableProceeding data={cases || []} handleDelete={() => {}} handleEdit={() => {}} />
      </div>
    </div>
  );
}

export default Content;
