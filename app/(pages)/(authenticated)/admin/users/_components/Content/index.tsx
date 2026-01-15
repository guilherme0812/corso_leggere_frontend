"use client";

import { ICompany } from "@/app/_services/companies";
import UserHeader from "../UserHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../../../_components/ui/Breadcrumb";
import Link from "next/link";
import { useState } from "react";
import Skeleton from "@/app/_components/ui/Skeleton";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";
import { enqueueSnackbar } from "notistack";
import { useDeleteUser, useUsers } from "@/app/_hooks/user";
import { UserDataType } from "@/app/_types/login";
import TableUsers from "@/app/(pages)/(authenticated)/settings/users/_components/TableUsers";
import UserModal from "@/app/_components/patterns/users/UserModal";

function Content({ companies }: { companies: ICompany[] }) {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState<UserDataType>();
  const [userFilterName, setUserFilterName] = useState("");
  const [idToDelete, setIdDelete] = useState<string>();

  const { data, isLoading } = useUsers({ filters: { name: userFilterName }, initialData: [], preffix: "/admin" });
  const { mutateAsync: deleteUser } = useDeleteUser();

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditData(undefined);
  };

  const handleDelete = async (id: string) => {
    if (id) {
      try {
        const res = await deleteUser({
          id,
          preffix: "/admin",
        });

        if (typeof res == "object") {
          setIdDelete(undefined);
          enqueueSnackbar({
            message: "Usuários removido com sucesso!",
            variant: "success",
          });
        }
      } catch (error: any) {
        console.log(error);
        enqueueSnackbar({
          variant: "error",
          message: "Erro ao remover usuário",
        });
      }
    }
  };

  return (
    <div className="max-w-[1700px] m-auto h-full grid grid-rows-[auto_auto_1fr]">
      <div>
        <h2 className="font-semibold text-lg mb-2">Usuários</h2>

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
                <BreadcrumbPage>usuários</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <UserHeader
        dataLength={data?.length || 0}
        handleOpenModal={() => setOpenModal(true)}
        setUserFilterName={setUserFilterName}
      />

      {!isLoading ? (
        <>
          <TableUsers
            data={data || []}
            handleDelete={(id) => {
              setIdDelete(id);
            }}
            handleEdit={(record) => {
              setEditData(record);
              setOpenModal(true);
            }}
          />
        </>
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
        title="Deseja remover esse usuário?"
        description="Apòs confirmar nao serà possivel desfazer o processo."
        handleConfirm={() => handleDelete(idToDelete as string)}
      />

      {openModal ? (
        <UserModal isAdmin handleClose={handleCloseModal} companies={companies || []} editData={editData} />
      ) : null}
    </div>
  );
}

export default Content;
