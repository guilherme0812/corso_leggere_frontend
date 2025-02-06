"use client";

import { Button } from "@/app/_components/ui/Button";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import Skeleton from "@/app/_components/ui/Skeleton";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { createUser } from "../../_actions/register";
import { useFormStatus } from "react-dom";

const initialValues = { email: "", password: "", confirmPassword: "", firstName: "", lastName: "" };

export type Schema = typeof initialValues;

function RegisterForm() {
  const { pending: isPending } = useFormStatus();
  // const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Por favor, insira um e-mail válido.").required("O campo e-mail é obrigatório."),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres.").required("O campo senha é obrigatório."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais.")
      .required("A confirmação de senha é obrigatória."),
    firstName: Yup.string().required("O campo de nome é obrigatório."),
    lastName: Yup.string().required("O campo sobrenome é obrigatório."),
  });

  const handleSubmit = async (values: Schema) => {
    createUser(values);
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
                <Label className="mb-2">Nome</Label>
                {!isPending ? (
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Digite seu primeiro nome"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                  />
                ) : (
                  <Skeleton className="h-10 w-full bg-gray-200" />
                )}

                <ErrorMessage>{errors.firstName}</ErrorMessage>
              </div>

              <div>
                <Label className="mb-2">Sobrenome</Label>
                {!isPending ? (
                  <Input
                    variant="filled"
                    type="text"
                    placeholder="Digite seu ultimo nome"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                  />
                ) : (
                  <Skeleton className="h-10 w-full bg-gray-200" />
                )}

                <ErrorMessage>{errors.lastName}</ErrorMessage>
              </div>

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
                  <div className="relative">
                    <Input
                      variant="filled"
                      type="password"
                      placeholder="Digite a sua senha"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                    />
                  </div>
                ) : (
                  <Skeleton className="h-10 w-full bg-gray-200" />
                )}

                <ErrorMessage>{errors.password}</ErrorMessage>
              </div>

              <div>
                <Label className="mb-2">Confirmação</Label>
                {!isPending ? (
                  <div className="relative">
                    <Input
                      variant="filled"
                      type="password"
                      placeholder="Digite a sua senha"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={values.confirmPassword}
                    />
                  </div>
                ) : (
                  <Skeleton className="h-10 w-full bg-gray-200" />
                )}

                <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
              </div>

              {!isPending ? (
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

export default RegisterForm;
