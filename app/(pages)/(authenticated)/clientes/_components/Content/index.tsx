"use client";

import TableClients from "../TableClients";
import { useEffect, useState } from "react";
import { IClient } from "@/app/_services/client";
import { deleteClient } from "@/app/actions/client";
import { useRouter } from "next/navigation";
import ClientHeader from "../ClientHeader";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";

type ContentType = {
  clients: IClient[];
};

function Content({ clients }: ContentType) {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<IClient[]>(clients);
  const [editData, setEditData] = useState<IClient>();
  const [idToDelete, setIdDelete] = useState<string>();

  const router = useRouter();

  const handleEdit = (client: IClient) => {
    setEditData(client);
    setOpenModal(true);
  };

  const handleDelete = async (document: string) => {
    const formData = new FormData();

    formData.append("document", document);

    const res = await deleteClient(formData);

    if (typeof res == "object") {
      router.refresh();
      setIdDelete(undefined);
    }
  };

  useEffect(() => {
    setData(() => clients);
  }, [clients]);

  return (
    <>
      <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
        <ClientHeader {...{ data, editData, openModal, setOpenModal }} />

        <div className="h-full">
          <TableClients data={data} handleEdit={handleEdit} handleDelete={(document) => setIdDelete(document)} />
        </div>
      </div>

      <ConfirmDialog
        open={idToDelete ? true : false}
        handleClose={() => {}}
        title="Deseja remover esse cliente?"
        description="Apòs confirmar nao serà possivel desfazer o processo."
        handleConfirm={() => handleDelete(idToDelete as string)}
      />
    </>
  );
}

export default Content;
