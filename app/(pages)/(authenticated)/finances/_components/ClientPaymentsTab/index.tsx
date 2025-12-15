import { getPayments } from "@/app/_services/finanances";
import Content from "./Content";

async function ClientPaymentsTab() {
  const paymentsData = await getPayments({});
  
  return (
   <Content data={paymentsData || []} />
  );
}

export default ClientPaymentsTab;
