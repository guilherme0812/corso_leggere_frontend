"use client";

import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { Tooltip } from "@/app/_components/ui/Tooltip";
import { FinancialCategoryDataType } from "@/app/_services/finanances";
import moment from "moment";
import { LuArrowDown, LuArrowUp, LuPencil, LuTrash } from "react-icons/lu";

type IFinancialCategoriesTable = {
  data: FinancialCategoryDataType[];
  handleDelete: (id: string) => void;
  handleEdit: (record: FinancialCategoryDataType) => void;
};
function FinancialCategoriesTable({ data, handleDelete, handleEdit }: IFinancialCategoriesTable) {
  //   const typeBgColor = {
  //     INCOME: "bg-green-200",
  //     EXPENSE: "bg-red-200",
  //   } as any;

  //   const typeTranslate = {
  //     PENDING: "Pendente",
  //     PAID: "Pago",
  //     LATE: "Atrasado",
  //     PARTIAL: "Parcial",
  //     OVERDUE: "Atrasado",
  //   } as any;

  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="w-[140px]">Tipo</TableHead>
              <TableHead>Data criado</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-sm">{item.name}</TableCell>

                <TableCell className="min-w-[100px]">
                  <div>
                    {item.type == "INCOME" ? (
                      <div className="flex items-center justify-center gap-2 font-medium text-sm bg-green-200 p-1 min-w-8">
                        <LuArrowDown /> receita
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 font-medium text-sm bg-red-100 p-1 min-w-8">
                        <LuArrowUp /> despesa
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell className="font-medium text-sm">{moment(item?.createdAt).format("DD/MM/YYYY")}</TableCell>

                <TableCell className="flex justify-between items-center gap-2">
                  <Tooltip content="Alterar categoria">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <LuPencil />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Remover categoria">
                    <Button variant={"outline"} size={"sm"} onClick={() => handleDelete(item.id)}>
                      <LuTrash className="cursor-pointe" />
                    </Button>
                  </Tooltip>
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

export default FinancialCategoriesTable;
