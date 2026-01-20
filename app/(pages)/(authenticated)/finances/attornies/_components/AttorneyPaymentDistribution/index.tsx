import { Button } from "@/app/_components/ui/Button";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Spinner } from "@/app/_components/ui/Spinner";
import { usePayDistribution } from "@/app/_hooks/finances";
import { AttorneyPendingPaymentDataType } from "@/app/_services/attorney";
import { PayDistributionBody } from "@/app/_services/finanances";
import { numberFormat } from "@/app/_utils";
import moment from "moment";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { LuCopy, LuDollarSign } from "react-icons/lu";
import { NumericFormat } from "react-number-format";

interface AttorneyPaymentDistributionProps {
  handleClose(): void;
  data: AttorneyPendingPaymentDataType;
}

function AttorneyPaymentDistribution({ data, handleClose }: AttorneyPaymentDistributionProps) {
  const [payModalIsOpen, setPayModalIsOpen] = useState(false);
  const [payDistributionData, setPayDistributionData] = useState<PayDistributionBody>({
    amount: data.calculatedAmount,
    distributionId: data.id,
    method: "",
    transactionDate: new Date().toISOString().split("T")[0],
  });

  const { mutateAsync: payDistribution, isPending } = usePayDistribution();

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

  const handleClickPay = async () => {
    try {
      if (data.id) {
        const res = await payDistribution({
          ...payDistributionData,
        });

        if (res) {
          enqueueSnackbar({
            message: "Pagamento realizado com sucesso",
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
          <DialogTitle>Realizar pagamento de honorarios</DialogTitle>
          <DialogDescription>Confirme para efeituar o pagamento e a geração das proximas transaçoes</DialogDescription>
        </DialogHeader>

        <div>
          <div className="flex flex-col justify-center items-center my-8">
            <div className="font-semibold text-3xl text-center">
              {numberFormat(data.calculatedAmount, "pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <div
              className={`${
                data.isPaid ? "bg-green-500" : "bg-yellow-400"
              } p-1 px-2 text-xs flex justify-center font-medium min-w-[50px] rounded`}
            >
              {data.isPaid ? "Pago" : "Pendente"}
            </div>
          </div>

          <div className="border rounded p-4 flex flex-col text-sm gap-2 mb-4">
            {data.dueDate ? (
              <div className="flex justify-between">
                <div className="font-semibold">Data de vencimento</div>
                <div>{data.dueDate ? moment(data.dueDate).format("DD/MM/YYYY") : null}</div>
              </div>
            ) : null}

            <div className="flex justify-between items-center w-full">
              <div className="font-semibold flex-shrink-0">Código do pagamento</div>
              <div className="flex items-center flex-2 text-xs w-[40%]">
                <div className="truncate">{data.payment.code}</div>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      enqueueSnackbar({
                        message: "ID do pagamento copiado para a área de transferência",
                        variant: "info",
                      });
                      navigator.clipboard.writeText(data.payment.code!);
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
              <div>{data.payment.case?.title}</div>
            </div>
            <div className="flex justify-between text-xs">
              <div className="">Número do processo</div>
              <div>{data.payment.case?.processNumber}</div>
            </div>

            {!data.isPaid ? (
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
          </div>
        </div>

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
                  setPayDistributionData({ ...payDistributionData, amount: floatValue || 0 })
                }
                value={payDistributionData.amount}
              />
            </div>

            <div>
              <Label>Método de Pagamento</Label>

              <Select
                value={payDistributionData.method || ""}
                onValueChange={(value) => {
                  setPayDistributionData({ ...payDistributionData, method: value });
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
                  setPayDistributionData({ ...payDistributionData, transactionDate: date?.toISOString().split("T")[0] })
                }
              />
            </div>

            <div>
              <Button
                type="button"
                onClick={handleClickPay}
                disabled={
                  payDistributionData.amount && payDistributionData.method && payDistributionData.transactionDate
                    ? false
                    : true
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
      </DialogContent>
    </Dialog>
  );
}

export default AttorneyPaymentDistribution;
