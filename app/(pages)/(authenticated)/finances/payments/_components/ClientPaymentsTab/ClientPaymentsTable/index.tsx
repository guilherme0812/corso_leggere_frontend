import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { Tooltip } from "@/app/_components/ui/Tooltip";
import { GetAllPaymentDataType, PaymentDataType } from "@/app/_services/finanances";
import { numberFormat } from "@/app/_utils";
import moment from "moment";
import { MdOutlinePayments } from "react-icons/md";

type IClientPaymentsTable = {
  data: GetAllPaymentDataType[];
  handlePay(data: PaymentDataType): void;
  //   handleDelete: (document: string) => void;
};

export const statusTranslate = {
  PENDING: "Aguardando pagamento", // Aguardando pagamento
  PARTIAL: "Parcialmente pago", // Parcialmente pago
  PAID: "Completamente pago", // Completamente pago
  CANCELLED: "Cancelado", // Cancelado
  REFUNDED: "Estornado", // Estornado
};

export default function ClientPaymentsTable({ data, handlePay }: IClientPaymentsTable) {
  const statusBgColor = {
    PENDING: "bg-yellow-200",
    PARTIAL: "bg-yellow-200",
    CANCELLED: "bg-blue-200",
    PAID: "bg-green-300",
    REFUNDED: "bg-brown-200",
  };

  // const splitTranslate = {
  //   LAWYER: "Advogado",
  //   INDICATOR: "indicação",
  //   OFFICE: "Escritorio",
  // };

  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Processo</TableHead>
            <TableHead>Processo</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead>Div. de valores</TableHead> */}
            <TableHead>Dta. Vencimento</TableHead>
            <TableHead>Dta. Pagamento</TableHead>
            <TableHead>Pago</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="w-[60px]">Pagar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-sm min-w-[150px]">{item.code}</TableCell>
              <TableCell className="font-medium text-sm max-w-[150px]">{item.case.title}</TableCell>
              <TableCell className="font-medium text-sm">{item.case.processNumber}</TableCell>
              <TableCell>
                <div
                  className={`${
                    statusBgColor[item.status]
                  } p-1 text-xs flex justify-center font-medium min-w-[50px] rounded`}
                >
                  {statusTranslate[item.status]}
                </div>
              </TableCell>
              {/* <TableCell>
                <div className="flex items-center gap-2">
                  {item.splits.map((split, index) => (
                    <div key={index}>
                      {splitTranslate[split.type]}{" "}
                      {split.amountType == AmountType.FIXED
                        ? numberFormat(split.amount, "pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : `${split.amount}%`}
                    </div>
                  ))}
                </div>
              </TableCell> */}
              <TableCell>{moment(item.dueDate).format("DD/MM/yyyy")}</TableCell>
              <TableCell>{item.issueDate ? moment(item.issueDate).format("DD/MM/yyyy") : null}</TableCell>
              <TableCell>
                {numberFormat(item.paidAmount, "pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>
              <TableCell>
                {numberFormat(item.totalAmount, "pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>

              <TableCell>
                <Tooltip content="Ver mais informações / Registrar pagamento">
                  <Button variant={"ghost"} size={"sm"} onClick={() => handlePay(item)}>
                    <MdOutlinePayments />
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
  );
}
