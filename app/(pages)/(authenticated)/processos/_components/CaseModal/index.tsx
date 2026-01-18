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
import { CaseStatus, ICase } from "@/app/_services/case";
import { useQuery } from "@tanstack/react-query";
import { apiLeggere } from "@/app/_services/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { IClient } from "@/app/_services/client";
import { IAttorney } from "@/app/_services/attorney";
import { DatePicker } from "@/app/_components/ui/DatePicker";

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
const CaseSchema = Yup.object().shape({
  clientId: Yup.string().required("Cliente é obrigatório"),
  attorneyId: Yup.string().required("Advogado é obrigatório"),
  title: Yup.string().min(3, "Mínimo 3 caracteres").required("Título é obrigatório"),
  processNumber: Yup.string().required("Número do processo é obrigatório"),
});

export default function CaseModal({ editData, handleClose }: CaseModalProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const initialValues = editData || {
    clientId: "",
    attorneyId: "",
    title: "",
    processNumber: "",
  };

  async function handleSubmit(values: any) {
    startTransition(async () => {
      const formData = new FormData();

      try {
        if (editData) {
          console.log("values", values);
          const body = {
            id: values.id,
            processNumber: values.processNumber,
            title: values.title,
            attorneyId: values.attorneyId,
            indicatorId: values.indicatorId,
            status: values.status,
            createdAt: values.createdAt,
            closedAt: values?.status == CaseStatus.CLOSED ? values?.closedAt || new Date().toISOString() : null,
            clientId: values.clientId,
            companyId: values.companyId,
          };

          Object.entries(body).forEach(([key, value]) => {
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
            processNumber: values.processNumber,
            clientId: values.clientId,
            attorneyId: values.attorneyId,
            title: values.title,
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

  const statusOptions = [
    {
      id: CaseStatus.PENDING,
    },
    {
      id: CaseStatus.OPEN,
    },
    {
      id: CaseStatus.CLOSED,
    },
  ];

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
                  value={values.attorneyId || ""}
                  onValueChange={(value) => {
                    setFieldValue("attorneyId", value);
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
                {errors.attorneyId && touched.attorneyId && (
                  <div className="text-red-500 text-sm">{errors.attorneyId}</div>
                )}
              </div>

              {/* TÍTULO */}
              <div className="col-span-12 md:col-span-4">
                <Label>Título do Caso</Label>
                <Field as={Input} name="title" placeholder="Processo penal" variant="filled" />
                {errors.title && touched.title && <div className="text-red-500 text-sm">{errors.title}</div>}
              </div>

              {/* INDICATOR ID */}
              {/* <div className="col-span-12 md:col-span-4">
                <Label>Indicador</Label>
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
                
              </div> */}

              {/* STATUS */}
              {editData ? (
                <div className="col-span-12 md:col-span-4">
                  <Label>Status</Label>
                  <Select
                    value={(values as ICase).status || ""}
                    onValueChange={(value) => {
                      setFieldValue("status", value);
                    }}
                  >
                    <SelectTrigger className="w-full" variant="filled">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {statusOptions?.map((opt, key) => (
                        <SelectItem key={key} value={opt.id}>
                          {opt.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : null}

              {/* Close Date */}
              {(values as ICase)?.status == CaseStatus.CLOSED ? (
                <div className="col-span-12 md:col-span-4">
                  <Label>Data de fechamento</Label>
                  <DatePicker
                    placeholder="Data de fechamento"
                    initialValue={new Date()}
                    onChange={(date) => setFieldValue("closedAt", date?.toISOString())}
                  />
                </div>
              ) : null}

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
