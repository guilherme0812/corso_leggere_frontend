"use client";

import { ICase } from "@/app/_services/case";
import Header from "../Header";
import TableProceeding from "../TableProceeding";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCase } from "@/app/actions/case";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";
import PaymentModal from "@/app/_components/patterns/Payments/PaymentModal";

function Content({ cases, filter }: { cases: ICase[]; filter: any }) {
  const [openModal, setOpenModal] = useState(false);
  const [openCreatePaymentModal, setOpenCreatePaymentModal] = useState<ICase>();
  const [data, setData] = useState<ICase[]>(cases);
  const [editData, setEditData] = useState<ICase>();
  const [idToDelete, setIdDelete] = useState<string>();

  const router = useRouter();

  const handleDelete = async (document: string) => {
    const formData = new FormData();

    formData.append("id", document);

    const res = await deleteCase(formData);

    if (typeof res == "object") {
      router.refresh();
      setIdDelete(undefined);
    }
  };

  const handleEdit = (caseData: ICase) => {
    setEditData(caseData);
    setOpenModal(true);
  };
  const handleCreatePayment = (caseData: ICase) => {
    setOpenCreatePaymentModal(caseData);
  };

  useEffect(() => {
    setData(() => cases);
  }, [cases]);

  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <Header {...{ data, editData, openModal, setOpenModal }} filter={filter} />

      <div className="h-full">
        <TableProceeding
          data={cases || []}
          handleDelete={(id) => setIdDelete(id)}
          handleEdit={handleEdit}
          handleCreatePayment={handleCreatePayment}
        />
      </div>

      <ConfirmDialog
        open={idToDelete ? true : false}
        handleClose={() => {}}
        title="Deseja remover esse processo?"
        description="Apòs confirmar nao serà possivel desfazer o processo."
        handleConfirm={() => handleDelete(idToDelete as string)}
      />

      {openCreatePaymentModal ? (
        <PaymentModal
          editData={undefined}
          initialCaseId={openCreatePaymentModal.id}
          handleClose={() => setOpenCreatePaymentModal(undefined)}
        />
      ) : undefined}
    </div>
  );
}

export default Content;
