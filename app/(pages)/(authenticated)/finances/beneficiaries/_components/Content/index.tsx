"use client";

import { GetTransactionsParams } from "@/app/_services/finanances";
import ClientPaymentsTable from "../TransactionTable";
import Header from "../Header";
import { useState } from "react";
import Skeleton from "@/app/_components/ui/Skeleton";
import { LuPlus, LuUsers } from "react-icons/lu";
import { Button } from "@/app/_components/ui/Button";
import { useBeneficiaries, useDeleteBeneficiary } from "@/app/_hooks/beneficiary";
import { BeneficiaryDataType } from "@/app/_services/beneficiary";
import BeneficiaryModal from "../BeneficiaryModal";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";
import { enqueueSnackbar } from "notistack";

function Content() {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<BeneficiaryDataType>();
  const [idToDelete, setIdDelete] = useState<string>();

  const [filters, setFilters] = useState<GetTransactionsParams>({});
  const { data, isLoading, refetch } = useBeneficiaries({
    filters,
    // initialData: [],
  });
  const { mutateAsync: deleteBeneficiary } = useDeleteBeneficiary();

  const handleDelete = async (id: string) => {
    try {
      await deleteBeneficiary(id);
      setIdDelete(undefined);
      enqueueSnackbar({
        variant: "success",
        message: "Removido com sucesso",
      });
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar({
        variant: "error",
        message: "Erro interno, tente novamente mais tarde",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-1.5rem)] flex flex-col h-full">
      <div className="p-2 border-b w-full mb-4 flex justify-between">
        <div className=" peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuUsers className="size-5" />
          <span className="text-base font-semibold">Beneficiarios</span>
        </div>

        <Button variant={"outline"} onClick={() => setOpenModal(true)}>
          <LuPlus />
          Nova beneficiario
        </Button>
      </div>

      <Header {...{ filters, setFilters, refetch }} />

      <div className="flex-grow relative mt-4">
        {isLoading ? (
          <>
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
            <Skeleton className="h-[30px] mb-1 w-full bg-gray-200" />
          </>
        ) : (
          <ClientPaymentsTable data={data || []} handleDelete={setIdDelete} handleEdit={setEditData} />
        )}
      </div>

      {openModal || editData ? (
        <BeneficiaryModal
          editData={editData}
          handleClose={() => {
            setOpenModal(false);
            setEditData(undefined);
          }}
        />
      ) : undefined}

      <ConfirmDialog
        open={idToDelete ? true : false}
        handleClose={() => setIdDelete(undefined)}
        title="Deseja remover esse beneficiario?"
        description="Apòs confirmar nao serà possivel desfazer o processo."
        handleConfirm={() => handleDelete(idToDelete as string)}
      />
    </div>
  );
}

export default Content;
