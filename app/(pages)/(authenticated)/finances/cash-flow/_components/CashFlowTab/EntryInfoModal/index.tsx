"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/Button";
import { AmountType, CashFlowDataType, FinancialEntryStatus } from "@/app/_services/finanances";
import { useDeleteEntry, usePayEntry } from "@/app/_hooks/finances";
import { enqueueSnackbar } from "notistack";
import { numberFormat } from "@/app/_utils";
import moment from "moment";
import { LuArrowDown, LuArrowUp, LuCopy, LuDollarSign, LuTrash } from "react-icons/lu";
import { Spinner } from "@/app/_components/ui/Spinner";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";
import { useState } from "react";

type ModalType = {
  data: CashFlowDataType;
  handleClose(): void;
};

function EntryInfoModal({ data, handleClose }: ModalType) {
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  const { mutateAsync: payEntry, isPending } = usePayEntry();
  const { mutateAsync: deleteEntry } = useDeleteEntry();

  const originTranslate: any = {
    PAYMENT: "Conta gerada através de Pagamento",
    SPLIT: "Divisão financeira",
    MANUAL: "Conta criada manualmente",
    CASE: "Outro",
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
      if (data.id) {
        const res = await payEntry(data.id);

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

  const handleDeletePayment = async () => {
    try {
      await deleteEntry(data.id!);
      enqueueSnackbar({
        message: "Título financeiro removido com sucesso",
        variant: "success",
      });
      setConfirmModalIsOpen(false);
      handleClose();
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar({
        message: "Erro ao remover título financeiro",
        variant: "error",
      });
    }
  };

  return (
    <>
      <Dialog open onOpenChange={handleClose}>
        <DialogContent className="max-w-screen-sm max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Informações sobre título financeiro</DialogTitle>
            <DialogDescription>
              {data.status != "PAID"
                ? "Confirme para efeituar o pagamento e a geração das proximas transaçoes"
                : "Veja todas as informações sobre este títulos financeiro"}
            </DialogDescription>
          </DialogHeader>

          <div>
            <div className="flex flex-col justify-center items-center my-8">
              <div className="font-semibold text-3xl text-center">R${numberFormat(data.amount)}</div>
              <div
                className={`${
                  entryStatusBgColor[data.status]
                } p-1 px-2 text-xs flex justify-center font-medium min-w-[50px] rounded`}
              >
                {entryStatusTranslate[data.status]}
              </div>
            </div>

            <div className="border rounded p-4 flex flex-col text-sm gap-2 mb-4">
              <div className="flex justify-between">
                <div className="font-semibold">Tipo de titulo</div>
                <div>
                  <div>
                    {data.type == "RECEIVABLE" ? (
                      <div className="px-2 flex items-center justify-center gap-2 font-medium text-sm bg-green-200 p-1 min-w-8">
                        <LuArrowDown /> receita{" "}
                        {data.status != FinancialEntryStatus.PAID ? `(${entryTypeTranslate[data.type]})` : null}
                      </div>
                    ) : (
                      <div className="px-2 flex items-center justify-center gap-2 font-medium text-sm bg-red-100 p-1 min-w-8">
                        <LuArrowUp /> despesa
                      </div>
                    )}
                  </div>
                </div>
              </div>

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

              <div className="flex justify-between">
                <div className="font-semibold">Origem</div>
                <div>{originTranslate[data.origin]}</div>
              </div>

              <div className="flex justify-between">
                <div className="font-semibold">Método de pagamento</div>
                <div>{paymentMethodTranslate[data.method]}</div>
              </div>

              <div className="flex justify-between items-center">
                <div className="font-semibold">ID</div>
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

              {data?.case ? (
                <>
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
                  <hr className="border-t border-gray-300" />
                </>
              ) : null}

              {data.split ? (
                <>
                  <div className="">
                    <div className="font-semibold">Origem desse título</div>
                  </div>

                  <div className="flex justify-between text-xs">
                    <div className="">{SplitTypeTranslate[data.split?.type]}</div>
                    <div>
                      {data.split?.amountType == AmountType.FIXED
                        ? numberFormat(data.split.amount, "pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : `${data.split.amount}% (${numberFormat(data.split.amount, "pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })})`}
                    </div>
                  </div>
                </>
              ) : null}

              <hr className="border-t border-gray-300" />

              <div className="">
                <div className="font-semibold">Nota complementar</div>
              </div>

              <div className="flex justify-between text-xs">{data.description || "* Nenhuma nota adicionada"}</div>
            </div>

            {data.status != "PAID" ? (
              <div className="mt-4">
                <Button className="w-full" onClick={handleClickPay}>
                  {!isPending ? (
                    <>
                      <LuDollarSign />
                      Pagar título financeiro
                    </>
                  ) : (
                    <>
                      <Spinner /> Carregando
                    </>
                  )}
                </Button>
              </div>
            ) : null}

           {data.status != "PAID" ? <Button
              variant="outline"
              type="button"
              className="w-full mt-2"
              onClick={() => {
                setConfirmModalIsOpen(true);
              }}
            >
              {!isPending ? (
                <>
                  <LuTrash />
                  Remover pagamento
                </>
              ) : (
                <>
                  <Spinner /> Carregando
                </>
              )}
            </Button>: null}
          </div>
        </DialogContent>
      </Dialog>

      {confirmModalIsOpen ? (
        <ConfirmDialog
          open={confirmModalIsOpen}
          handleClose={() => setConfirmModalIsOpen(false)}
          title="Remover esse pagamento"
          description="Deseja remover esse pagamento e as titulos financeiros geradas por ele? Após confirmar, não será possível desfazer o processo."
          handleConfirm={() => handleDeletePayment()}
        />
      ) : null}
    </>
  );
}

export default EntryInfoModal;
