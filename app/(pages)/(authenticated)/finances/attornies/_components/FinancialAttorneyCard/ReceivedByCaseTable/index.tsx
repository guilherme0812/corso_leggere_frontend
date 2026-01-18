"use client";

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { ReceivedByCaseDataType } from "@/app/_services/attorney";
import { numberFormat } from "@/app/_utils";

type ITable = {
  data: ReceivedByCaseDataType[];
  // handlePay(data: TransactionDataType): void;
  //   handleDelete: (document: string) => void;
};

export const typeTranslate = {
  ATTORNEY: "Advogado",
  REFERRAL: "Indicação",
  PARTNER: "Parceiro",
  OFFICE: "Próprio escritório",
  SUPPLIER: "Fornecedor",
  OTHER: "Outro",
};

export default function ReceivedByCaseTable({ data }: ITable) {
  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome processo</TableHead>
            <TableHead>Numero</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.caseName}</TableCell>
              <TableCell className="font-medium">{item.processNumber}</TableCell>
              <TableCell className="font-medium">
                {numberFormat(item.total, "pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
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
