import { getPayments } from "@/app/_services/finanances";
import Content from "./_components/ClientPaymentsTab/Content";

async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
  const processNumber = searchParams.processNumber;

  const paymentsData = await getPayments({ processNumber });

  return (
    <div>
      <Content data={paymentsData || []} processNumber={processNumber} />
    </div>
  );
}

export default Page;
