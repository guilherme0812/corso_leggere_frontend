"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/Button";
import {
  GetAllPaymentDataType,
  PayPaymentDataType,
  PayTransactionDTO,
  TransactionDataType,
} from "@/app/_services/finanances";
import { usePaymentInstallments, usePayPayment, usePayTransaction } from "@/app/_hooks/finances";
import { enqueueSnackbar } from "notistack";
import { numberFormat } from "@/app/_utils";
import moment from "moment";
import { LuCopy, LuDollarSign } from "react-icons/lu";
import { Spinner } from "@/app/_components/ui/Spinner";
import ConfirmDialog from "@/app/_components/ui/ConfirmDialog";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { DatePicker } from "@/app/_components/ui/DatePicker";

type ModalType = {
  data: TransactionDataType;
  handleClose(): void;
};

const statusBgColor = {
  PENDING: "bg-yellow-200",
  COMPLETED: "bg-green-200",
  FAILED: "bg-red-200",
  CANCELLED: "bg-yellow-200",
  REVERSED: "bg-yellow-200",
};

export const typeTranslate = {
  INCOME: "Entrada",
  EXPENSE: "Saída",
  TRANSFER: "Transferência",
  REFUND: "Estorno",
  ADJUSTMENT: "Ajuste manual",
};

export const statusTranslate = {
  PENDING: "Pendente",
  COMPLETED: "Concluída",
  FAILED: "Falhou",
  CANCELLED: "Cancelado",
  REVERSED: "Estornada",
};

