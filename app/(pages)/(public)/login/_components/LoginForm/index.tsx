"use client";

import { Button } from "@/app/_components/ui/Button";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import Skeleton from "@/app/_components/ui/Skeleton";
// import { authContext } from "@/app/_context/authContext";
// import { useCustomRequest } from "@/app/_hooks/api/useCustomApi";
import { Form, Formik } from "formik";
// import { useContext, useState } from "react";
import * as Yup from "yup";
import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { IoLogoGithub } from "react-icons/io5";

const initialValues = { email: "", password: "" };

type Schema = typeof initialValues;

function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const validationSchema = Yup.object({
    email: Yup.string().email("Por favor, insira um e-mail válido.").required("O campo e-mail é obrigatório."),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres.").required("O campo senha é obrigatório."),
  });

  const handleSubmit = async (values: Schema) => {
    startTransition(async () => {
      const result = await signIn("credentials", {
        redirect: false, // Evita redirecionamento automático
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        console.error("Erro ao autenticar:", result.error);
      } else {
        console.log("Login bem-sucedido!", result);
      }
    });
  };

  const handleSigninGithub = () => {
    signIn("github");
  };

  return (
    <div className="flex flex-col gap-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {({ values, handleChange, errors }) => {
          return (
            <Form className="flex flex-col gap-4">
              <div>
                <Label className="mb-2">Email</Label>
                {!isPending ? (
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
                {!isPending ? (
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

              {!isPending ? (
                <Button type="submit" className="w-full">
                  Acessar
                </Button>
              ) : (
                <Skeleton className="h-10 w-full bg-gray-200" />
              )}

              <div className="relative w-full my-4">
                <hr className="border-t border-gray-300" />
                <span className="absolute top-[-10px] inset-x-0 text-sm text-center bg-white px-2 w-max mx-auto">
                  Acese de outra forma
                </span>
              </div>

              <Button type="button" className="w-full bg-gray-700" onClick={handleSigninGithub}>
                <IoLogoGithub className="text-lg" />
                Login com Github
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default LoginForm;
