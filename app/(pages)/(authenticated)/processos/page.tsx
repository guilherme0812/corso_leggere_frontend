import { getCases } from "@/app/_services/case";
import Content from "./_components/Content";

async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const clientName = searchParams.clientName;
  const processNumber = searchParams.processNumber;
  const title = searchParams.title;

  const cases = await getCases({
    clientName,
    processNumber,
    title,
  });

  return (
    <Content
      cases={cases || []}
      filter={{
        clientName,
        processNumber,
        title,
      }}
    />
  );
}

export default Page;
