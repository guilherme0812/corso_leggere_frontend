"use client";

import Header from "../Header";
import TableProceeding from "../TableProceeding";

function Content() {
  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <Header />
      <div className="h-full">
        <TableProceeding />
      </div>
    </div>
  );
}

export default Content;
