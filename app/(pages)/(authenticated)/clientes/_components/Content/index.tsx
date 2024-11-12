"use client";

import { Input } from "@/app/_components/ui/Input";

function Content() {
  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <div className="h-full grid grid-cols-12 shadow-md bg-white p-4">
        <div className="col-span-3">
          <div>Nome do cliente</div>
          <Input variant="filled" />
        </div>
      </div>
      <div className="h-full"></div>
    </div>
  );
}

export default Content;
