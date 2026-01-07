"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { enqueueSnackbar } from "notistack";
import { CategoryType, FinancialCategoryDataType } from "@/app/_services/finanances";
import { useCreateFinancialCategories, useUpdateFinancialCategories } from "@/app/_hooks/finances";

type CategoryModalType = {
  handleClose(): void;
  editData: FinancialCategoryDataType | undefined;
};

const schema = Yup.object().shape({
  name: Yup.string().min(2, "Mínimo 2 caracteres").required("Nome é obrigatório"),
  type: Yup.string(),
});

function CategoryModal({ editData, handleClose }: CategoryModalType) {
  // const { data } = useSession();
  const router = useRouter();

  const { mutateAsync: createFinancialCategory } = useCreateFinancialCategories();
  const { mutateAsync: updateFinancialCategory } = useUpdateFinancialCategories();

  async function handleSubmit(values: FinancialCategoryDataType) {
    try {
      if (editData) {
        await updateFinancialCategory(values);

        enqueueSnackbar({
          message: "Alterado com sucesso",
          variant: "success",
        });

        handleClose();
      } else {
        await createFinancialCategory(values);

        enqueueSnackbar({
          message: "Criado com sucesso",
          variant: "success",
        });
        router.refresh();
        handleClose();
      }
    } catch (error: any) {
      console.log("error", error);
      enqueueSnackbar({
        message: "Erro interno, tente novamente mais tarde",
        variant: "error",
      });
    }
  }

  const initialValues = editData
    ? editData
    : {
        name: "",
        type: CategoryType.INCOME,
      };

  const categoryTypes = [
    { label: "Receita", value: CategoryType.INCOME },
    { label: "Despesa", value: CategoryType.EXPENSE },
  ];

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-md max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editData ? "Alterar" : "Adicionar"} categoria financeira</DialogTitle>
          <DialogDescription>
            Preencha o formulario para {editData ? "Alterar" : "adicionar"} uma categoria.
          </DialogDescription>
        </DialogHeader>

        <Formik initialValues={initialValues as any} validationSchema={schema} onSubmit={handleSubmit}>
          {({ errors, touched, values, setFieldValue, dirty, resetForm }) => {
            return (
              <Form className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <Label>Nome</Label>
                  <Field as={Input} name="name" placeholder="Digite o primeiro nome do cliente" variant="filled" />
                  {errors.name && touched.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>

                <div className="col-span-12">
                  <Label>Tipo da categoria</Label>

                  <Select
                    value={values.type || ""}
                    onValueChange={(value) => {
                      setFieldValue("type", value);
                    }}
                  >
                    <SelectTrigger className="w-full" variant="filled">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>

                    <SelectContent>
                      {categoryTypes?.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-12 flex gap-4 mt-6 justify-end">
                  <Button
                    type="button"
                    onClick={() => {
                      resetForm();
                    }}
                    variant="outline"
                    disabled={!dirty}
                  >
                    Resetar
                  </Button>

                  <Button type="submit" disabled={!dirty}>
                    {editData ? "Salvar alterações" : "Adicionar categoria"}
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

export default CategoryModal;