export default function TransactionInfoModal({ data, handleClose }: ModalType) {
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [payModalIsOpen, setPayModalIsOpen] = useState(false);
  const [paytransactionBody, setPayTransactionBody] = useState<PayTransactionDTO>({
    amount: 0,
    transactionId: data.id,
    transactionDate: new Date().toISOString().split("T")[0],
  });

  const { mutateAsync: payTransaction, isPending } = usePayTransaction();

  const SplitTypeTranslate = {
    OFFICE_FEE: "Escritorio",
    ATTORNEY_FEE: "Advogado",
    REFERRAL_FEE: "Indicação",
    PARTNER_FEE: "Parceiro",
    EXPENSE: "Despesa/custo",
  };

  const handleClickPay = async () => {
    try {
      if (data.id) {
        const res = await payTransaction({
          ...paytransactionBody,
        });

        if (res) {
          enqueueSnackbar({
            message: "Transação paga com sucesso",
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
    // try {
    //   await deletePayment(data.id!);
    //   enqueueSnackbar({
    //     message: "Pagamento removido com sucesso",
    //     variant: "success",
    //   });
    //   setConfirmModalIsOpen(false);
    //   handleClose();
    // } catch (error: any) {
    //   console.log(error);
    //   enqueueSnackbar({
    //     message: "Erro ao remover pagamento",
    //     variant: "error",
    //   });
    // }
  };

  const paymentMethods = [
    {
      id: "PIX",
      label: "PIX",
    },
    {
      id: "TRANSFER",
      label: "Transferência",
    },
    {
      id: "CASH",
      label: "Dinheiro",
    },
    {
      id: "BANK_TRANSFER",
      label: "Transferencia",
    },
    {
      id: "CREDIT_CARD",
      label: "Cartao de credito",
    },
    {
      id: "DEBIT_CARD",
      label: "Cartao de debito",
    },
    {
      id: "CHECK",
      label: "Cheque",
    },
    {
      id: "BANK_SLIP",
      label: "Beleto",
    },
    {
      id: "OTHER",
      label: "Outro",
    },
  ];

  return (
    <>
      <Dialog open onOpenChange={handleClose}>
        <DialogContent className="max-w-screen-sm max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>informações sobre o pagamento</DialogTitle>
            <DialogDescription>
              {/* {data.status != "PAID"
                ? "Confirme para efeituar o pagamento e a geração das proximas transaçoes"
                : "Veja todas as informações sobre este pagamento"} */}
            </DialogDescription>
          </DialogHeader>

          <div>
            <div className="flex flex-col justify-center items-center my-8">
              <div className="font-semibold text-3xl text-center">
                {numberFormat(data.amount, "pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </div>
              <div
                className={`${
                  statusBgColor[data.status]
                } p-1 px-2 text-xs flex justify-center font-medium min-w-[50px] rounded`}
              >
                {statusTranslate[data.status]}
              </div>
            </div>

            <div className="border rounded p-4 flex flex-col text-sm gap-2 mb-4">
              <div className="flex justify-between">
                <div className="font-semibold">Tipo</div>
                <div>{data.type}</div>
              </div>

              {data.effectiveDate ? (
                <div className="flex justify-between">
                  <div className="font-semibold">Data de pagamento</div>
                  <div>{data.effectiveDate ? moment(data.effectiveDate).format("DD/MM/YYYY") : null}</div>
                </div>
              ) : null}

              {data.transactionDate ? (
                <div className="flex justify-between">
                  <div className="font-semibold">Data de vencimento</div>
                  <div>{data.transactionDate ? moment(data.transactionDate).format("DD/MM/YYYY") : null}</div>
                </div>
              ) : null}

              <div className="flex justify-between items-center w-full">
                <div className="font-semibold flex-shrink-0">Código do pagamento</div>
                <div className="flex items-center flex-2 text-xs w-[40%] justify-end">
                  <div className="truncate">{data.code}</div>
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

              <div className="flex items-center gap-4 justify-between">
                <div className="font-semibold flex-shrink-0">Descrição</div>
                <div className="text-xs">{data.description}</div>
              </div>

              <div className="flex items-center gap-4 justify-between">
                <div className="font-semibold flex-shrink-0">Método de pagamento</div>
                <div className="text-xs">{data.method}</div>
              </div>

              {/* {data?.transactions?.length ? (
                <>
                  <hr className="border-t border-gray-300" />

                  <div className="">
                    <div className="font-semibold">Transações do pagamentos</div>
                  </div>

                  {data.transactions?.map((item, key) => (
                    <div className="flex justify-between text-xs" key={key}>
                      <div className="">{typeTranslate[item.type]}</div>
                      <div>Pago: {moment(item.effectiveDate).format("DD/MM/YYYY")}</div>
                      <div>
                        {numberFormat(item.amount, "pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </div>
                    </div>
                  ))}
                </>
              ) : null} */}
            </div>

            {/* {data.status != "PAID" ? (
              <div className="mt-4">
                <Button className="w-full" onClick={() => setPayModalIsOpen(true)}>
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
            ) : null} */}

            <Dialog open={payModalIsOpen} onOpenChange={setPayModalIsOpen}>
              <DialogContent className="max-w-screen-[400px] overflow-y-auto">
                <DialogTitle>Realizar pagamento</DialogTitle>
                <DialogDescription>Preencha as informaçoes a seguir</DialogDescription>

                <div>
                  <Label>Valor</Label>
                  <NumericFormat
                    customInput={Input}
                    name="amount"
                    placeholder="Digite o valor a ser pago"
                    variant="filled"
                    decimalSeparator=","
                    thousandSeparator="."
                    className="py-6"
                    onValueChange={({ floatValue }) =>
                      setPayTransactionBody({ ...paytransactionBody, amount: floatValue || 0 })
                    }
                    value={paytransactionBody.amount}
                  />
                </div>

                <div>
                  <Label>Data de pagamento</Label>
                  <DatePicker
                    buttonClassName="py-6"
                    initialValue={new Date()}
                    placeholder="Data em que foi pago"
                    onChange={(date) =>
                      date &&
                      setPayTransactionBody({
                        ...paytransactionBody,
                        transactionDate: date?.toISOString().split("T")[0],
                      })
                    }
                  />
                </div>

                <div>
                  <Button
                    type="button"
                    onClick={handleClickPay}
                    disabled={paytransactionBody.amount && paytransactionBody.transactionDate ? false : true}
                    variant={"secondary"}
                    className="w-full py-6 bg-gradient-to-br from-emerald-500 to-emerald-600"
                  >
                    <LuDollarSign />
                    Definir como pago
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* <Button
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
            </Button> */}
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
