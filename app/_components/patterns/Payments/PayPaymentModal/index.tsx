"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/Button";
import { GetAllPaymentDataType, PayPaymentDataType } from "@/app/_services/finanances";
import { usePaymentInstallments, usePayPayment } from "@/app/_hooks/finances";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import { typeTranslate } from "@/app/(pages)/(authenticated)/finances/transactions/_components/TransactionTable";
import {
  statusBgColor,
  statusTranslate,
} from "@/app/(pages)/(authenticated)/finances/payments/_components/ClientPaymentsTab/ClientPaymentsTable";
import Skeleton from "@/app/_components/ui/Skeleton";

type ModalType = {
  data: GetAllPaymentDataType;
  handleClose(): void;
};

function PayPaymentModal({ data, handleClose }: ModalType) {
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [payModalIsOpen, setPayModalIsOpen] = useState(false);
  const [payPaymentBody, setPayPaymentBody] = useState<PayPaymentDataType>({
    amount: data.remainingAmount,
    method: "",
    paymentId: data.id,
    transactionDate: new Date().toISOString().split("T")[0],
  });

  const { mutateAsync: payPayment, isPending } = usePayPayment();
  const { data: installments, isFetching: installmentsIsLoading } = usePaymentInstallments({
    filters: {
      parentPaymentId: data.parentPaymentId as string,
    },
    enabled: data.parentPaymentId ? true : false,
  });

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
        const res = await payPayment({
          ...payPaymentBody,
        });

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
              {data.status != "PAID"
                ? "Confirme para efeituar o pagamento e a geração das proximas transaçoes"
                : "Veja todas as informações sobre este pagamento"}
            </DialogDescription>
          </DialogHeader>

          <div>
            <div className="flex flex-col justify-center items-center my-8">
              <div className="font-semibold text-3xl text-center">R${numberFormat(data.totalAmount)}</div>
              <div
                className={`${
                  statusBgColor[data.status]
                } p-1 px-2 text-xs flex justify-center font-medium min-w-[50px] rounded`}
              >
                {statusTranslate[data.status]}
              </div>
            </div>

            <div className="border rounded p-4 flex flex-col text-sm gap-2 mb-4">
              {/* {data.paidAt ? (
                <div className="flex justify-between">
                  <div className="font-semibold">Data de pagamento</div>
                  <div>{data.paidAt ? moment(data.paidAt).format("DD/MM/YYYY") : null}</div>
                </div>
              ) : null} */}

              {data.dueDate ? (
                <div className="flex justify-between">
                  <div className="font-semibold">Data de vencimento</div>
                  <div>{data.dueDate ? moment(data.dueDate).format("DD/MM/YYYY") : null}</div>
                </div>
              ) : null}

              {data.parentPaymentId ? (
                <div className="flex justify-between">
                  <div className="font-semibold">Parcela</div>
                  <div>
                    {data.installmentNumber} de {data.installmentTotal}
                  </div>
                </div>
              ) : null}

              {/* <div className="flex justify-between items-center">
                <div className="font-semibold">Método de pagamento</div>
                <div>{paymentMethodTranslate[data.]}</div>
              </div> */}

              <div className="flex justify-between items-center w-full">
                <div className="font-semibold flex-shrink-0">Código do pagamento</div>
                <div className="flex items-center flex-2 text-xs w-[40%]">
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
              {/* <div className="flex justify-between text-xs">
                <div className="">Nome cliente/Responsável pelo pagamento</div>
                <div>
                  {data.case?.client.firstName} {data.case?.client.lastName}
                </div>
              </div> */}

              <hr className="border-t border-gray-300" />

              <div className="">
                <div className="font-semibold">Divisão financeira</div>
              </div>

              {data.distributions?.map((item, key) => (
                <div className="flex justify-between text-xs" key={key}>
                  <div className="">
                    {SplitTypeTranslate[item.type]}: {item.beneficiary?.name}
                  </div>
                  <div>
                    {numberFormat(item.calculatedAmount, "pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>
              ))}

              {data?.transactions?.length ? (
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
              ) : null}

              {installments?.length ? (
                <>
                  <hr className="border-t border-gray-300" />

                  <div className="">
                    <div className="font-semibold">Parcelas</div>
                  </div>

                  {installments?.map((item, key) => (
                    <div className="flex justify-between text-xs" key={key}>
                      <div className="flex items-center gap-2">
                        <div>
                          Parcela {item.installmentNumber} de {item.installmentTotal}{" "}
                          {item.id == data.id ? "(Atual em exibiçao)" : null}
                        </div>
                        -
                        <div>
                          {numberFormat(item.totalAmount, "pt-br", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div>{moment(item.dueDate).format("DD/MM/yyyy")}</div>

                        <div
                          className={`${
                            statusBgColor[item.status]
                          } p-1 px-2 text-xs flex justify-center font-medium min-w-[50px] rounded`}
                        >
                          {statusTranslate[item.status]}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : null}

              {installmentsIsLoading ? (
                <>
                  <Skeleton className="w-full h-5 mb-2 bg-gray-200" />
                  <Skeleton className="w-full h-5 mb-2 bg-gray-200" />
                  <Skeleton className="w-full h-5 mb-2 bg-gray-200" />
                  <Skeleton className="w-full h-5 mb-2 bg-gray-200" />
                </>
              ) : null}
            </div>

            {data.status != "PAID" ? (
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
            ) : null}

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
                      setPayPaymentBody({ ...payPaymentBody, amount: floatValue || 0 })
                    }
                    value={payPaymentBody.amount}
                  />
                </div>

                <div>
                  <Label>Método de Pagamento</Label>

                  <Select
                    value={payPaymentBody.method || ""}
                    onValueChange={(value) => {
                      setPayPaymentBody({ ...payPaymentBody, method: value });
                    }}
                  >
                    <SelectTrigger variant="filled" className="px-8 py-6">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {paymentMethods?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Data de pagamento</Label>
                  <DatePicker
                    buttonClassName="py-6"
                    initialValue={new Date()}
                    placeholder="Data em que foi pago"
                    onChange={(date) =>
                      date &&
                      setPayPaymentBody({ ...payPaymentBody, transactionDate: date?.toISOString().split("T")[0] })
                    }
                  />
                </div>

                <div>
                  <Button
                    type="button"
                    onClick={handleClickPay}
                    disabled={
                      payPaymentBody.amount && payPaymentBody.method && payPaymentBody.transactionDate ? false : true
                    }
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

export default PayPaymentModal;
