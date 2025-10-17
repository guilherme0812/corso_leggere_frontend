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
import { useState, useTransition } from "react";
import { createClient, updateClient } from "@/app/actions/client";
import { useRouter } from "next/navigation";
import { getCountries } from "@/app/_services/country";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { getStates } from "@/app/_services/states";
import { getCities } from "@/app/_services/cities";

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

  const [state, setState] = useState<string>(editData?.stateId || "");

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
          cityId: values.cityId,
          stateId: values.stateId,
          countryId: values.countryId,
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
        cityId: "",
        stateId: "",
        countryId: "BR",
      };

  const { isPending: countriesIsPending, data: countries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });
  const { isPending: statesIsPending, data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });
  const { isPending: citiesIsPending, data: cities } = useQuery({
    queryKey: ["cities", state.toString()],
    queryFn: () => getCities(state),
    enabled: !!state,
  });

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
          {({ errors, touched, values, setFieldValue }) => (
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

              <div className="col-span-12 md:col-span-6">
                <Label>País de origem</Label>

                <Select value={values.countryId} onValueChange={(value) => setFieldValue("countryId", value)}>
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

                {errors.address && touched.address && <div className="text-red-500 text-sm">{errors.address}</div>}
              </div>

              <div className="col-span-12 md:col-span-6">
                <Label>Estado</Label>

                <Select
                  value={values.stateId}
                  onValueChange={(value) => {
                    setFieldValue("stateId", value);
                    setState(value);
                  }}
                >
                  <SelectTrigger className="w-full" variant="filled">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>

                  <SelectContent>
                    {statesIsPending && <div>Carregando estados...</div>}
                    {states &&
                      states?.map((country) => (
                        <SelectItem key={country.id} value={country.id.toString()}>
                          {country.nome}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                {errors.address && touched.address && <div className="text-red-500 text-sm">{errors.address}</div>}
              </div>

              <div className="col-span-12 md:col-span-6">
                <Label>Cidade</Label>

                <Select
                  value={values.cityId}
                  onValueChange={(value) => {
                    setFieldValue("cityId", value);
                  }}
                >
                  <SelectTrigger className="w-full" variant="filled">
                    <SelectValue placeholder="Selecione a cidade" />
                  </SelectTrigger>

                  <SelectContent>
                    {citiesIsPending && <div>Selecione a cidade...</div>}
                    {cities &&
                      cities?.map((country) => (
                        <SelectItem key={country.id} value={country.id.toString()}>
                          {country.nome}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

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
