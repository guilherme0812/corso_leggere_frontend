export const revalidate = 0;

import { getCompanies } from "@/app/_services/companies";
import Content from "./_components/Content";
import { getClients } from "@/app/_services/client";
import { getAttorneys } from "@/app/_services/attorney";
import { getUsers } from "@/app/_services/users";

async function Page() {
  const companies = await getCompanies({}, "");
  const users = await getUsers({});
  const clients = await getClients({});
  const attorneys = await getAttorneys({});

  return (
    <Content attorneys={attorneys || []} clients={clients || []} companies={companies || []} users={users || []} />
  );
}

export default Page;
