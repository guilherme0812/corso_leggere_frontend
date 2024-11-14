"use client";

import TableClients from "../../../clientes/_components/TableClients";
import Header from "../Header";

function Content() {
  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <Header />
      <div className="h-full">
        <TableClients />
      </div>
    </div>
  );
}

export default Content;
