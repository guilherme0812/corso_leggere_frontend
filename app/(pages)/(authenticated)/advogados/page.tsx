import { getAttorneys } from "@/app/_services/attorney";
import Content from "./_components/Content";

async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const name = searchParams.name || undefined;

  const attorneys = await getAttorneys({ name }, "");

  return <Content attorneys={attorneys || []} />;
}

export default Page;
