"use client";

import { Button } from "@/app/_components/ui/Button";

function ButtonsSection() {
  return (
    <div className="flex gap-2">
      <Button className="bg-green-700 hover:bg-gray-800">Conta a receber</Button>
      <Button className="bg-red-700 hover:bg-red-800">Conta a pagar</Button>
    </div>
  );
}

export default ButtonsSection;
