"use client";

import Header from "@/app/_components/patterns/Header";
import { IAttorney } from "@/app/_services/attorney";
import { IClient } from "@/app/_services/client";
import { ICompany } from "@/app/_services/companies";
import { LuStore, LuUserRound, LuUsers } from "react-icons/lu";
import { MdOutlineBalance } from "react-icons/md";
import { useState } from "react";
import UserCard from "../UserCard";
import UserModal from "@/app/_components/patterns/users/UserModal";
import { UserDataType, UserStatusEnum } from "@/app/_types/login";
import Link from "next/link";

type ContentType = {
  companies: ICompany[];
  users: UserDataType[];
  clients: IClient[];
  attorneys: IAttorney[];
};

function Content({ attorneys, clients, companies, users }: ContentType) {
  const [unapprovedUsers] = useState(users.filter((item) => item.status == UserStatusEnum.PENDING));
  const [userEditData, setUserEditData] = useState<UserDataType>();

  const handleCloseUserModal = () => {
    setUserEditData(undefined);
  };

  return (
    <div className="max-w-[1700px] m-auto h-full grid grid-rows-[auto_auto_1fr]">
      <Header title="Painel do administrador" />

      <div className="mt-6 bg-white rounded-md p-4 shadow-custom mb-6">
        <h3 className="font-medium mb-4">Resumo da plataforma</h3>

        <div className="grid grid-col-span-1 md:grid-cols-4 gap-8">
          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <LuStore className="text-3xl text-yellow-600" />
            </div>

            <div>
              <div className="text-sm font-semibold">{companies?.length} Empresas cadastradas</div>
              <Link href={"/admin/empresas"}>
                <div className="text-xs text-gray-600">Ver mais detalhes</div>
              </Link>
            </div>
          </div>

          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <LuUserRound className="text-3xl text-purple-600" />
            </div>

            <div>
              <div className="text-sm font-semibold">{users?.length} Novos users</div>
              <Link href={"/admin/users"}>
                <div className="text-xs text-gray-600">Ver mais detalhes</div>
              </Link>
            </div>
          </div>

          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <MdOutlineBalance className="text-3xl text-purple-600" />
            </div>

            <div>
              <div className="text-sm font-semibold">{attorneys?.length} Advogados cadastrados</div>
              <div className="text-xs text-gray-600">ver mais detalhes</div>
            </div>
          </div>

          <div className="border rounded-md p-2 px-4 flex gap-4 items-center">
            <div>
              <LuUsers className="text-3xl text-blue-600" />
            </div>

            <div>
              <div className="text-sm font-semibold">{clients?.length} Clientes cadastrados</div>
              <div className="text-xs text-gray-600">Ver mais detalhes</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-500 text-sm mb-4">USUÁRIOS SEM APROVAÇÃO</h3>

        <div className="flex flex-col gap-4">
          {unapprovedUsers.map((item, key) => (
            <UserCard data={item as any} handleEdit={setUserEditData} key={key} />
          ))}

          {userEditData && (
            <UserModal companies={companies || []} editData={userEditData} handleClose={handleCloseUserModal} />
          )}
        </div>
      </div>

      {/*<div className="mb-6">
        <h3 className="font-semibold text-gray-500 text-sm mb-4">ATIVIDADES</h3>

        <div className="flex flex-col gap-4">
          <TaskCard />
          <TaskCard />
        </div>
      </div> */}
    </div>
  );
}

export default Content;
