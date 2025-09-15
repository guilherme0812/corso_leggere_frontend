import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Content from "./_components/Content";
import { getServerSession } from "next-auth";
import { getClients } from "@/app/_services/client";

async function Page() {
  const data = await getServerSession(authOptions);

  const clients = await getClients();
  console.log("teste 1234:", clients);
  return <Content />;
}

export default Page;
