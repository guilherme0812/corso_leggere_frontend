"use client";

import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { AttorneyPendingPaymentDataType } from "@/app/_services/attorney";
import { numberFormat } from "@/app/_utils";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { LuCopy } from "react-icons/lu";
import { statusBgColor, statusTranslate } from "../../../../payments/_components/ClientPaymentsTab/ClientPaymentsTable";

type ITable = {
  data: AttorneyPendingPaymentDataType[];
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

export default function PendingPaymentsTable({ data }: ITable) {
  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Vencimento</TableHead>
            <TableHead>Status pag. cliente</TableHead>
            <TableHead>Valor a receber</TableHead>
            <TableHead>Valor total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium group flex items-center gap-2">
                <div>{item.payment.code}</div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      enqueueSnackbar({
                        message: "Código de pagamento copiado para a área de transferência",
                        variant: "info",
                      });
                      navigator.clipboard.writeText(item.payment.code!);
                    }}
                  >
                    <LuCopy />
                  </Button>
                </div>
              </TableCell>

              <TableCell>{moment(item.dueDate).format("DD/MM/yyyy")}</TableCell>
              <TableCell>
                <div
                  className={`text-center ${
                    (statusBgColor as any)[item.payment.status as any]
                  } min-w-[100px] p-1 text-xs flex justify-center font-medium rounded`}
                >
                  {(statusTranslate as any)[item.payment.status]}
                </div>
              </TableCell>

              <TableCell className="font-medium">
                {numberFormat(item.percentage || item.fixedAmount, "pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell className="font-medium">
                {numberFormat(item.calculatedAmount, "pt-BR", {
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
