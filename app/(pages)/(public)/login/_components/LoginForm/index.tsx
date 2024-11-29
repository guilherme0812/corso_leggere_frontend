"use client";

import { Button } from "@/app/_components/ui/Button";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import Skeleton from "@/app/_components/ui/Skeleton";
import { authContext } from "@/app/_context/authContext";
import { useCustomRequest } from "@/app/_hooks/api/useCustomApi";
import { LoginDataType } from "@/app/_types";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";

const initialValues = { email: "", password: "" };
type Schema = typeof initialValues;

function LoginForm() {
  const { sign } = useContext(authContext);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: loginRequest, isPending } = useCustomRequest<Schema>([], "POST");

  const login = async (body: Schema) =>
    await loginRequest({
      params: { url: "/login" },
      body,
    });

  const validationSchema = Yup.object({
    email: Yup.string().email("Por favor, insira um e-mail válido.").required("O campo e-mail é obrigatório."),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres.").required("O campo senha é obrigatório."),
  });

  const handleSubmit = async (values: Schema) => {
    setLoading(true);
    try {
      console.log("chegou aqui");
      const { data } = await login(values);
      console.log("fez req");
      sign(data as unknown as LoginDataType);
    } catch (err: any) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ values, handleChange, errors }) => {
          return (
            <Form className="flex flex-col gap-4">
              <div>
                <Label className="mb-2">Email</Label>
                {!(isPending || loading) ? (
                  <Input
                    variant="filled"
                    type="email"
                    placeholder="ex: leggere@gmail.com"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                ) : (
                  <Skeleton className="h-10 w-full bg-gray-200" />
                )}
                <ErrorMessage>{errors.email}</ErrorMessage>
              </div>

              <div>
                <Label className="mb-2">Senha</Label>
                {!(isPending || loading) ? (
                  <Input
                    variant="filled"
                    type="password"
                    placeholder="Digite a sua senha"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                  />
                ) : (
                  <Skeleton className="h-10 w-full bg-gray-200" />
                )}

                <ErrorMessage>{errors.password}</ErrorMessage>
              </div>

              {!(isPending || loading) ? (
                <Button type="submit" className="w-full">
                  Acessar
                </Button>
              ) : (
                <Skeleton className="h-10 w-full bg-gray-200" />
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
