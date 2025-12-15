import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { ICase } from "@/app/_services/case";
import { LuPencil, LuTrash, LuUsers } from "react-icons/lu";
import { FaLandmark } from "react-icons/fa6";
import { MdOutlineBalance } from "react-icons/md";

type ITableProceeding = {
  data: ICase[];
  handleEdit(param: ICase): void;

  handleDelete: (id: string) => void;
};

export default function TableProceeding({ data, handleEdit, handleDelete }: ITableProceeding) {
  const labels = {
    PENDING: "Em andamento",
    OPEN: "Aberto",
    CLOSED: "Concluído",
  };
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Numero do processo</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Financeiro</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item?.processNumber}</TableCell>

                <TableCell>{item.title}</TableCell>

                <TableCell>
                  <div className={`px-2 py-1 rounded text-xs font-semibold w-max ${
                    item.status === "PENDING"
                      ? "bg-blue-100 text-blue-900"
                      : item.status === "OPEN"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-gray-800"
                  }`}>

                  {labels[item.status]}
                  </div>
                  </TableCell>

                <TableCell className="">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <FaLandmark />
                      {item.businessFee}%
                    </div>

                    <div className="flex items-center gap-2">
                      <MdOutlineBalance />
                      {item.lawyerFee}%
                    </div>

                    <div className="flex items-center gap-2">
                      <LuUsers />
                      {item.indicatorFee || 0}%
                    </div>
                  </div>
                </TableCell>

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
