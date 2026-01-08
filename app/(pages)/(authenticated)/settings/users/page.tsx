import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

import { UserDataType } from "@/app/_types/login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Content from "./_components/Content";
import { getUsers } from "@/app/_services/users";

async function Page() {
  const session = await getServerSession(authOptions);

  if ((session?.user as any as UserDataType)?.role != "owner") {
    return redirect("/painel");
  }

  const users = await getUsers({});

  return <Content users={users || []} />;
}

export default Page;
