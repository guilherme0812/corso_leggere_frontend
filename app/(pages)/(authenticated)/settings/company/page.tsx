import { getCompany } from "@/app/_services/companies";
import { LoginDataType } from "@/app/_types";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import FormComponent from "./_components/FormComponent";
import { LuBriefcaseBusiness } from "react-icons/lu";

async function Page() {
  const session = await getServerSession(authOptions);
  const user = session?.user as LoginDataType;
  const company = await getCompany({ id: user?.companyId as string });

  if (!company) {
    return <> Internal error </>;
  }

  return (
    <div className="w-full">
      <div className="p-2 border-b w-full">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuBriefcaseBusiness className="size-5" />
          <span className="text-base font-semibold">Sua empresa/escritório</span>
        </div>
      </div>

      <FormComponent data={company} />
    </div>
  );
}

export default Page;
