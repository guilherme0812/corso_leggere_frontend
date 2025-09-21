import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { IClient } from "@/app/_services/client";
import { LuPencil, LuTrash } from "react-icons/lu";

type ITableProceeding = {
  data: IClient[];
  handleEdit(client: IClient): void;

  handleDelete: (document: string) => Promise<void>;
};

export default function TableProceeding({ data, handleEdit, handleDelete }: ITableProceeding) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Local</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((client, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {client?.firstName} {client?.lastName}
                </TableCell>
                <TableCell></TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell className="flex gap-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(client)}>
                    <LuPencil />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(client.document)}>
                    <LuTrash />
                  </Button>
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
