import { cn } from "@/app/_lib";
import { TransactionDataType, TransactionStatusEnum, TransactionTypeEnum } from "@/app/_services/finanances";
import { numberFormat } from "@/app/_utils";
import { statusTranslate } from "@/app/_utils/trnsactions";
import moment from "moment";
import { LuArrowDownRight, LuArrowUpRight } from "react-icons/lu";

type IFinancesTable = {
  data: TransactionDataType[];
  //   handleEdit(client: IClient): void;
  //   handleDelete: (document: string) => void;
};

export default function FinancesTable({ data }: IFinancesTable) {
  return (
    <div className="relative w-full h-full">
      <div className="absolute left-0 top-0 h-full w-full overflow-y-auto">
        <ul className="flex flex-col gap-2 py-2 h-full justify-between">
          {data?.map((item, key) => (
            <li
              key={key}
              className="grid grid-cols-12 gap-2 hover:bg-gray-100 duration-200 transition-all px-4 py-[3px]"
            >
              <div className={`col-span-9 flex gap-4 items-center`}>
                <div
                  className={cn(
                    "w-10 h-10 rounded-md flex-shrink-0 flex justify-center items-center text-xl",
                    item.type == TransactionTypeEnum.INCOME ? "bg-green-200" : "bg-red-200",
                  )}
                >
                  {item.type == TransactionTypeEnum.INCOME ? <LuArrowUpRight /> : <LuArrowDownRight />}
                </div>

                <div className="flex-grow">
                  <div className="font-medium text-xs">{item.description}</div>
                  <div className="text-xs flex items-center justify-between gap-2">
                    <div>{item.code}</div>
                    <div>{moment(item.effectiveDate).format("DD/MM/YYYY")}</div>
                    <div
                      className={cn(
                        "px-2 py-1 rounded-md lowercase",
                        item.status == TransactionStatusEnum.COMPLETED ? "bg-green-200" : "bg-yellow-400",
                      )}
                    >
                      {statusTranslate[item.status]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3 flex justify-end items-center text-xs font-semibold">
                {numberFormat(item.amount, "pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
