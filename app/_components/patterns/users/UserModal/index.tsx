"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Switch } from "@/app/_components/ui/switch";
import { UserRole } from "@/app/_types";
import { UserDataType, UserStatusEnum } from "@/app/_types/login";
import { useSession } from "next-auth/react";
import { ICompany } from "@/app/_services/companies";
import { createUser, updateUser } from "@/app/actions/user";
import { enqueueSnackbar } from "notistack";

type UserModalType = {
  handleClose(): void;
  editData: UserDataType | undefined;
  companies: ICompany[];
  isAdmin?: boolean;
};

const schema = Yup.object().shape({
  firstName: Yup.string().min(2, "Mínimo 2 caracteres").required("Nome é obrigatório"),
  lastName: Yup.string().min(2, "Mínimo 2 caracteres").required("Sobrenome é obrigatório"),

  phone: Yup.string()
    .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos numéricos")
    .required("Telefone é obrigatório"),
  email: Yup.string().email("Formato de email inválido").required("Email é obrigatório"),
});

function UserModal({ editData, handleClose, companies, isAdmin }: UserModalType) {
  const [isPending, startTransition] = useTransition();
  const { data } = useSession();

  const router = useRouter();

  async function handleSubmit(values: any) {
    startTransition(async () => {
      if (editData) {
        const body = {
          ...values,
          preffix: isAdmin ? "/admin" : "",
        };
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        try {
          const res = await updateUser(formData);

          if (typeof res == "object") {
            enqueueSnackbar({
              message: "usuário atualizado com sucesso",
              variant: "success",
            });
            router.refresh();
            handleClose();
          }
          console.log("res", res);
          // aqui se quiser pode disparar um toast de sucesso
        } catch (err) {
          enqueueSnackbar({ message: "Erro interno, tente novamente mais tarde", variant: "error" });
          console.error(err);
          // aqui vc pode mostrar toast de erro
        }
      } else {
        const payload = {
          preffix: isAdmin ? "/admin" : "",
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          companyId: values.companyId,
          role: values.role,
          phone: values.phone,
          hasWhatsapp: values.hasWhatsapp,
          profilePicture: values.profilePicture,
          isActive: values.isActive,
        };

        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        try {
          const res = await createUser(formData);

          if (typeof res == "object") {
            enqueueSnackbar({
              message: "usuário criado com sucesso",
              variant: "success",
            });

            router.refresh();
            handleClose();
          }

          console.log(res);
          // aqui se quiser pode disparar um toast de sucesso
        } catch (err) {
          console.error("err:", err);
          // aqui vc pode mostrar toast de erro
        }
      }
    });
  }

  const initialValues = editData
    ? editData
    : {
        companyId: (data?.user as any)?.companyId || "",
        email: "",
        password: "123456",
        firstName: "",
        lastName: "",
        role: UserRole.employee,
        phone: "",
        hasWhatsapp: false,
        profilePicture: null,
        status: UserStatusEnum.ACTIVE,
      };

  const list = [
    {
      label: UserRole.admin,
    },
    {
      label: UserRole.employee,
    },
    {
      label: UserRole.owner,
    },
  ];
  const statusOptions = [
    {
      id: UserStatusEnum.ACTIVE,
      label: "Ativo",
    },
    {
      id: UserStatusEnum.DELETED,
      label: "Deletado",
    },
    {
      id: UserStatusEnum.INACTIVE,
      label: "Inativo",
    },
    {
      id: UserStatusEnum.PENDING,
      label: "Pendente",
    },
    {
      id: UserStatusEnum.SUSPENDED,
      label: "Suspenso",
    },
  ];

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Alterar" : "Adicionar"} usuário</DialogTitle>
          <DialogDescription>
            Preencha o formulario para {editData ? "Alterar" : "adicionar"} um usuário.
          </DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
          {({ errors, touched, values, setFieldValue }) => {
            return (
              <Form className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <Label>Nome</Label>
                  <Field as={Input} name="firstName" placeholder="Digite o primeiro nome do cliente" variant="filled" />
                  {errors.firstName && touched.firstName && (
                    <div className="text-red-500 text-sm">{errors.firstName}</div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Sobrenome</Label>
                  <Field as={Input} name="lastName" placeholder="Digite o sobrenome" variant="filled" />
                  {errors.lastName && touched.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Email</Label>
                  <Field as={Input} name="email" type="email" placeholder="Digite o email" variant="filled" />
                  {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>

                {!editData && (
                  <div className="col-span-12 md:col-span-4">
                    <Label>Senha</Label>
                    <Field as={Input} name="password" type="password" placeholder="Digite a senha" variant="filled" />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm">{errors.password}</div>
                    )}
                  </div>
                )}

                <div className="col-span-12 md:col-span-4">
                  <Label>Permissao</Label>

                  <Select
                    value={values.role || ""}
                    onValueChange={(value) => {
                      setFieldValue("role", value);
                    }}
                  >
                    <SelectTrigger className="w-full" variant="filled">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {list?.map((item) => (
                        <SelectItem key={item.label} value={item.label.toString()}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {(data?.user as any)?.role == UserRole.admin ? (
                  <div className="col-span-12 md:col-span-4">
                    <Label>Empresa</Label>

                    <Select
                      value={values.companyId || ""}
                      onValueChange={(value) => {
                        setFieldValue("companyId", value);
                      }}
                    >
                      <SelectTrigger className="w-full" variant="filled">
                        <SelectValue placeholder="Selecione a empresa" />
                      </SelectTrigger>

                      <SelectContent>
                        {companies?.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ) : null}

                <div className="col-span-12 md:col-span-4">
                  <Label>Status</Label>

                  <Select
                    value={values.status || ""}
                    onValueChange={(value) => {
                      setFieldValue("status", value);
                    }}
                  >
                    <SelectTrigger className="w-full" variant="filled">
                      <SelectValue placeholder="Selecione a empresa" />
                    </SelectTrigger>

                    <SelectContent>
                      {statusOptions?.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-12 md:col-span-3">
                  <Label>Telefone</Label>
                  <Field as={Input} name="phone" placeholder="Digite o telefone" variant="filled" />
                  {errors.phone && touched.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                </div>

                <div className="col-span-12 md:col-span-1 flex flex-col justify-between pt-2">
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

export default UserModal;
