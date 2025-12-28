"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { useTransition } from "react";
import { Switch } from "@/app/_components/ui/switch";
import { UserDataType } from "@/app/_types/login";
import { useSession } from "next-auth/react";
import { useUpdateUserDetails } from "@/app/_hooks/user";
import { UpdateUserDTO } from "@/app/_services/users";
import { enqueueSnackbar } from "notistack";

type UserModalType = {
  handleClose(): void;
  editData: UserDataType;
};

const schema = Yup.object().shape({
  firstName: Yup.string().min(2, "Mínimo 2 caracteres").required("Nome é obrigatório"),
  lastName: Yup.string().min(2, "Mínimo 2 caracteres").required("Sobrenome é obrigatório"),
  phone: Yup.string()
    .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos numéricos")
    .required("Telefone é obrigatório"),
  email: Yup.string().email("Formato de email inválido").required("Email é obrigatório"),
});

function SimpleUserDetailModal({ editData, handleClose }: UserModalType) {
  const [isPending, startTransition] = useTransition();
  const { data: session, update } = useSession();
  const { mutateAsync: updateUserDetail } = useUpdateUserDetails();

  async function handleSubmit(values: UserDataType) {
    startTransition(async () => {
      const body: UpdateUserDTO = {
        companyId: editData.companyId as string,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        hasWhatsapp: values.hasWhatsapp,
        id: values.id,
        phone: values.phone as string,
        profilePicture: values.profilePicture,
        role: values.role,
        status: values.status,
      };

      try {
        const res = await updateUserDetail(body);

        if (typeof res == "object") {
          await update({
            user: {
              ...session?.user,
              firstName: body.firstName,
              lastName: body.lastName,
              email: body.email,
              phone: body.phone,
              hasWhatsapp: body.hasWhatsapp,
            },
          });
          enqueueSnackbar({
            message: "Seu usuario foi atualizado com sucesso!",
            variant: "success",
          });

          handleClose()
        }
        // aqui se quiser pode disparar um toast de sucesso
      } catch (err) {
        console.error(err);
        enqueueSnackbar({
          message: "Seu usuario foi atualizado com sucesso!",
          variant: "error",
        });
      }
    });
  }

  const initialValues = editData;

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-md max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Seu perfil</DialogTitle>
          <DialogDescription>Preencha o formulario para alterar as informações do seu usuário.</DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form className="grid grid-cols-12 gap-4">
                <div className="col-span-4 flex items-center">
                  <Label>Primeiro nome</Label>
                </div>
                <div className="col-span-8">
                  <Field as={Input} name="firstName" placeholder="Digite o primeiro nome do cliente" variant="filled" />
                  {errors.firstName && touched.firstName && (
                    <div className="text-red-500 text-sm">{errors.firstName}</div>
                  )}
                </div>

                <div className="col-span-4 flex items-center">
                  <Label>Ultimo nome</Label>
                </div>
                <div className="col-span-8">
                  <Field as={Input} name="lastName" placeholder="Digite o seu ultimo nome" variant="filled" />
                  {errors.lastName && touched.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
                </div>

                <div className="col-span-4 flex items-center">
                  <Label>Email</Label>
                </div>
                <div className="col-span-8">
                  <Field as={Input} name="email" type="email" placeholder="Digite o seu email" variant="filled" />
                  {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>

                <div className="col-span-4 flex items-center">
                  <Label>Telefone</Label>
                </div>

                <div className="col-span-5">
                  <Field
                    as={Input}
                    name="phone"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9]*"
                    placeholder="Digite o seu telefone"
                    variant="filled"
                  />
                  {errors.phone && touched.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                </div>

                <div className="col-span-12 md:col-span-3 flex flex-col justify-between pt-2">
                  <Label>Whatsapp?</Label>

                  <div>
                    <Switch checked={values.hasWhatsapp} onCheckedChange={(v) => setFieldValue("hasWhatsapp", v)} />
                  </div>

                  {errors.hasWhatsapp && touched.hasWhatsapp && (
                    <div className="text-red-500 text-sm">{errors.hasWhatsapp}</div>
                  )}
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

export default SimpleUserDetailModal;
