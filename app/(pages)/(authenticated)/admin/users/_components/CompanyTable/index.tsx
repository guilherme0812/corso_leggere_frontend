import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { ICompany } from "@/app/_services/companies";
import { formatPhone } from "@/app/_utils/stringFomatters";
import { LuPencil, LuTrash } from "react-icons/lu";
// import { LuPencil, LuTrash } from "react-icons/lu";

type iTable = {
  data: ICompany[];
  handleEdit(client: ICompany): void;
  handleDelete: (id: string) => void;
};

export default function CompanyTable({ data, handleDelete, handleEdit }: iTable) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CNPJ</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Pais</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                {item.name}
                </TableCell>
                <TableCell>{item.cnpj}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{formatPhone(item.phone1)}</TableCell>
                <TableCell>{item.stateId}</TableCell>
                <TableCell>{item.countryId}</TableCell>
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
