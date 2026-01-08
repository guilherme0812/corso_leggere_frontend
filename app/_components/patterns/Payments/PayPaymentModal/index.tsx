"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/Button";
import { AmountType, PaymentDataType } from "@/app/_services/finanances";
import { usePayPayment } from "@/app/_hooks/finances";
import { enqueueSnackbar } from "notistack";
import { numberFormat } from "@/app/_utils";
import moment from "moment";
import { LuCopy, LuDollarSign } from "react-icons/lu";
import { Spinner } from "@/app/_components/ui/Spinner";

type ModalType = {
  data: PaymentDataType;
  handleClose(): void;
};

function PayPaymentModal({ data, handleClose }: ModalType) {
  const { mutateAsync: payPayment, isPending } = usePayPayment();

  const statusBgColor: any = {
    PENDING: "bg-yellow-200",
    PAID: "bg-green-200",
    LATE: "bg-red-200",
    OVERDUE: "bg-red-200", // arrive from entry
  };

  const statusTranslate: any = {
    PENDING: "Aguardando pagamento (pendente)",
    PAID: "Pagamento já realizado",
    LATE: "Pagamento em atraso",
  };

  const SplitTypeTranslate = {
    OFFICE: "Escritorio",
    LAWYER: "Advogado",
    INDICATOR: "Indicação",
  };

  const entryTypeTranslate = {
    RECEIVABLE: "Conta a receber",
    PAYABLE: "Conta a pagar",
  };

  const entryStatusBgColor: any = {
    PENDING: "bg-yellow-200",
    PAID: "bg-green-200",
    PARTIAL: "bg-red-100",
    OVERDUE: "bg-red-200", // arrive from entry
  };

  const entryStatusTranslate: any = {
    PENDING: "Pendente",
    PAID: "Pago",
    PARTIAL: "Parcial",
    OVERDUE: "Atrasado",
  };

  const paymentMethodTranslate: any = {
    PIX: "PIX",
    TRANSFER: "Pago",
    CASH: "Dinheiro",
    CREDIT_CARD: "Cartão de crédito",
    OTHER: "Outro",
    DEPOSIT: "Entrada/Depósito",
    PAYOUT: "Saída/Levantamento",
    REFUND: "Rembolso",
    CHARGEBACK: "Estorno contestado",
  };

  const handleClickPay = async () => {
    try {
      if (data.entries && data.entries.length > 0) {
        const res = await payPayment(data.entries[0].id);

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
          <DialogTitle>informações sobre o pagamento</DialogTitle>
          <DialogDescription>
            {data.status != "PAID"
              ? "Confirme para efeituar o pagamento e a geração das proximas transaçoes"
              : "Veja todas as informações sobre este pagamento"}
          </DialogDescription>
        </DialogHeader>

        <div>
          <div className="flex flex-col justify-center items-center my-8">
            <div className="font-semibold text-3xl text-center">R${numberFormat(data.amount)}</div>
            <div
              className={`${
                statusBgColor[data.status]
              } p-1 px-2 text-xs flex justify-center font-medium min-w-[50px] rounded`}
            >
              {statusTranslate[data.status]}
            </div>
          </div>

          <div className="border rounded p-4 flex flex-col text-sm gap-2 mb-4">
            {data.paidAt ? (
              <div className="flex justify-between">
                <div className="font-semibold">Data de pagamento</div>
                <div>{data.paidAt ? moment(data.paidAt).format("DD/MM/YYYY") : null}</div>
              </div>
            ) : null}

            {data.dueDate ? (
              <div className="flex justify-between">
                <div className="font-semibold">Data de vencimento</div>
                <div>{data.dueDate ? moment(data.dueDate).format("DD/MM/YYYY") : null}</div>
              </div>
            ) : null}

            <div className="flex justify-between items-center">
              <div className="font-semibold">Método de pagamento</div>
              <div>{paymentMethodTranslate[data.method]}</div>
            </div>

            <div className="flex justify-between items-center">
              <div className="font-semibold">ID do pagamento</div>
              <div className="flex items-center flex-2 text-xs">
                <div>{data.id}</div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      enqueueSnackbar({
                        message: "ID copiado para a área de transferência",
                        variant: "info",
                      });
                      navigator.clipboard.writeText(data.id!);
                    }}
                  >
                    <LuCopy />
                  </Button>
                </div>
              </div>
            </div>

            <hr className="border-t border-gray-300" />

            <div className="">
              <div className="font-semibold">Informações sobre o processo</div>
            </div>

            <div className="flex justify-between text-xs">
              <div className="">Descrição</div>
              <div>{data.case?.title}</div>
            </div>
            <div className="flex justify-between text-xs">
              <div className="">Número do processo</div>
              <div>{data.case?.processNumber}</div>
            </div>
            <div className="flex justify-between text-xs">
              <div className="">Nome cliente/Responsável pelo pagamento</div>
              <div>
                {data.case?.client.firstName} {data.case?.client.lastName}
              </div>
            </div>

            <hr className="border-t border-gray-300" />

            <div className="">
              <div className="font-semibold">Divisão financeira</div>
            </div>

            {data.splits?.map((item, key) => (
              <div className="flex justify-between text-xs" key={key}>
                <div className="">{SplitTypeTranslate[item.type]}</div>
                <div>
                  {item.amountType == AmountType.FIXED
                    ? numberFormat(item.amount, "pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })
                    : `${item.amount}% (${numberFormat(item.amount, "pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })})`}
                </div>
              </div>
            ))}

            <hr className="border-t border-gray-300" />

            <div className="">
              <div className="font-semibold">Títulos financeiros gerados</div>
            </div>

            {data.entries?.map((item, key) => (
              <div className="flex justify-between text-xs" key={key}>
                <div className="">{entryTypeTranslate[item.type]}</div>
                <div className="flex items-center gap-2">
                  <div>
                    {numberFormat(item.amount, "pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                  <div
                    className={`${
                      entryStatusBgColor[item.status]
                    } p-1 px-2 text-xs flex justify-center font-medium min-w-[80px] rounded`}
                  >
                    {entryStatusTranslate[item.status]}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data.status != "PAID" ? (
            <div className="mt-4">
              <Button className="w-full" onClick={handleClickPay}>
                {!isPending ? (
                  <>
                    <LuDollarSign />
                    Realizar pagamento
                  </>
                ) : (
                  <>
                    <Spinner /> Carregando
                  </>
                )}
              </Button>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PayPaymentModal;
