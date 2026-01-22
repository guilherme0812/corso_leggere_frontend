"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { useBeneficiaries } from "@/app/_hooks/beneficiary";
import { enqueueSnackbar } from "notistack";
import { typeTranslate } from "../../../beneficiaries/_components/TransactionTable";
import { useCreateTransaction } from "@/app/_hooks/finances";
import { CreateTransactionDTO } from "@/app/_services/finanances";
import { NumericFormat } from "react-number-format";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import { paymentMethods } from "@/app/_utils/payments";

interface CreateTransactionModalProps {
  handleClose(): void;
  type: "INCOME" | "EXPENSE";
}

const schema = Yup.object().shape({
  type: Yup.string().required("Tipo é obrigatório"),
  amount: Yup.number().min(1).required("Nome é obrigatório"),
  description: Yup.string().required("Campo é obrigatório"),
  dueDate: Yup.string().required("Campo é obrigatório"),
  beneficiaryId: Yup.string(),
});

export default function CreateTransactionModal({ handleClose, type }: CreateTransactionModalProps) {
  const { data: beneficiaries, isFetching: beneficiariesIsLoading } = useBeneficiaries({
    filters: {},
  });

  const { mutateAsync: createTransaction, isPending } = useCreateTransaction();

  const initialValues = {
    type: type,
    amount: 0,
    method: "",
    description: "",
    dueDate: "",
    categoryId: null,
    beneficiaryId: "",
  };

  async function handleSubmit(values: CreateTransactionDTO) {
    try {
      await createTransaction({
        amount: values.amount,
        beneficiaryId: values.beneficiaryId,
        categoryId: null,
        description: values.description,
        dueDate: values.dueDate,
        method: values.method,
        type: values.type,
      });

      enqueueSnackbar({
        variant: "success",
        message: "Alterado com sucesso",
      });

      handleClose();
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar({
        variant: "error",
        message: "erro interno, tente novamente mais tarde",
      });
    }
  }

  const typeOptions = [
    {
      value: "INCOME",
      label: "Conta a receber",
    },
    {
      value: "EXPENSE",
      label: "Conta a pagar",
    },
  ];

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-md max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar conta a {type == "EXPENSE" ? "pagar" : "receber"}</DialogTitle>
          <DialogDescription>preencha todos os campos a seguir e confirma para criar</DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
          {({ errors, touched, setFieldValue, values, isSubmitting }) => {
            return (
              <Form className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <Label>Valor a ser cobrado</Label>
                  <NumericFormat
                    customInput={Input}
                    name="amount"
                    placeholder="Digite o valor a ser pago"
                    variant="filled"
                    decimalSeparator=","
                    thousandSeparator="."
                    onValueChange={({ floatValue }) => setFieldValue("amount", floatValue || 0)}
                    value={values.amount}
                    className="py-6"
                  />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Tipo</Label>
                  <Select value={values.type} onValueChange={(value) => setFieldValue("type", value)}>
                    <SelectTrigger variant="filled" className="py-6">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && touched.type && <div className="text-red-500 text-sm">{errors.type}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Método de Pagamento</Label>

                  <Select
                    value={values.method || ""}
                    onValueChange={(value) => {
                      setFieldValue("method", value);
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

                  {errors.method && touched.method && <div className="text-red-500 text-sm">{errors.method}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Data de pagamento</Label>
                  <DatePicker
                    buttonClassName="py-6"
                    initialValue={new Date()}
                    placeholder="Data de vencimento"
                    onChange={(date) => date && setFieldValue("dueDate", date.toISOString().split("T")[0])}
                  />
                </div>

                <div className="col-span-12 md:col-span-12">
                  <Label>Beneficiarios</Label>

                  <Select
                    value={values.beneficiaryId || ""}
                    onValueChange={(value) => setFieldValue("beneficiaryId", value)}
                  >
                    <SelectTrigger variant="filled" className="py-6">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {beneficiariesIsLoading ? "Carregando..." : null}
                      {beneficiaries?.map((record) => (
                        <SelectItem key={record.id} value={record.id}>
                          {typeTranslate[record.type]} - {record.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.beneficiaryId && touched.beneficiaryId && (
                    <div className="text-red-500 text-sm">{errors.beneficiaryId}</div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-12">
                  <Label>Descrição do pagamento</Label>
                  <Field
                    as={Input}
                    name="description"
                    placeholder="Nome do beneficiário"
                    variant="filled"
                    className="py-6"
                  />
                  {errors.description && touched.description && (
                    <div className="text-red-500 text-sm">{errors.description}</div>
                  )}
                </div>

                {/* SUBMIT */}
                <div className="col-span-12 flex justify-end">
                  <Button type="submit" disabled={isPending && isSubmitting ? true : false}>
                    {!isPending ? "Cadastrar transação" : "Cadastrando..."}
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
