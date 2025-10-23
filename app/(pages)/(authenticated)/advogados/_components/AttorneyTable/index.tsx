import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { IAttorney } from "@/app/_services/attorney";
import { LuPencil, LuTrash } from "react-icons/lu";

type IAttorneyTable = {
  data: IAttorney[];
  handleEdit(data: IAttorney): void;

  handleDelete: (id: string) => void;
};

export default function AttorneyTable({ data = [], handleEdit, handleDelete }: IAttorneyTable) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Licença</TableHead>
              <TableHead>Jurisdição</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {item?.firstName} {item?.lastName}
                </TableCell>
                <TableCell>{item?.licenceNumber}</TableCell>
                <TableCell>{item?.licenceJurisdiction}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="flex gap-4">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                    <LuPencil />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
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
