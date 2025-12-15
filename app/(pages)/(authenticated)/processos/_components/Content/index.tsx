"use client";

import { ICase } from "@/app/_services/case";
import Header from "../Header";
import TableProceeding from "../TableProceeding";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCase } from "@/app/actions/case";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";

function Content({ cases }: { cases: ICase[] }) {
  const [openModal, setOpenModal] = useState(false);
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

  useEffect(() => {
    setData(() => cases);
  }, [cases]);

  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <Header {...{ data, editData, openModal, setOpenModal }} />

      <div className="h-full">
        <TableProceeding data={cases || []} handleDelete={(id) => setIdDelete(id)} handleEdit={handleEdit} />
      </div>

      <ConfirmDialog
        open={idToDelete ? true : false}
        handleClose={() => {}}
        title="Deseja remover esse processo?"
        description="Apòs confirmar nao serà possivel desfazer o processo."
        handleConfirm={() => handleDelete(idToDelete as string)}
      />
    </div>
  );
}

export default Content;
