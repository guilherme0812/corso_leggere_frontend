"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
// import { useSession } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
// import { LoginDataType } from "@/app/_types";
import { IClient } from "@/app/_services/client";
import { useState, useTransition } from "react";
import { createClient, updateClient } from "@/app/actions/client";
import { useRouter } from "next/navigation";
import { getCountries } from "@/app/_services/country";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { getStates } from "@/app/_services/states";
import { getCities } from "@/app/_services/cities";
import { Switch } from "@/app/_components/ui/switch";
import { Textarea } from "@/app/_components/ui/textarea";
import { enqueueSnackbar } from "notistack";

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
  addressStreet: Yup.string().min(5, "Endereço muito curto").required("Endereço é obrigatório"),
});

function ClientModal({ editData, handleClose }: ClientModalType) {
  const [isPending, startTransition] = useTransition();
  // const { data } = useSession();
  const router = useRouter();
  // const user = data?.user as LoginDataType;

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
            enqueueSnackbar({
              message: "Alterado com sucesso",
              variant: "success",
            });
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
          officialId: values.officialId,
          officialIdIssuingBody: values.officialIdIssuingBody,
          officialIdissuingState: values.officialIdissuingState,
          nacionality: values.nacionality || "",
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          hasWhatsapp: values.hasWhatsapp,
          addressStreet: values.addressStreet,
          addressNumber: values.addressNumber || "",
          addressComplement: values.addressComplement || "",
          addressZipCode: values.addressZipCode || "",
          zone: values.zone || "",
          cityId: values.cityId,
          stateId: values.stateId,
          countryId: values.countryId,
          birthDate: "1990-05-15T00:00:00.000Z",
          notes: values.notes || "",
          profession: values.profession
        };
        console.log(payload);
        const formData = new FormData();
        Object.entries(payload).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        });

        try {
          const res = await createClient(formData);

          if (typeof res == "object") {
            enqueueSnackbar({
              message: "Criado com sucesso",
              variant: "success",
            });
            router.refresh();
            handleClose();
          } else {
            enqueueSnackbar({
              message: "Erro interno, tente novamente mais tarde",
              variant: "error",
            });
          }

          // aqui se quiser pode disparar um toast de sucesso
        } catch (err) {
          enqueueSnackbar({
            message: "Erro interno, tente novamente mais tarde",
            variant: "error",
          });
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
        officialId: "",
        officialIdIssuingBody: "SSP",
        officialIdissuingState: "SC",
        maritalStatus: "",
        profession: "",
        phone: "",
        email: "",
        cityId: "",
        stateId: "",
        countryId: "BR",
        hasWhatsapp: true,
        addressStreet: "",
        addressNumber: "",
        addressComplement: "",
        addressZipCode: "",
        zone: "",
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
      <DialogContent className="max-w-screen-xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Alterar" : "Adicionar"} cliente</DialogTitle>
          <DialogDescription>
            Preencha o formulario para {editData ? "Alterar" : "adicionar"} um novo cliente.
          </DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={ClientSchema} onSubmit={handleSubmit}>
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
                  <Label>CPF</Label>
                  <Field as={Input} name="document" placeholder="Digite o CPF" variant="filled" />
                  {errors.document && touched.document && <div className="text-red-500 text-sm">{errors.document}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>RG</Label>
                  <Field as={Input} name="officialId" placeholder="Digite o RG" variant="filled" />
                  {errors.officialId && touched.officialId && (
                    <div className="text-red-500 text-sm">{errors.document}</div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>órgão emissor</Label>
                  <Field as={Input} name="officialIdIssuingBody" placeholder="Digite o RG" variant="filled" />
                  {errors.officialIdIssuingBody && touched.officialIdIssuingBody && (
                    <div className="text-red-500 text-sm">{errors.officialIdIssuingBody}</div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Estado de emissão</Label>

                  <Select
                    value={values.officialIdissuingState || ""}
                    onValueChange={(value) => {
                      setFieldValue("officialIdissuingState", value);
                    }}
                  >
                    <SelectTrigger className="w-full" variant="filled">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {statesIsPending && <div>Carregando estados...</div>}
                      {states &&
                        states?.map((country) => (
                          <SelectItem key={country.sigla} value={country.sigla.toString()}>
                            {country.nome}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Profissão</Label>
                  <Field as={Input} name="profession" placeholder="Digite o RG" variant="filled" />
                  {errors.profession && touched.profession && (
                    <div className="text-red-500 text-sm">{errors.profession}</div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Email</Label>
                  <Field as={Input} name="email" placeholder="Digite o email" variant="filled" />
                  {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
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

                <div className="col-span-12 md:col-span-4">
                  <Label>Nacionalidade</Label>
                  <Field as={Input} name="nacionality" placeholder="Digite a nacionalidade" variant="filled" />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>País</Label>

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

                  {errors.countryId && touched.countryId && (
                    <div className="text-red-500 text-sm">{errors.countryId}</div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-4">
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
                          <SelectItem key={country.sigla} value={country.sigla.toString()}>
                            {country.nome}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  {errors.stateId && touched.stateId && <div className="text-red-500 text-sm">{errors.stateId}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
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
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>CEP</Label>
                  <Field as={Input} name="addressZipCode" placeholder="Digite o CEP" variant="filled" />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Endereço</Label>
                  <Field as={Input} name="addressStreet" placeholder="Digite o endereço" variant="filled" />
                  {errors.addressStreet && touched.addressStreet && (
                    <div className="text-red-500 text-sm">{errors.addressStreet}</div>
                  )}
                </div>

                <div className="col-span-12">
                  <Label>Observaçao do cliente</Label>

                  <Field
                    as={Textarea}
                    name="notes"
                    placeholder="Adicione uma observaçao"
                    variant="filled"
                    className="bg-gray-200"
                  />
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

export default ClientModal;
