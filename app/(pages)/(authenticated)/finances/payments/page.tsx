import Content from "./_components/ClientPaymentsTab/Content";

async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const processNumber = searchParams.processNumber;

  return (
    <div>
      <Content data={[]} processNumber={processNumber} />
    </div>
  );
}

export default Page;
