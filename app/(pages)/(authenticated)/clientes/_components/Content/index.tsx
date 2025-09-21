"use client";

import TableClients from "../TableClients";
import { useEffect, useState } from "react";
import { IClient } from "@/app/_services/client";
import { deleteClient } from "@/app/actions/client";
import { useRouter } from "next/navigation";
import ClientHeader from "../ClientHeader";

type ContentType = {
  clients: IClient[];
};

function Content({ clients }: ContentType) {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<IClient[]>(clients);
  const [editData, setEditData] = useState<IClient>();

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
    }
  };

  useEffect(() => {
    setData(() => clients);
  }, [clients]);

  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <ClientHeader {...{ data, editData, openModal, setOpenModal }} />

      <div className="h-full">
        <TableClients data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Content;
