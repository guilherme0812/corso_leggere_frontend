import { apiServerLeggere } from "@/app/_services/api";
import FinancialOverviewTab from "./_components/FinancialOverviewTab";

async function Page() {
  const res = await apiServerLeggere.get("financial/company-report?startDate=2026-01-01&endDate=2026-01-31");

  const { data } = res;

  if (!data) {
    return <>loading...</>;
  }
  return <FinancialOverviewTab companyReportData={data} />;
}

export default Page;
