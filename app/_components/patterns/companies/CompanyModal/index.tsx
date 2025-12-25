"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { useState, useTransition } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Switch } from "@/app/_components/ui/switch";
import { CompanyBody, ICompany } from "@/app/_services/companies";
import { getCountries } from "@/app/_services/country";
import { getStates } from "@/app/_services/states";
import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/app/_services/cities";
import { useCreateCompany, useUpdateCompany } from "@/app/_hooks/companies";
import { enqueueSnackbar } from "notistack";

type CompanyModalType = {
  handleClose(): void;
  editData: ICompany | undefined;
  companies: ICompany[];
};

const schema = Yup.object().shape({
  name: Yup.string().min(2, "Mínimo 2 caracteres").required("Nome é obrigatório"),
  cnpj: Yup.string().required("Campo é obrigatório"),
  phone1: Yup.string()
    .matches(/^\d{10,11}$/, "Telefone deve ter 10 ou 11 dígitos numéricos")
    .required("Telefone é obrigatório"),
  email: Yup.string().email("Formato de email inválido").required("Email é obrigatório"),
  countryId: Yup.string().required("Campo é obrigatório"),
  stateId: Yup.string().required("Campo é obrigatório"),
  cityId: Yup.string().required("Campo é obrigatório"),
  address: Yup.string().required("Campo é obrigatório"),
  registrationNumber: Yup.string(),
  taxRegime: Yup.string().required("Campo é obrigatório"),
  headquarters: Yup.boolean().required("Campo é obrigatório"),
  isActive: Yup.boolean().required("Campo é obrigatório"),
});

function CompanyModal({ editData, handleClose }: CompanyModalType) {
  const [state, setState] = useState<string>(editData?.stateId || "SC");

  const { mutateAsync: createCompany } = useCreateCompany();
  const { mutateAsync: updateCompany } = useUpdateCompany();

  const [isPending, startTransition] = useTransition();

  async function handleSubmit(values: any) {
    startTransition(async () => {
      try {
        if (editData) {
          const res = await updateCompany({
            body: values,
            _prefix: "/admin",
          });

          if (typeof res == "object") {
            enqueueSnackbar({
              message: "Empresa atualizada com sucesso!",
              variant: "success",
            });
            handleClose();
          }
        } else {
          const body: CompanyBody = {
            name: values.name,
            cnpj: values.cnpj,
            banner: values.banner,
            countryId: values.countryId,
            stateId: values.stateId,
            cityId: values.cityId,
            address: values.address,
            phone1: values.phone1,
            phone2: null,
            hasWhatsapp1: values.hasWhatsapp1,
            hasWhatsapp2: false,
            email: values.email,
            website: values.website,
            registrationNumber: values.registrationNumber,
            taxRegime: values.taxRegime,
            headquarters: values.headquarters,
            isActive: values.isActive == "true" ? true : false,
            documentStorageUrl: "",
          };

          const res = await createCompany({ body: body, _prefix: "/admin" });

          if (typeof res == "object") {
            enqueueSnackbar({
              message: "Empresa criada com sucesso!",
              variant: "success",
            });
            handleClose();
          }
          console.log("res", res);
        }
      } catch (error: any) {
        console.log(error);
        enqueueSnackbar({
          message: "Tente novamente mais tarde",
          variant: "error",
        });
      }
    });
  }

  const initialValues = editData
    ? editData
    : {
        name: "",
        cnpj: "",
        banner: "",
        countryId: "BR",
        stateId: "SC",
        cityId: "",
        address: " ",
        phone1: "",
        phone2: null,
        hasWhatsapp1: true,
        hasWhatsapp2: false,
        email: "",
        website: "",
        registrationNumber: "",
        taxRegime: "",
        headquarters: true,
        isActive: true,
        documentStorageUrl: "",
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

  const statusOptions = [
    {
      id: true,
      label: "Ativa",
    },
    {
      id: false,
      label: "inativa",
    },
  ];

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Alterar" : "Adicionar"} empresa</DialogTitle>
          <DialogDescription>
            Preencha o formulario para {editData ? "Alterar" : "adicionar"} ema empresa.
          </DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
          {({ errors, touched, values, setFieldValue }) => {
            console.log("errors", errors);
            return (
              <Form className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                  <Label>Nome da empresa</Label>
                  <Field as={Input} name="name" placeholder="Digite o primeiro nome do cliente" variant="filled" />
                  {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>CNPJ</Label>
                  <Field as={Input} name="cnpj" placeholder="Digite o sobrenome" variant="filled" />
                  {errors.cnpj && touched.cnpj && <div className="text-red-500 text-sm">{errors.cnpj}</div>}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Email</Label>
                  <Field as={Input} name="email" placeholder="Digite o email" variant="filled" />
                  {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
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
                  <Label>Endereço</Label>
                  <Field as={Input} name="address" placeholder="Digite o endereço" variant="filled" />
                  {errors.address && touched.address && <div className="text-red-500 text-sm">{errors.address}</div>}
                </div>

                <div className="col-span-12 md:col-span-3">
                  <Label>Telefone</Label>
                  <Field as={Input} name="phone1" placeholder="Digite o telefone" variant="filled" />
                  {errors.phone1 && touched.phone1 && <div className="text-red-500 text-sm">{errors.phone1}</div>}
                </div>

                <div className="col-span-12 md:col-span-1 flex flex-col justify-between pt-2">
                  <Label>Whatsapp?</Label>

                  <div>
                    <Switch checked={values.hasWhatsapp1} onCheckedChange={(v) => setFieldValue("hasWhatsapp1", v)} />
                  </div>

                  {errors.hasWhatsapp1 && touched.hasWhatsapp1 && (
                    <div className="text-red-500 text-sm">{errors.hasWhatsapp1}</div>
                  )}
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Site</Label>
                  <Field as={Input} name="website" placeholder="Digite o site" variant="filled" />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>Regime</Label>
                  <Field as={Input} name="taxRegime" placeholder="Ex: Lucro real" variant="filled" />
                </div>

                <div className="col-span-12 md:col-span-4">
                  <Label>País</Label>

                  <Select value={String(values.isActive)} onValueChange={(value) => setFieldValue("isActive", value)}>
                    <SelectTrigger className="w-full" variant="filled">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {statusOptions.map((item) => (
                        <SelectItem key={String(item.id)} value={String(item.id)}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {errors.isActive && touched.isActive && <div className="text-red-500 text-sm">{errors.isActive}</div>}
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

export default CompanyModal;
