export const revalidate = 0;

import Content from "./_components/Content";
import { getClients } from "@/app/_services/client";

async function Page() {
  const clients = await getClients();

  console.log("clients: ", clients?.length);
  return <Content clients={clients || []} />;
}

export default Page;
