"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
// import { getCountries } from "@/app/_services/country";
// import { useQuery } from "@tanstack/react-query";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { IAttorney } from "@/app/_services/attorney";
import { createAttorney, updateAttorney } from "@/app/actions/attorney";
import { enqueueSnackbar } from "notistack";

type ClientModalType = {
  handleClose(): void;
  editData: IAttorney | undefined;
};

const AttorneySchema = Yup.object().shape({
  firstName: Yup.string().min(2, "Mínimo 2 caracteres").required("Campo obrigatório"),
  lastName: Yup.string().min(2, "Mínimo 2 caracteres").required("Campo obrigatório"),
  licenceNumber: Yup.string().min(2, "Mínimo 2 caracteres").required("Campo obrigatório"),
  licenceJurisdiction: Yup.string().min(2, "Mínimo 2 caracteres").required("Campo obrigatório"),
  licenceCountryCode: Yup.string().min(2, "Mínimo 2 caracteres").required("Campo obrigatório"),
  nationality: Yup.string().min(2, "Mínimo 2 caracteres").required("Campo obrigatório"),
  maritalStatus: Yup.string().min(2, "Mínimo 2 caracteres").required("Campo obrigatório"),
  professionalAddress: Yup.string().min(2, "Mínimo 2 caracteres").required("Campo obrigatório"),
  phone: Yup.string()
    .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos numéricos")
    .required("Telefone é obrigatório"),
  email: Yup.string().email("Formato de email inválido").required("Email é obrigatório"),
});

function AttorneyModal({ editData, handleClose }: ClientModalType) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function handleSubmit(values: any) {
    startTransition(async () => {
      try {
        if (editData) {
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              formData.append(key, String(value));
            }
          });

          const res = await updateAttorney(formData);

          if (typeof res == "object") {
            enqueueSnackbar({
              message: "Advogado alterado com sucesso",
              variant: "success",
            });
            router.refresh();
            handleClose();
          }
        } else {
          const payload = {
            firstName: values.firstName,
            lastName: values.lastName,
            licenceNumber: values.licenceNumber,
            licenceJurisdiction: values.licenceJurisdiction,
            licenceCountryCode: values.licenceCountryCode,
            phone: values.phone,
            email: values.email,
            nationality: values.nationality,
            maritalStatus: values.maritalStatus,
            professionalAddress: values.professionalAddress,
          };

          const formData = new FormData();
          Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              formData.append(key, String(value));
            }
          });

          const res = await createAttorney(formData);
          if (typeof res == "object") {
            enqueueSnackbar({
              message: "Advogado criado com sucesso",
              variant: "success",
            });
            router.refresh();
            handleClose();
          } else {
            enqueueSnackbar({
              message: "Erro interno, tente mais tarde",
              variant: "error",
            });
          }
        }
      } catch (error: any) {
        enqueueSnackbar({
          message: "Erro interno, tente mais tarde",
          variant: "error",
        });
        console.log(error);
      }
    });
  }

  const initialValues = editData
    ? editData
    : {
        firstName: "",
        lastName: "",
        licenceNumber: "",
        licenceJurisdiction: "",
        licenceCountryCode: "BR",
        phone: "",
        email: "",
        nationality: "",
        maritalStatus: "",
        professionalAddress: "",
      };

  // const { isPending: countriesIsPending, data: countries } = useQuery({
  //   queryKey: ["countries"],
  //   queryFn: getCountries,
  // });

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Alterar" : "Adicionar"} advogado</DialogTitle>
          <DialogDescription>
            Preencha o formulario para {editData ? "Alterar o" : "adicionar um novo"} registro.
          </DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={AttorneySchema} onSubmit={handleSubmit}>
          {({ errors, touched }) => {
            console.log("errors", errors);

            return (
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
                  <Label>N° licença</Label>
                  <Field as={Input} name="licenceNumber" placeholder="Digite o n° da licença" variant="filled" />
                  {errors.licenceNumber && touched.licenceNumber && (
                    <div className="text-red-500 text-sm">{errors.licenceNumber}</div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Label>Jurisdição</Label>
                  <Field as={Input} name="licenceJurisdiction" placeholder="Digite o n° da licença" variant="filled" />
                  {errors.licenceJurisdiction && touched.licenceJurisdiction && (
                    <div className="text-red-500 text-sm">{errors.licenceJurisdiction}</div>
                  )}
                </div>

                {/* <div className="col-span-12 md:col-span-6">
                  <Label>licença pertence ao país</Label>

                  <Select
                    value={values.licenceCountryCode}
                    onValueChange={(value) => setFieldValue("licenceCountryCode", value)}
                  >
                    <SelectTrigger className="w-full" variant="filled">
                      <SelectValue placeholder="Selecione o país" />
                    </SelectTrigger>

                    <SelectContent>
                      {countriesIsPending && <div>Carregando países...</div>}
                      {countries &&
                        countries.map((country) => (
                          <SelectItem key={country.id} value={country.id}>
                            {country.nome}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  {errors.licenceCountryCode && touched.licenceCountryCode && (
                    <div className="text-red-500 text-sm">{errors.licenceCountryCode}</div>
                  )}
                </div> */}

                <div className="col-span-12 md:col-span-6">
                  <Label>Email</Label>
                  <Field as={Input} name="email" placeholder="Digite o email" variant="filled" />
                  {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <Label>Nacionalidade</Label>
                  <Field as={Input} name="nationality" placeholder="Digite a nacionalidade" variant="filled" />
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Label>Telefone</Label>
                  <Field as={Input} name="phone" placeholder="Digite o telefone" variant="filled" />
                  {errors.phone && touched.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Label>Endereço</Label>
                  <Field as={Input} name="professionalAddress" placeholder="Digite o endereço" variant="filled" />
                  {errors.professionalAddress && touched.professionalAddress && (
                    <div className="text-red-500 text-sm">{errors.professionalAddress}</div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6">
                  <Label>Estado civil</Label>
                  <Field as={Input} name="maritalStatus" placeholder="Digite" variant="filled" />
                  {errors.maritalStatus && touched.maritalStatus && (
                    <div className="text-red-500 text-sm">{errors.maritalStatus}</div>
                  )}
                </div>

                <div className="col-span-12 flex justify-end">
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

export default AttorneyModal;
