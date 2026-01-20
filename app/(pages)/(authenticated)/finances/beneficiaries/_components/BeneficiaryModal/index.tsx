"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { BeneficiaryDataType, BeneficiaryTypeEnum } from "@/app/_services/beneficiary";
import { useCreateBeneficiary, useUpdateBeneficiary } from "@/app/_hooks/beneficiary";
import { enqueueSnackbar } from "notistack";
import { useAttornies } from "@/app/_hooks/attorney";

interface BeneficiaryModalProps {
  handleClose(): void;
  editData?: BeneficiaryDataType;
}

const BeneficiarySchema = Yup.object().shape({
  type: Yup.string().required("Tipo é obrigatório"),
  name: Yup.string().min(3).required("Nome é obrigatório"),
  document: Yup.string().required("Documento é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: Yup.string().required("Telefone é obrigatório"),
  attorneyId: Yup.string().nullable(), // NÃO obrigatório
});

const beneficiaryTypeOptions = [
  { value: BeneficiaryTypeEnum.ATTORNEY, label: "Advogado" },
  { value: BeneficiaryTypeEnum.REFERRAL, label: "Indicação" },
  { value: BeneficiaryTypeEnum.PARTNER, label: "Parceiro" },
  { value: BeneficiaryTypeEnum.OFFICE, label: "Escritório" },
  { value: BeneficiaryTypeEnum.SUPPLIER, label: "Fornecedor" },
  { value: BeneficiaryTypeEnum.OTHER, label: "Outro" },
];

export default function BeneficiaryModal({ editData, handleClose }: BeneficiaryModalProps) {
  const { mutateAsync: createBeneficiary, isPending: createIdPending } = useCreateBeneficiary();
  const { mutateAsync: updateBeneficiary, isPending: updateIsPending } = useUpdateBeneficiary();
  const { data: attornies } = useAttornies({
    filters: {},
  });

  const initialValues: Partial<BeneficiaryDataType> = editData || {
    type: BeneficiaryTypeEnum.OTHER,
    name: "",
    document: "",
    email: "",
    phone: "",
    bankName: "",
    bankCode: "",
    accountNumber: "",
    accountType: "",
    pixKey: "",
    attorneyId: "",
    notes: "",
    isActive: true,
  };

  async function handleSubmit(values: Partial<BeneficiaryDataType>) {
    try {
      if (editData) {
        await updateBeneficiary(values as any);

        enqueueSnackbar({
          variant: "success",
          message: "Alterado com sucesso",
        });
      } else {
        await createBeneficiary({
          type: values.type || ("OTHER" as any),
          name: values.name || "",
          document: values.document || "",
          email: values.email || "teste@gmail.com",
          phone: values.phone || "",
          bankName: values.bankName || null,
          bankCode: values.bankCode || null,
          accountNumber: values.accountNumber || null,
          accountType: values.accountType || null,
          pixKey: values.pixKey || null,
          attorneyId: values.attorneyId || (null as any),
          notes: values.notes || null,
        });
        enqueueSnackbar({
          variant: "success",
          message: "Criado com sucesso",
        });
      }

      handleClose();
    } catch (error: any) {
      console.log(error);
      enqueueSnackbar({
        variant: "error",
        message: "erro interno, tente novamente mais tarde",
      });
    }
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-md max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Editar" : "Adicionar"} beneficiário</DialogTitle>
          <DialogDescription>Preencha os dados do beneficiário.</DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={BeneficiarySchema} onSubmit={handleSubmit}>
          {({ errors, touched, setFieldValue, values, isSubmitting }) => (
            <Form className="grid grid-cols-12 gap-4">
              {/* TIPO */}
              <div className="col-span-12 md:col-span-4">
                <Label>Tipo</Label>
                <Select value={values.type} onValueChange={(value) => setFieldValue("type", value)}>
                  <SelectTrigger variant="filled">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {beneficiaryTypeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.type && touched.type && <div className="text-red-500 text-sm">{errors.type}</div>}
              </div>

              {/* NOME */}
              <div className="col-span-12 md:col-span-8">
                <Label>Nome</Label>
                <Field as={Input} name="name" placeholder="Nome do beneficiário" variant="filled" />
                {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
              </div>

              {/* DOCUMENTO */}
              <div className="col-span-12 md:col-span-4">
                <Label>Documento</Label>
                <Field as={Input} name="document" placeholder="CPF / CNPJ" variant="filled" />
              </div>

              {/* EMAIL */}
              <div className="col-span-12 md:col-span-4">
                <Label>Email</Label>
                <Field as={Input} name="email" placeholder="email@exemplo.com" variant="filled" />
              </div>

              {/* TELEFONE */}
              <div className="col-span-12 md:col-span-4">
                <Label>Telefone</Label>
                <Field as={Input} name="phone" placeholder="(11) 99999-9999" variant="filled" />
              </div>

              {/* ADVOGADO (opcional) */}
              <div className="col-span-12 md:col-span-6">
                <Label>Advogado (opcional)</Label>
                <Select value={values.attorneyId || ""} onValueChange={(value) => setFieldValue("attorneyId", value)}>
                  <SelectTrigger variant="filled">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {attornies?.map((att) => (
                      <SelectItem key={att.id} value={att.id}>
                        Dr(a). {att.firstName} {att.lastName} - {att.licenceJurisdiction} {att.licenceNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PIX */}
              <div className="col-span-12 md:col-span-6">
                <Label>Chave PIX</Label>
                <Field as={Input} name="pixKey" placeholder="CPF / Email / Telefone" variant="filled" />
              </div>

              {/* OBSERVAÇÕES */}
              <div className="col-span-12">
                <Label>Observações</Label>
                <Field as={Input} name="notes" placeholder="Observações adicionais" variant="filled" />
              </div>

              {/* SUBMIT */}
              <div className="col-span-12 flex justify-end">
                <Button type="submit" disabled={createIdPending || updateIsPending || isSubmitting ? true : false}>
                  {editData ? "Salvar alterações" : "Cadastrar beneficiário"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
