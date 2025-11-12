import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { UserDataType } from "@/app/_types/login";
import { useSession } from "next-auth/react";
import { LuPencil, LuTrash } from "react-icons/lu";

type ITableUsers = {
  data: UserDataType[];
  handleEdit(data: UserDataType): void;

  handleDelete: (document: string) => void;
};

export default function TableUsers({ data, handleEdit, handleDelete }: ITableUsers) {
  const { data: session } = useSession();

  const statusColors: { [key: string]: string } = {
    active: "bg-green-700",
    inactive: "bg-red-700",
    pending: "bg-yellow-700",
  };

  const statusLabels: { [key: string]: string } = {
    active: "ativo",
    inactive: "inativo",
    pending: "pendente",
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permissão</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((client, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {client?.firstName} {client?.lastName}
                </TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        statusColors[client.status?.toLocaleLowerCase()]
                      } font-semibold`}
                    ></div>

                    {statusLabels[client.status?.toLocaleLowerCase()]}
                  </div>
                </TableCell>
                <TableCell>{client.role}</TableCell>
                <TableCell className="flex gap-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(client)}>
                    <LuPencil />
                  </Button>
                  {(session?.user as any)?.id != client.id && (
                    <Button variant="outline" size="sm" onClick={() => handleDelete(client.id)}>
                      <LuTrash />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-right">
                {data.length} registros
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
