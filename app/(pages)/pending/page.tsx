import { Button } from "@/app/_components/ui/Button";
import { UserDataType, UserStatusEnum } from "@/app/_types/login";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdOutlineBalance } from "react-icons/md";

async function Page() {
  const session = await getServerSession(authOptions);

  if ((session?.user as any as UserDataType)?.status == UserStatusEnum.ACTIVE) {
    return redirect("/pending");
  }
  return (
    <div className="p-8 h-[100vh] w-full flex items-center">
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

        <div className="flex justify-center">
          <Link href={"/painel"}>
            <Button>Tentar novamente</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
