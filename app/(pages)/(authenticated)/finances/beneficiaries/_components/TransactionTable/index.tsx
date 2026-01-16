import { Button } from "@/app/_components/ui/Button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { TransactionDataType, TransactionTypeEnum } from "@/app/_services/finanances";
import { numberFormat } from "@/app/_utils";
import { enqueueSnackbar } from "notistack";
import { LuArrowDownRight, LuArrowUpRight, LuCopy } from "react-icons/lu";

type ITable = {
  data: TransactionDataType[];
  // handlePay(data: TransactionDataType): void;
  //   handleDelete: (document: string) => void;
};

export const statusTranslate = {
  PENDING: "Pendente",
  COMPLETED: "Concluída",
  FAILED: "Falhou",
  CANCELLED: "Cancelado",
  REVERSED: "Estornada",
};

export default function TransactionTable({ data }: ITable) {
  const statusBgColor = {
    PENDING: "bg-yellow-200",
    COMPLETED: "bg-green-200",
    FAILED: "bg-red-200",
    CANCELLED: "bg-yellow-200",
    REVERSED: "bg-yellow-200",
  };

  const typeTranslate = {
    INCOME: "Entrada",
    EXPENSE: "Saída",
    TRANSFER: "Transferência",
    REFUND: "Estorno",
    ADJUSTMENT: "Ajuste manual",
  };

  return (
    <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>description</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor Total</TableHead>
            {/* <TableHead>Pago</TableHead> */}
            <TableHead>Metodo</TableHead>
            {/* <TableHead className="w-[60px]">Pagar</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium group flex items-center gap-2">
                <div>{item.code}</div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => {
                      enqueueSnackbar({
                        message: "Código de pagamento copiado para a área de transferência",
                        variant: "info",
                      });
                      navigator.clipboard.writeText(item.code!);
                    }}
                  >
                    <LuCopy />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="font-medium max-w-[300px] min-w-[200px]">{item.description}</TableCell>
              <TableCell className="font-medium max-w-[150px] flex items-center gap-2">
                <div className="text-lg">
                  {item.type == TransactionTypeEnum.INCOME ? (
                    <LuArrowUpRight />
                  ) : item.type == TransactionTypeEnum.EXPENSE ? (
                    <LuArrowDownRight />
                  ) : null}
                </div>
                <div>{typeTranslate[item.type]}</div>
              </TableCell>
              <TableCell>
                <div
                  className={`text-center ${
                    statusBgColor[item.status]
                  } min-w-[100px] p-1 text-xs flex justify-center font-medium rounded`}
                >
                  {statusTranslate[item.status]}
                </div>
              </TableCell>

              <TableCell>
                {numberFormat(item.amount, "pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </TableCell>

              <TableCell>{item.method}</TableCell>

              {/* <TableCell>
                <Tooltip content="Ver mais informações / Registrar pagamento">
                  <Button variant={"ghost"} size={"sm"} onClick={() => handlePay(item)}>
                    <MdOutlinePayments />
                  </Button>
                </Tooltip>
              </TableCell> */}
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
