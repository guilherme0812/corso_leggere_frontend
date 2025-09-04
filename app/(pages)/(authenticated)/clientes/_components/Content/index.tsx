"use client";

import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import TableClients from "../TableClients";
import { Button } from "@/app/_components/ui/Button";
import { LuPlus, LuSearch } from "react-icons/lu";
import { useEffect, useState } from "react";
import ClientModal from "../ClientModal";
import { apiLeggere } from "@/app/_services/api";
import { deleteClient } from "@/app/_services/client";

export type IClient = {
  document: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  hasWhatsapp: boolean;
  address: string;
  cityId: string;
  stateId: string;
  countryId: string;
  birthDate: string;
  notes: string;
  companyId: string;
};

function Content() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<IClient[]>([]);
  const [editData, setEditData] = useState<IClient>();

  const getClients = async () => {
    try {
      const res = await apiLeggere.get<IClient[]>("/clients");

      const { data } = res;

      if (res.status == 200) {
        setData(data || []);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleEdit = (client: IClient) => {
    setEditData(client);
    setOpenModal(true);
  };

  const handleDelete = async (document: string) => {
    await deleteClient(document);
  };

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="max-w-[1700px] m-auto grid grid-rows-[auto_1fr] h-full gap-4">
      <div className="h-full grid grid-cols-12 gap-4 shadow-md bg-white p-4">
        <div className="col-span-12 md:col-span-3">
          <Label>Nome do cliente</Label>
          <Input placeholder="Digite o nome do cliente" variant="filled" />
        </div>

        <div className="col-span-12 md:col-span-2">
          <Label>Status</Label>

          <Select>
            <SelectTrigger className="w-full" variant="filled">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="light">Ativo</SelectItem>
              <SelectItem value="dark">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-12 md:col-span-7 flex flex-col items-end justify-end gap-2">
          <div className="p-1 px-4 h-8 rounded-3xl bg-yellow-300 text-xs font-semibold flex items-center justify-center">
            {data.length} clientes encontrados
          </div>
          <div className="flex gap-4 items-center">
            <Button>
              <LuSearch />
              Buscar clientes
            </Button>
            <Button variant={"outline"} onClick={() => setOpenModal(true)}>
              <LuPlus />
              Adicionar clientes
            </Button>
          </div>
        </div>

        {openModal && <ClientModal handleClose={setOpenModal as any} editData={editData} />}
      </div>

      <div className="h-full">
        <TableClients data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
      </div>
    </div>
  );
}

export default Content;
