"use client";

import { IAttorney } from "@/app/_services/attorney";
import AttorneyHeader from "../AttorneyHeader";
import { useEffect, useState } from "react";
import AttorneyTable from "../AttorneyTable";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";
import { deleteAttorney } from "@/app/actions/attorney";
import { useRouter } from "next/navigation";

function Content({ attorneys }: { attorneys: IAttorney[] }) {
  const [data, setData] = useState(attorneys);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<IAttorney>();
  const [idToDelete, setIdDelete] = useState<string>();

  const router = useRouter();

  const handleEdit = (data: IAttorney) => {
    setEditData(data);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    const formData = new FormData();

    formData.append("id", id);

    const res = await deleteAttorney(formData);

    if (typeof res == "object") {
      router.refresh();
      setIdDelete(undefined);
    }
  };

  useEffect(() => {
    setData(() => attorneys);
  }, [attorneys]);

  return (
    <>
      <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
        <AttorneyHeader data={data} editData={editData} openModal={openModal} setOpenModal={setOpenModal} />

        <AttorneyTable data={data} handleDelete={(id) => setIdDelete(id)} handleEdit={handleEdit} />
      </div>
      <ConfirmDialog
        open={idToDelete ? true : false}
        handleClose={() => setIdDelete(undefined)}
        title="Deseja remover esse registro?"
        description="Apòs confirmar nao serà possivel desfazer o processo."
        handleConfirm={() => handleDelete(idToDelete as string)}
      />
    </>
  );
}

export default Content;
