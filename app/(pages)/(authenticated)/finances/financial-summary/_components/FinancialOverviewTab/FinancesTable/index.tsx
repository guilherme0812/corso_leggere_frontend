import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/app/_components/ui/Table";
import { FinancialEntryDataType } from "@/app/_services/finanances";
import { numberFormat } from "@/app/_utils";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

type IFinancesTable = {
  data: FinancialEntryDataType[];
  //   handleEdit(client: IClient): void;
  //   handleDelete: (document: string) => void;
};

export default function FinancesTable({ data }: IFinancesTable) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Origem</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-sm">
                  {item?.origin == "PAYMENT" ? "Pagamento" : item.origin}
                </TableCell>
                <TableCell>
                  <div>
                    {item.type == "RECEIVABLE" ? (
                      <div className="flex items-center justify-center gap-2 font-medium text-sm bg-green-100 p-1 min-w-8">
                        <LuArrowDown /> recebido
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 font-medium text-sm bg-red-100 p-1 min-w-8">
                        <LuArrowUp /> despesa
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>R$ {numberFormat(item.amount)}</TableCell>
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
