"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { useSession } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { LoginDataType } from "@/app/_types";
import { IClient } from "@/app/_services/client";
import { useTransition } from "react";
import { createClient, updateClient } from "@/app/actions/client";
import { useRouter } from "next/navigation";

type ClientModalType = {
  handleClose(): void;
  editData: IClient | undefined;
};

const ClientSchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Mínimo 2 caracteres").required("Nome é obrigatório"),
  lastName: Yup.string().min(2, "Mínimo 2 caracteres").required("Sobrenome é obrigatório"),
  document: Yup.string()
    .matches(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos")
    .required("CPF é obrigatório"),
  phone: Yup.string()
    .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos numéricos")
    .required("Telefone é obrigatório"),
  email: Yup.string().email("Formato de email inválido").required("Email é obrigatório"),
  address: Yup.string().min(5, "Endereço muito curto").required("Endereço é obrigatório"),
});

function ClientModal({ editData, handleClose }: ClientModalType) {
  const [isPending, startTransition] = useTransition();
  const { data } = useSession();
  const router = useRouter();
  const user = data?.user as LoginDataType;

  async function handleSubmit(values: any) {
    startTransition(async () => {
      if (editData) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        try {
          const res = await updateClient(formData);

          if (typeof res == "object") {
            router.refresh();
            handleClose();
          }
          console.log("res", res);
          // aqui se quiser pode disparar um toast de sucesso
        } catch (err) {
          console.error(err);
          // aqui vc pode mostrar toast de erro
        }
      } else {
        const payload = {
          document: values.document,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          hasWhatsapp: true,
          address: values.address,
          cityId: "cidade-abc",
          stateId: "estado-xyz",
          countryId: "pais-br",
          birthDate: "1990-05-15T00:00:00.000Z",
          notes: "Cliente regular",
          companyId: user?.companyId,
        };
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        try {
          const res = await createClient(formData);

          if (typeof res == "object") {
            router.refresh();
            handleClose();
          }
          console.log("res", res);
          // aqui se quiser pode disparar um toast de sucesso
        } catch (err) {
          console.error(err);
          // aqui vc pode mostrar toast de erro
        }
      }
    });
  }

  const initialValues = editData
    ? editData
    : {
        firstName: "",
        lastName: "",
        document: "",
        phone: "",
        email: "",
        address: "",
      };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{editData ? "Alterar" : "Adicionar"} cliente</DialogTitle>
          <DialogDescription>
            Preencha o formulario para {editData ? "Alterar" : "adicionar"} um novo cliente.
          </DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={ClientSchema} onSubmit={handleSubmit}>
          {({ errors, touched }) => (
            <Form className="grid grid-cols-12 gap-4">
              <div className="col-span-12 md:col-span-6">
                <Label>Nome</Label>
                <Field as={Input} name="firstName" placeholder="Digite o primeiro nome do cliente" variant="filled" />
                {errors.firstName && touched.firstName && (
                  <div className="text-red-500 text-sm">{errors.firstName}</div>
                )}
              </div>

              <div className="col-span-12 md:col-span-6">
                <Label>Sobrenome</Label>
                <Field as={Input} name="lastName" placeholder="Digite o sobrenome" variant="filled" />
                {errors.lastName && touched.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
              </div>

              <div className="col-span-12 md:col-span-6">
                <Label>CPF</Label>
                <Field as={Input} name="document" placeholder="Digite o CPF" variant="filled" />
                {errors.document && touched.document && <div className="text-red-500 text-sm">{errors.document}</div>}
              </div>

              <div className="col-span-12 md:col-span-6">
                <Label>Telefone</Label>
                <Field as={Input} name="phone" placeholder="Digite o telefone" variant="filled" />
                {errors.phone && touched.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
              </div>

              <div className="col-span-12 md:col-span-6">
                <Label>Email</Label>
                <Field as={Input} name="email" placeholder="Digite o email" variant="filled" />
                {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              </div>

              <div className="col-span-12 md:col-span-6">
                <Label>Endereço</Label>
                <Field as={Input} name="address" placeholder="Digite o endereço" variant="filled" />
                {errors.address && touched.address && <div className="text-red-500 text-sm">{errors.address}</div>}
              </div>

              <div className="col-span-12 flex justify-end">
                <Button disabled={isPending} type="submit">
                  {isPending ? <>Carregando...</> : editData ? "Salvar mudanças" : "Salvar"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}

export default ClientModal;
