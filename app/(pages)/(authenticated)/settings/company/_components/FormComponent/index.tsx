"use client";

import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Switch } from "@/app/_components/ui/switch";
import { getCities } from "@/app/_services/cities";
import { ICompany } from "@/app/_services/companies";
import { getCountries } from "@/app/_services/country";
import { getStates } from "@/app/_services/states";
import { useQuery } from "@tanstack/react-query";
import { Field, Formik } from "formik";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Button } from "@/app/_components/ui/Button";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { updateCompany } from "@/app/actions/company";

// import { LoginDataType } from "@/app/_types";
// import { useSession } from "next-auth/react";

function FormComponent({ data }: { data: ICompany }) {
  const router = useRouter();
  //   const { data } = useSession();
  //   const user = data?.user as LoginDataType;
  const [state, setState] = useState<string>(data?.stateId || "");

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

  const handleSubmit = async (values: ICompany) => {
    console.log("handle submit");
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      const res = await updateCompany(formData);

      console.log("res", res);

      if (typeof res == "object") {
        enqueueSnackbar({
          message: "Dados alterados  com sucesso",
          variant: "success",
        });
        router.refresh();
      }
    } catch (error: any) {
      enqueueSnackbar({
        message: "Erro interno, tente mais tarde",
        variant: "error",
      });
      console.log(error);
    }
  };

  return (
    <Formik initialValues={data} onSubmit={handleSubmit}>
      {({ values, setFieldValue, errors, touched, resetForm, dirty, handleSubmit }) => {
        console.log("err", errors);
        return (
          <div className="mt-8 max-w-screen-md">
            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Nome da empresa</Label>
              </div>
              <div>
                <Field as={Input} name="name" placeholder="Digite o nome da empresa" variant="filled" />
                {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>CNPJ</Label>
              </div>
              <div>
                <Field as={Input} name="cnpj" placeholder="Digite o nome da empresa" variant="filled" />
                {errors.cnpj && touched.cnpj && <div className="text-red-500 text-sm">{errors.cnpj}</div>}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Telefone 1</Label>
              </div>
              <div>
                <Field as={Input} name="phone1" placeholder="Digite o telefone principal" variant="filled" />
                {errors.phone1 && touched.phone1 && <div className="text-red-500 text-sm">{errors.phone1}</div>}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Possui whatsapp</Label>
              </div>
              <div>
                <Switch checked={values.hasWhatsapp1} onCheckedChange={(v) => setFieldValue("hasWhatsapp1", v)} />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Telefone 2</Label>
              </div>
              <div>
                <Field as={Input} name="phone2" placeholder="Digite o telefone principal" variant="filled" />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Possui whatsapp</Label>
              </div>
              <div>
                <Switch checked={values.hasWhatsapp2} onCheckedChange={(v) => setFieldValue("hasWhatsapp2", v)} />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Email</Label>
              </div>
              <div>
                <Field as={Input} name="email" placeholder="Digite o email da empresa" variant="filled" />
                {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>País</Label>
              </div>
              <div>
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
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Estado</Label>
              </div>
              <div>
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
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Cidade</Label>
              </div>
              <div>
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

                {errors.cityId && touched.cityId && <div className="text-red-500 text-sm">{errors.cityId}</div>}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Endereço</Label>
              </div>
              <div>
                <Field as={Input} name="address" placeholder="Digite o endereço" variant="filled" />
                {errors.address && touched.address && <div className="text-red-500 text-sm">{errors.address}</div>}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Número de registro</Label>
              </div>
              <div>
                <Field
                  as={Input}
                  name="registrationNumber"
                  placeholder="Digite o numero de registro"
                  variant="filled"
                />
                {errors.registrationNumber && touched.registrationNumber && (
                  <div className="text-red-500 text-sm">{errors.registrationNumber}</div>
                )}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Regime</Label>
              </div>
              <div>
                <Field as={Input} name="taxRegime" placeholder="Digite o regime da empresa" variant="filled" />
                {errors.taxRegime && touched.taxRegime && (
                  <div className="text-red-500 text-sm">{errors.taxRegime}</div>
                )}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Website</Label>
              </div>
              <div>
                <Field as={Input} name="website" placeholder="Digite o website" variant="filled" />
                {errors.website && touched.website && <div className="text-red-500 text-sm">{errors.website}</div>}
              </div>
            </div>

            <div className="w-full grid grid-cols-2 mb-2">
              <div>
                <Label>Link do banner</Label>
              </div>
              <div>
                <Field as={Input} name="banner" placeholder="Digite o link do banner" variant="filled" />
                {errors.banner && touched.website && <div className="text-red-500 text-sm">{errors.banner}</div>}
              </div>
            </div>

            <div className="flex gap-4 mt-6 justify-end">
              <Button
                type="button"
                onClick={() => {
                  resetForm();
                  setState(data?.stateId || "");
                }}
                variant="outline"
                disabled={!dirty}
              >
                Resetar
              </Button>

              <Button type="submit" disabled={!dirty} onClick={() => handleSubmit()}>
                Salvar
              </Button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default FormComponent;
