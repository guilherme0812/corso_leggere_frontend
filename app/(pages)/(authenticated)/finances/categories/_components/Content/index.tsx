"use client";

import { Button } from "@/app/_components/ui/Button";
import { useFinancialCategories, useRemoveFinancialCategories } from "@/app/_hooks/finances";
import { LuBookText, LuPlus } from "react-icons/lu";
import FinancialCategoriesTable from "../CategoriesTable";
import { useState } from "react";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";
import CategoryModal from "../CategoryModal";
import { FinancialCategoryDataType } from "@/app/_services/finanances";

function Content() {
  const [idToDelete, setIdDelete] = useState<string>();
  const [editData, setEditData] = useState<FinancialCategoryDataType>();
  const [openModal, setOpenModal] = useState(false);
  const { data } = useFinancialCategories({});
  const { mutateAsync: removeCategory } = useRemoveFinancialCategories();

  const handleCloseModal = () => {
    setEditData(undefined);
    setOpenModal(false);
  };

  const handleDelete = (id: string) => {
    removeCategory(id);
    setIdDelete(undefined); // Close the dialog after deletion
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="p-2 border-b w-full mb-4 flex items-center justify-between">
        <div className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left h-8 text-sm">
          <LuBookText className="size-5" />
          <span className="text-base font-semibold">Categorias do financeiro</span>
        </div>

        <Button onClick={() => setOpenModal(true)}>
          <LuPlus />
          Criar nova categoria
        </Button>
      </div>

      <FinancialCategoriesTable
        data={data || []}
        handleDelete={setIdDelete}
        handleEdit={(record) => {
          setEditData(record);
          setOpenModal(true);
        }}
      />

      {openModal ? <CategoryModal editData={editData} handleClose={handleCloseModal} /> : null}

      <ConfirmDialog
        open={idToDelete ? true : false}
        handleClose={() => setIdDelete(undefined)}
        title="Deseja remover essa categoria?"
        description="Após confirmar nao serà possivel desfazer o processo."
        handleConfirm={() => handleDelete(idToDelete as string)}
      />
    </div>
  );
}

export default Content;
