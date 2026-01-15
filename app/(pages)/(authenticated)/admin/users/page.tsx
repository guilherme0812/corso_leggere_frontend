export const revalidate = 0;

import { getCompanies } from "@/app/_services/companies";
import Content from "./_components/Content";

async function Page() {
  const companies = await getCompanies({}, "");
  return <Content companies={companies || []} />;
}

export default Page;
