export const revalidate = 0;

import Content from "./_components/Content";
import { getClients } from "@/app/_services/client";

async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const name = searchParams.name || undefined;

  const clients = await getClients({ name });

  console.log("clients: ", clients?.length);
  return <Content clients={clients || []} />;
}

export default Page;
