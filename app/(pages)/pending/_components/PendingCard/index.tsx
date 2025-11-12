"use client";

import { Button } from "@/app/_components/ui/Button";
import Link from "next/link";
import { MdOutlineBalance } from "react-icons/md";
import { signOut } from "next-auth/react";
import { LuLogOut } from "react-icons/lu";

function PendingCard() {
  return (
    <div className="p-4 bg-background w-full max-w-[500px] rounded-md m-auto shadow-custom">
      <header className=" w-full">
        <div className="flex gap-4 items-center justify-center">
          <div className="relative">
            <MdOutlineBalance className="text-xl" />
          </div>
          <h1 className="text-xl text-center font-medium">Leggere</h1>
        </div>
      </header>

      <div className="text-center mt-4">
        Estamos preparando tudo; basta aguardar até que seu usuário seja vinculado a uma empresa.{" "}
      </div>

      <div className="flex justify-center mt-8 flex-col gap-4 items-center">
        <Link href={"/painel"}>
          <Button>Tentar novamente</Button>
        </Link>

        <hr className="border-t border-gray-300 w-full" />

        <Button variant="outline" onClick={() => signOut()}>
          <LuLogOut />
          Sair desta conta
        </Button>
      </div>
    </div>
  );
}

export default PendingCard;
