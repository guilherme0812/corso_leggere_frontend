import { getCases } from "@/app/_services/case";
import Content from "./_components/Content";

async function Page({}: { searchParams: { [key: string]: string } }) {
  const cases = await getCases();

  return <Content cases={cases || []} />;
}

export default Page;
