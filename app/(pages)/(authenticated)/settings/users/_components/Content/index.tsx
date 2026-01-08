"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";
import { UserDataType } from "@/app/_types/login";
import TableUsers from "../TableUsers";
import UserHeader from "../UserHeader";
import { deleteUser } from "@/app/actions/user";

type ContentType = {
  users: UserDataType[];
};

function Content({ users }: ContentType) {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<UserDataType[]>(users);
  const [editData, setEditData] = useState<UserDataType>();
  const [idToDelete, setIdDelete] = useState<string>();

  const router = useRouter();

  const handleEdit = (record: UserDataType) => {
    setEditData(record);
    setOpenModal(true);
  };

  const handleDelete = async (id: string) => {
    const formData = new FormData();

    formData.append("id", id);

    const res = await deleteUser(formData);

    if (typeof res == "object") {
      router.refresh();
      setIdDelete(undefined);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditData(undefined);
  };

  useEffect(() => {
    setData(() => users);
  }, [users]);

  return (
    <>
      <div className="grid grid-rows-[auto_1fr] h-full gap-4">
        <UserHeader {...{ data, editData, openModal, setOpenModal, handleCloseModal }} />

        <div className="h-full">
          <TableUsers data={data} handleEdit={handleEdit} handleDelete={(id) => setIdDelete(id)} />
        </div>
      </div>

      <ConfirmDialog
        open={idToDelete ? true : false}
        handleClose={() => {}}
        title="Deseja remover esse usuário?"
        description="Após confirmar não será possível desfazer o processo."
        handleConfirm={() => handleDelete(idToDelete as string)}
      />
    </>
  );
}

export default Content;
