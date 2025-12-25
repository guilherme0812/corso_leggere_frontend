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
import { useState } from "react";
import CompanyModal from "@/app/_components/patterns/companies/CompanyModal";
import { useCompanies, useDeleteCompany } from "@/app/_hooks/companies";
import Skeleton from "@/app/_components/ui/Skeleton";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";
import { enqueueSnackbar } from "notistack";

function Content({ companies }: { companies: ICompany[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<ICompany>();
  const [companyFilterName, setCompanyFilterName] = useState("");
  const [idToDelete, setIdDelete] = useState<string>();

  const { data, isLoading } = useCompanies({ filters: { name: companyFilterName }, initialData: companies });
  const { mutateAsync: deleteCompany } = useDeleteCompany();
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditData(undefined);
  };

  const handleDelete = async (id: string) => {
    if (id) {
      const res = await deleteCompany({ id, _prefix: "/admin" });

      if (typeof res == "object") {
        setIdDelete(undefined);
        enqueueSnackbar({
          message: "Empresa removida com sucesso!",
          variant: "success",
        });
      }
    }
  };

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

      <CompanyHeader handleOpenModal={() => setOpenModal(true)} setCompanyFilterName={setCompanyFilterName} />

      {!isLoading ? (
        <CompanyTable
          data={data || []}
          handleDelete={setIdDelete}
          handleEdit={(record) => {
            setEditData(record);
            setOpenModal(true);
          }}
        />
      ) : (
        <div>
          <Skeleton className="w-full h-5 mb-2 bg-gray-200" />
          <Skeleton className="w-full h-5 mb-2 bg-gray-200" />
          <Skeleton className="w-full h-5 mb-2 bg-gray-200" />
          <Skeleton className="w-full h-5 mb-2 bg-gray-200" />
        </div>
      )}

      <ConfirmDialog
        open={idToDelete ? true : false}
        handleClose={() => setIdDelete(undefined)}
        title="Deseja remover esse cliente?"
        description="Apòs confirmar nao serà possivel desfazer o processo."
        handleConfirm={() => handleDelete(idToDelete as string)}
      />

      {openModal ? <CompanyModal companies={[]} editData={editData} handleClose={handleCloseModal} /> : null}
    </div>
  );
}

export default Content;
