// CaseModal.tsx
"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createCase, updateCase } from "@/app/actions/case";
import { ICase } from "@/app/_services/case";
import { useQuery } from "@tanstack/react-query";
import { apiLeggere } from "@/app/_services/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { IClient } from "@/app/_services/client";
import { IAttorney } from "@/app/_services/attorney";

interface CaseModalProps {
  handleClose(): void;
  editData?: ICase;
}

export const getClients = async () => {
  try {
    const res = await apiLeggere<IClient[]>({
      url: `/clients`,
      method: "GET",
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const getAttorneys = async () => {
  try {
    const res = await apiLeggere<IAttorney[]>({
      url: `/attorney`,
      method: "GET",
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

// Schema atualizado
const CaseSchema = Yup.object()
  .shape({
    clientId: Yup.string().required("Cliente é obrigatório"),
    lawyerId: Yup.string().required("Advogado é obrigatório"),
    title: Yup.string().min(3, "Mínimo 3 caracteres").required("Título é obrigatório"),

    businessFee: Yup.number()
      .typeError("Valor inválido")
      .min(0, "Mínimo 0")
      .max(100, "Máximo 100")
      .required("Obrigatório"),

    lawyerFee: Yup.number()
      .typeError("Valor inválido")
      .min(0, "Mínimo 0")
      .max(100, "Máximo 100")
      .required("Obrigatório"),

    indicatorFee: Yup.number()
      .typeError("Valor inválido")
      .min(0, "Mínimo 0")
      .max(100, "Máximo 100")
      .optional(),
    // indicatorFee: Yup.number()
    //   .typeError("Valor inválido")
    //   .min(0, "Mínimo 0")
    //   .max(100, "Máximo 100")
    //   .required("Obrigatório"),

    // indicatorId: Yup.number().typeError("ID inválido").required("ID obrigatório"),

    processNumber: Yup.string().required("Número do processo é obrigatório"),
  })
  .test("fees-sum-100", "A soma de businessFee, lawyerFee e indicatorFee deve ser exatamente 100", (values) => {
    if (!values) return false;
    const total = (values.businessFee || 0) + (values.lawyerFee || 0) + (values?.indicatorFee || 0);
    return total === 100;
  });

export default function CaseModal({ editData, handleClose }: CaseModalProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const initialValues = editData || {
    clientId: "",
    lawyerId: "",
    title: "",
    businessFee: 0,
    lawyerFee: 0,
    indicatorFee: 0,
    indicatorId: 0,
    processNumber: "",
  };

  async function handleSubmit(values: any) {
    startTransition(async () => {
      const formData = new FormData();

      try {
        if (editData) {
          Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              formData.append(key, value as any);
            }
          });
          const res = await updateCase(formData);
          if (typeof res === "object") {
            router.refresh();
            handleClose();
          }
        } else {
          const body = {
            clientId: values.clientId,
            lawyerId: values.lawyerId,
            title: values.title,
            businessFee: Number(values.businessFee),
            lawyerFee: Number(values.lawyerFee),
            indicatorFee: values.indicatorFee ? Number(values.indicatorFee) : null,
            processNumber: values.processNumber,
          };
          Object.entries(body).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              formData.append(key, value);
            }
          });

          const res = await createCase(formData);
          console.log("create res: ", res);
          if (typeof res === "object") {
            router.refresh();
            handleClose();
          }
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  const { isPending: clientsIsPending, data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
  });

  const { isPending: attorneysIsPending, data: attorneys } = useQuery({
    queryKey: ["attorney"],
    queryFn: () => getAttorneys(),
  });

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-lg max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Alterar" : "Adicionar"} processo</DialogTitle>
          <DialogDescription>Preencha o formulário para continuar.</DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={CaseSchema} onSubmit={handleSubmit}>
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="grid grid-cols-12 gap-4">
              {/* NÚMERO DO PROCESSO */}
              <div className="col-span-12 md:col-span-12">
                <Label>Número do Processo</Label>
                <Field as={Input} name="processNumber" placeholder="123-fj-453297655" variant="filled" />
                {errors.processNumber && touched.processNumber && (
                  <div className="text-red-500 text-sm">{errors.processNumber}</div>
                )}
              </div>

              {/* CLIENTE */}
              <div className="col-span-12 md:col-span-4">
                <Label>Cliente</Label>
                <Select
                  value={values.clientId || ""}
                  onValueChange={(value) => {
                    setFieldValue("clientId", value);
                  }}
                >
                  <SelectTrigger className="w-full" variant="filled">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    {clientsIsPending && <div>Carregando clientes...</div>}
                    {clients &&
                      clients?.map((opt, key) => (
                        <SelectItem key={key} value={opt.document}>
                          {opt.firstName} {opt.lastName} - {opt.document}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.clientId && touched.clientId && <div className="text-red-500 text-sm">{errors.clientId}</div>}
              </div>

              {/* ADVOGADO */}
              <div className="col-span-12 md:col-span-4">
                <Label>Advogado</Label>
                <Select
                  value={values.lawyerId || ""}
                  onValueChange={(value) => {
                    setFieldValue("lawyerId", value);
                  }}
                >
                  <SelectTrigger className="w-full" variant="filled">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    {attorneysIsPending && <div>Carregando advogados...</div>}
                    {attorneys &&
                      attorneys?.map((opt, key) => (
                        <SelectItem key={key} value={opt.id}>
                          {opt.firstName} {opt.lastName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.lawyerId && touched.lawyerId && <div className="text-red-500 text-sm">{errors.lawyerId}</div>}
              </div>

              {/* TÍTULO */}
              <div className="col-span-12 md:col-span-4">
                <Label>Título do Caso</Label>
                <Field as={Input} name="title" placeholder="Processo penal" variant="filled" />
                {errors.title && touched.title && <div className="text-red-500 text-sm">{errors.title}</div>}
              </div>

              {/* FEES */}
              <div className="col-span-12 md:col-span-4">
                <Label>Honorário Empresarial (%)</Label>
                <Field as={Input} type="number" name="businessFee" variant="filled" />
                {errors.businessFee && touched.businessFee && (
                  <div className="text-red-500 text-sm">{errors.businessFee}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-4">
                <Label>Honorário Advogado (%)</Label>
                <Field as={Input} type="number" name="lawyerFee" variant="filled" />
                {errors.lawyerFee && touched.lawyerFee && (
                  <div className="text-red-500 text-sm">{errors.lawyerFee}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-4">
                <Label>Honorário Indicador (%)</Label>
                <Field as={Input} type="number" name="indicatorFee" variant="filled" />
                {errors.indicatorFee && touched.indicatorFee && (
                  <div className="text-red-500 text-sm">{errors.indicatorFee}</div>
                )}
              </div>

              {/* INDICATOR ID */}
              <div className="col-span-12 md:col-span-4">
                <Label>ID do Indicador</Label>
                <Select
                  value={values.indicatorId?.toString() || ""}
                  onValueChange={(value) => {
                    setFieldValue("indicatorId", value);
                  }}
                >
                  <SelectTrigger className="w-full" variant="filled">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>

                  <SelectContent>
                    {clientsIsPending && <div>Carregando...</div>}
                    {clients &&
                      clients?.map((opt, key) => (
                        <SelectItem key={key} value={opt.document}>
                          {opt.firstName} {opt.lastName} - {opt.document}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {errors.indicatorId && touched.indicatorId && (
                  <div className="text-red-500 text-sm">{errors.indicatorId}</div>
                )}
              </div>

              {/* SUBMIT */}
              <div className="col-span-12 flex justify-end">
                <Button disabled={isPending} type="submit">
                  {isPending ? "Carregando..." : editData ? "Salvar alterações" : "Salvar"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
