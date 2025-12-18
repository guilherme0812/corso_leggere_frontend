"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/Button";
import { PaymentDataType } from "@/app/_services/finanances";
import { usePayPayment } from "@/app/_hooks/finances";
import { enqueueSnackbar } from "notistack";
import { numberFormat } from "@/app/_utils";
import moment from "moment";
import { LuDollarSign } from "react-icons/lu";

type ModalType = {
  handleClose(): void;
  editData: PaymentDataType;
};

function PayPaymentModal({ editData, handleClose }: ModalType) {
  const { mutateAsync: payPayment } = usePayPayment();

  const statusBgColor = {
    PENDING: "bg-yellow-200",
    PAID: "bg-green-200",
    LATE: "bg-red-200",
  };

  const statusTranslate = {
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
      const entryId = editData.entries[0]?.id;
      if (entryId) {
        const res = await payPayment(entryId);

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
          <div className="font-semibold text-3xl text-center my-8">R${numberFormat(editData?.amount)}</div>

          <div className="border rounded min-h-36 p-4 flex flex-col text-sm gap-2">
            <div className="flex justify-between">
              <div className="font-semibold">Processo</div>
              <div>{editData.case.title}</div>
            </div>

            <div className="flex justify-between">
              <div className="font-semibold">Data de vencimento</div>
              <div>{moment(editData.dueDate).format("DD/MM/YYYY")}</div>
            </div>

            <div className="flex justify-between">
              <div className="font-semibold">Responsavel pagamento</div>
              <div>
                {editData.case.client.firstName} {editData.case.client.lastName}
              </div>
            </div>

            <div className="flex justify-between">
              <div className="font-semibold">Status atual</div>
              <div>
                <div
                  className={`${
                    statusBgColor[editData.status]
                  } p-1 text-xs flex justify-center font-medium min-w-[50px] rounded`}
                >
                  {statusTranslate[editData.status]}
                </div>
              </div>
            </div>

            <hr className="border-t border-gray-300" />

            <div className="flex justify-between">
              <div className="font-semibold">Divisão financeira</div>
            </div>

            {editData?.splits?.map((item, key) => (
              <div className="flex justify-between text-xs" key={key}>
                <div className="">{SplitTypeTranslate[item.type]}</div>
                <div>{numberFormat(item.amount)}</div>
              </div>
            ))}
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
