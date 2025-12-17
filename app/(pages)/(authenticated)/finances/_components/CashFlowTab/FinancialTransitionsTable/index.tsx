"use client";

import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { CashFlowDataType } from "@/app/_services/finanances";
import { numberFormat } from "@/app/_utils";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { LuArrowDown, LuArrowUp, LuCopy, LuKeyRound } from "react-icons/lu";

type IFinancialTransitionsTable = {
  data: CashFlowDataType[];
};
function FinancialTransitionsTable({ data }: IFinancialTransitionsTable) {
  const handleCopyId = (record: CashFlowDataType) => {
    // navigator.clipboard.writeText(id);
    try {
      navigator.clipboard.writeText(record.id);
      enqueueSnackbar(`ID copiado: ${record.id}`, { variant: "success" });
    } catch (error: any) {
      console.error("Error copying to clipboard:", error);
      enqueueSnackbar(`Erro ao copiar ID: ${error.message}`, { variant: "error" });
    }
  };

  const statusBgColor = {
    PENDING: "bg-yellow-200",
    PAID: "bg-green-200",
    PARTIAL: "bg-red-200",
    OVERDUE: "bg-red-200",
  } as any;

  const statusTranslate = {
    PENDING: "Pendente",
    PAID: "Pago",
    LATE: "Atrasado",
    PARTIAL: "Parcial",
    OVERDUE: "Overdue",
  } as any;

  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Origem</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data de vencimento</TableHead>
              <TableHead>Data pago</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((client, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-sm">{client?.description || client.case.title}</TableCell>
                <TableCell className="font-medium text-sm">
                  {client?.category ? (
                    <>{client?.category.name == "receives" ? "Receitas" : client?.category.name}</>
                  ) : null}
                </TableCell>

                <TableCell className="max-w-[100px]">
                  <div>
                    {client.type == "RECEIVABLE" ? (
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

                <TableCell className="font-medium text-sm">
                  {client?.origin == "PAYMENT" ? "Pagamento" : client.origin}
                </TableCell>

                <TableCell className="font-medium text-sm">
                  <div
                    className={`${
                      statusBgColor[client.status]
                    } p-1 text-xs flex justify-center font-medium min-w-[50px] rounded`}
                  >
                    {statusTranslate[client.status]}
                  </div>
                </TableCell>

                <TableCell className="font-medium text-sm">{moment(client?.dueDate).format("DD/MM/YYYY")}</TableCell>
                <TableCell className="font-medium text-sm">{moment(client?.paidAt).format("DD/MM/YYYY")}</TableCell>

                <TableCell>R$ {numberFormat(client.amount)}</TableCell>

                <TableCell>
                  <Button variant={"outline"} size={"sm"} onClick={() => handleCopyId(client)}>
                    <LuKeyRound className="cursor-pointer hover:text-blue-600" />
                    <LuCopy className="cursor-pointer hover:text-blue-600" />
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

export default FinancialTransitionsTable;
