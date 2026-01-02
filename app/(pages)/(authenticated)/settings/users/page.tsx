// import { getCompany } from "@/app/_services/companies";
// import { LoginDataType } from "@/app/_types";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
// import { getServerSession } from "next-auth";
import { LuUsers } from "react-icons/lu";

async function Page() {
  //   const session = await getServerSession(authOptions);
  //   const user = session?.user as LoginDataType;
  //   const company = await get({ id: user?.companyId as string });

  //   if (!company) {
  //     return <> Internal error </>;
  //   }

  return (
    <div className="w-full">
      <div className="p-2 border-b w-full">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuUsers className="size-5" />
          <span className="text-base font-semibold">Usuários </span>
        </div>
      </div>
    </div>
  );
}

export default Page;
