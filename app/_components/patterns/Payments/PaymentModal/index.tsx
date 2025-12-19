"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { PaymentBodyType, PaymentDataType, PaymentStatus } from "@/app/_services/finanances";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import { UseCases } from "@/app/_hooks/cases";
import { NumericFormat } from "react-number-format";
import { useCreatePayment } from "@/app/_hooks/finances";
import { enqueueSnackbar } from "notistack";

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

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-lg max-h-[95vh] overflow-y-auto">
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

                <div className="col-span-12 flex justify-end mt-8">
                  <Button disabled={isPending} type="submit">
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
