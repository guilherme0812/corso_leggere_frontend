import { getPayments } from "@/app/_services/finanances";
import Content from "./_components/ClientPaymentsTab/Content";

async function Page() {
  const paymentsData = await getPayments({});

  return (
    <div>
      <Content data={paymentsData || []} />
    </div>
  );
}

export default Page;
