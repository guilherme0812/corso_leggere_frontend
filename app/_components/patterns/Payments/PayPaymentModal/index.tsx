"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/Button";
import { SplitDataType } from "@/app/_services/finanances";
import { usePayPayment } from "@/app/_hooks/finances";
import { enqueueSnackbar } from "notistack";
import { numberFormat } from "@/app/_utils";
import moment from "moment";
import { LuDollarSign } from "react-icons/lu";
import { ICase } from "@/app/_services/case";

type ModalType = {
  handleClose(): void;
  splits: SplitDataType[];
  case?: ICase;
  financialEntryId: string;
  status: any;
  description?: string;
  dueDate?: string;
  amount: number;
};

function PayPaymentModal({
  splits,
  case: caseData,
  handleClose,
  financialEntryId,
  status,
  description,
  dueDate,
  amount,
}: ModalType) {
  const { mutateAsync: payPayment } = usePayPayment();

  const statusBgColor: any = {
    PENDING: "bg-yellow-200",
    PAID: "bg-green-200",
    LATE: "bg-red-200",
  };

  const statusTranslate: any = {
    PENDING: "Pendente",
    PAID: "Pago",
    LATE: "Atrasado",
  };

  const SplitTypeTranslate = {
    OFFICE: "Escritorio",
    LAWYER: "Advogado",
    INDICATOR: "Indicação",
  };

  const handleClickPay = async () => {
    try {
      if (financialEntryId) {
        const res = await payPayment(financialEntryId);

        if (res) {
          enqueueSnackbar({
            message: "Pagamento pago",
            variant: "success",
          });
          handleClose();
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-sm max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Efetuar pagamento</DialogTitle>
          <DialogDescription>Confirme para efeituar o pagamento e a geraçao das proximas transaçoes</DialogDescription>
        </DialogHeader>

        <div>
          <div className="font-semibold text-3xl text-center my-8">R${numberFormat(amount)}</div>

          <div className="border rounded min-h-36 p-4 flex flex-col text-sm gap-2">
            {caseData ? (
              <div className="flex justify-between">
                <div className="font-semibold">Processo</div>
                <div>{caseData?.title}</div>
              </div>
            ) : null}

            {dueDate ? (
              <div className="flex justify-between">
                <div className="font-semibold">Data de vencimento</div>
                <div>{dueDate ? moment(dueDate).format("DD/MM/YYYY") : null}</div>
              </div>
            ) : null}

            {caseData?.client ? (
              <div className="flex justify-between">
                <div className="font-semibold">Responsavel pagamento</div>
                <div>
                  {caseData?.client?.firstName} {caseData?.client?.lastName}
                </div>
              </div>
            ) : null}

            <div className="flex justify-between">
              <div className="font-semibold">Status atual</div>

              <div>
                <div
                  className={`${statusBgColor[status]} p-1 text-xs flex justify-center font-medium min-w-[50px] rounded`}
                >
                  {statusTranslate[status]}
                </div>
              </div>
            </div>

            {splits?.length ? (
              <>
                <hr className="border-t border-gray-300" />
                <div className="flex justify-between">
                  <div className="font-semibold">Divisão financeira</div>
                </div>
              </>
            ) : null}

            {splits?.map((item, key) => (
              <div className="flex justify-between text-xs" key={key}>
                <div className="">{SplitTypeTranslate[item.type]}</div>
                <div>
                  {numberFormat(item.amount, "pt-br", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            ))}

            <hr className="border-t border-gray-300" />

            {description ? (
              <>
                <div className="flex justify-between">
                  <div className="font-semibold">Descrição</div>
                </div>

                <div>{description}</div>
              </>
            ) : null}
          </div>

          <div className="mt-4">
            <Button className="w-full" onClick={handleClickPay}>
              <LuDollarSign />
              Realizar pagamento
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PayPaymentModal;
