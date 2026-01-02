"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { PaymentBodyType, PaymentDataType, PaymentStatus, SplitDataType, SplitType } from "@/app/_services/finanances";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import { UseCases } from "@/app/_hooks/cases";
import { NumericFormat } from "react-number-format";
import { useCreatePayment } from "@/app/_hooks/finances";
import { enqueueSnackbar } from "notistack";
import { LuPlus, LuTrash } from "react-icons/lu";

type ModalType = {
  handleClose(): void;
  editData: PaymentDataType | undefined;
  initialCaseId?: string;
};

const schema = Yup.object().shape({
  caseId: Yup.string().required("Processo é obrigatório"),
  amount: Yup.number().positive("Campo obrigatório"),
  dueDate: Yup.string().required("Data de vencimento é obrigatório"),
  status: Yup.string().required("Data de vencimento é obrigatório"),
});

function PaymentModal({ editData, handleClose, initialCaseId }: ModalType) {
  const [isPending, startTransition] = useTransition();

  const [splits, setSplits] = useState<Omit<SplitDataType, "id" | "paymentId">[]>([]);
  const totalSplitsAmount = splits.reduce((total, split) => total + split.amount, 0);
  const { data: cases } = UseCases({});
  const { mutateAsync: createPayment } = useCreatePayment();

  async function handleSubmit(values: any) {
    startTransition(async () => {
      try {
        if (editData) {
        } else {
          const payload: PaymentBodyType = {
            amount: values.amount,
            caseId: values.caseId,
            dueDate: (values.dueDate as Date).toISOString().split("T")[0], // "2025-12-01"
            status: values.status,
            splits,
          };

          const res = await createPayment(payload);

          enqueueSnackbar({ message: "Pagamento criado com sucesso", variant: "success" });
          res && handleClose();
        }
      } catch (error: any) {
        console.log(error);
      }
    });
  }

  const initialValues = editData
    ? editData
    : {
        caseId: initialCaseId,
        amount: 0,
        dueDate: undefined,
        status: "PENDING",
      };

  const statusOptions = [
    {
      id: PaymentStatus.PENDING,
      label: PaymentStatus.PENDING.toLocaleLowerCase(),
    },
    {
      id: PaymentStatus.PAID,
      label: PaymentStatus.PAID.toLocaleLowerCase(),
    },
    {
      id: PaymentStatus.LATE,
      label: PaymentStatus.LATE.toLocaleLowerCase(),
    },
  ];
  const splitOptions = [
    {
      id: SplitType.LAWYER,
    },
    {
      id: SplitType.INDICATOR,
    },
  ];

  const handleAddSplit = () => {
    setSplits((old) => [
      ...old,
      {
        amount: 0,
        type: SplitType.LAWYER,
      },
    ]);
  };

  const handleRemoveSplit = (index: number) => {
    setSplits((old) => old.filter((_, i) => i !== index));
  };
  const handleUpdateSplitAmount = (index: number, value: number) => {
    setSplits((old) => old.map((item, i) => (i === index ? { ...item, amount: value } : item)));
  };
  const handleUpdateSplitType = (index: number, value: SplitType) => {
    setSplits((old) => old.map((item, i) => (i === index ? { ...item, type: value } : item)));
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-md max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Alterar" : "Adicionar"} pagamento</DialogTitle>
          <DialogDescription>
            Preencha o formulario para {editData ? "Alterar" : "adicionar"} um pagamento.
          </DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <Label>Processo</Label>
                  <Select
                    value={values.caseId || ""}
                    onValueChange={(value) => {
                      setFieldValue("caseId", value);
                    }}
                  >
                    <SelectTrigger className="w-full" variant="filled">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {!cases ? "Carregando..." : undefined}
                      {cases?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.caseId && <div className="text-red-500 text-sm">{errors.caseId}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Valor da cobrança</Label>
                  <NumericFormat
                    customInput={Input}
                    name="amount"
                    placeholder="Digite o sobrenome"
                    variant="filled"
                    decimalSeparator=","
                    thousandSeparator="."
                    onValueChange={({ floatValue }) => setFieldValue("amount", floatValue)}
                  />
                  {errors.amount && touched.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Data da cobrança</Label>
                  <DatePicker placeholder="Data de vencimento" onChange={(date) => setFieldValue("dueDate", date)} />
                  {errors.dueDate && touched.dueDate && <div className="text-red-500 text-sm">{errors.dueDate}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Status</Label>

                  <Select
                    value={values.status || ""}
                    onValueChange={(value) => {
                      setFieldValue("status", value);
                    }}
                  >
                    <SelectTrigger className="w-full" variant="filled">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {statusOptions?.map((item) => (
                        <SelectItem key={item.label} value={item.id}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {values.amount && values.dueDate ? (
                  <div className="border rounded min-h-36 p-4 flex flex-col text-sm gap-2 col-span-12">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold">Divisão financeira</div>

                      <div>
                        <Button type="button" size="icon" variant="ghost" onClick={handleAddSplit}>
                          <LuPlus />
                        </Button>
                      </div>
                    </div>
                    <hr className="border-t border-gray-300" />

                    <div className="grid grid-cols-12 gap-4 px-6">
                      <div className="col-span-5">
                        <Label>Beneficiário</Label>
                      </div>
                      <div className="col-span-5">
                        <Label>Valor</Label>
                      </div>
                    </div>
                    {splits.map((item, index) => (
                      <div key={index} className="bg-gray-200 p-2 px-4 rounded-md grid grid-cols-12 gap-4">
                        <div className="col-span-5 flex items-center text-sm">
                          <Select
                            value={item.type || ""}
                            onValueChange={(value) => {
                              handleUpdateSplitType(index, value as SplitType);
                            }}
                          >
                            <SelectTrigger className="w-full" variant="simple">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>

                            <SelectContent>
                              {splitOptions?.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.id}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-4">
                          <NumericFormat
                            customInput={Input}
                            variant="simple"
                            value={item.amount}
                            decimalSeparator=","
                            thousandSeparator="."
                            onValueChange={({ floatValue }) => handleUpdateSplitAmount(index, floatValue || 0)}
                          />
                        </div>
                        <div className="col-span-3 flex justify-end">
                          <Button size={"icon"} variant={"ghost"} onClick={() => handleRemoveSplit(index)}>
                            <LuTrash />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="col-span-12 flex justify-end mt-8">
                  <Button disabled={isPending || totalSplitsAmount > values.amount} type="submit">
                    {isPending ? <>Carregando...</> : editData ? "Salvar mudanças" : "Salvar"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentModal;
