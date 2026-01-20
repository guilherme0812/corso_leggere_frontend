"use client";

import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { BeneficiaryDataType } from "@/app/_services/beneficiary";
import { LuPencil, LuTrash } from "react-icons/lu";

type ITable = {
  data: BeneficiaryDataType[];
  handleEdit(client: BeneficiaryDataType): void;
  handleDelete: (id: string) => void;
};

export const typeTranslate = {
  ATTORNEY: "Advogado",
  REFERRAL: "Indicação",
  PARTNER: "Parceiro",
  OFFICE: "Próprio escritório",
  SUPPLIER: "Fornecedor",
  OTHER: "Outro",
};

export default function TransactionTable({ data, handleDelete, handleEdit }: ITable) {
  const typeBgColor = {
    ATTORNEY: "bg-purple-200",
    REFERRAL: "bg-yellow-300",
    PARTNER: "bg-green-200",
    OFFICE: "bg-blue-200",
    SUPPLIER: "bg-yellow-300",
    OTHER: "bg-yellow-300",
  };

  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Document</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="font-medium  min-w-[50px] max-w-[100px]">
                <div className={`${typeBgColor[item.type]} py-1 px-3 rounded-md text-center`}>
                  {typeTranslate[item.type]}
                </div>
              </TableCell>
              <TableCell className="font-medium">{item.phone}</TableCell>
              <TableCell className="font-medium">{item.email}</TableCell>
              <TableCell className="font-medium">{item.document}</TableCell>

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
  );
}
