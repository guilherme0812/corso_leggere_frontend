"use client";

import { ICompany } from "@/app/_services/companies";
import CompanyHeader from "../CompanyHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../../../_components/ui/Breadcrumb";
import Link from "next/link";
import CompanyTable from "../CompanyTable";

function Content({ companies }: { companies: ICompany[] }) {
  return (
    <div className="max-w-[1700px] m-auto h-full grid grid-rows-[auto_auto_1fr]">
      <div>
        <h2 className="font-semibold text-lg mb-2">Empresas</h2>

        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/painel">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin">admin</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>empresas</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <CompanyHeader />

      <CompanyTable data={companies} handleDelete={() => {}} handleEdit={() => {}} />
    </div>
  );
}

export default Content;
