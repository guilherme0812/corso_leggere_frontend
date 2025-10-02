import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { ICase } from "@/app/_services/case";
import { LuPencil, LuTrash } from "react-icons/lu";

type ITableProceeding = {
  data: ICase[];
  handleEdit(param: ICase): void;

  handleDelete: (id: string) => void;
};

export default function TableProceeding({ data, handleEdit, handleDelete }: ITableProceeding) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numero do processo</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item?.caseNumber}</TableCell>
                <TableCell>{item.description}</TableCell>
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
