import { getAttorneys } from "@/app/_services/attorney";
import Content from "./_components/Content";
import { getClients } from "@/app/_services/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/[...nextauth]/authOptions";
import { getCustomDocumentMappingByCompany, ICustomDocumentMapping } from "@/app/_services/customDocumentMapping";

async function Page() {
  const session = (await getServerSession(authOptions)) as any;
  const attorneys = await getAttorneys({});
  const clients = await getClients({});
  const customDocumentMapping = await getCustomDocumentMappingByCompany({ companyId: session?.user?.companyId });

  return (
    <>
      <Content
        attorneys={attorneys || []}
        clients={clients || []}
        customDocumentMapping={customDocumentMapping as ICustomDocumentMapping}
      />
    </>
  );
}

export default Page;
