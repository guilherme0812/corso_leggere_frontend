import { getAttorneys } from "@/app/_services/attorney";
import Content from "./_components/Content";
import { getClients } from "@/app/_services/client";

async function Page() {
  const attorneys = await getAttorneys({});
  const clients = await getClients({});

  return (
    <>
      <Content attorneys={attorneys || []} clients={clients || []} />
    </>
  );
}

export default Page;
