"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/Button";
import {
  CategoryType,
  CreateFinancialEntryDTO,
  FinancialEntryOriginStatus,
  PaymentStatus,
} from "@/app/_services/finanances";
import { useCreateFinancialEntry, useFinancialCategories } from "@/app/_hooks/finances";
import { enqueueSnackbar } from "notistack";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/app/_components/ui/carousel";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import { Label } from "@/app/_components/ui/Label";
import { Input } from "@/app/_components/ui/Input";
import { NumericFormat } from "react-number-format";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import { Textarea } from "@/app/_components/ui/textarea";

type ModalType = {
  type?: "RECEIVABLE" | "PAYABLE";
  handleClose(): void;
};

function EntryPaymentModal({ type: _type, handleClose }: ModalType) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const [type, setType] = useState(_type);
  const [financialCategoryId, setFinancialCategoryId] = useState<string>();
  const [amount, setAmount] = useState(0);
  const [dueDate, setDueDate] = useState(new Date(new Date().setMonth(new Date().getMonth() + 1)));
  const [description, setDescription] = useState<string>();

  const [disabled, setDisabled] = useState(false);

  const { mutateAsync: createFinancialEntry, isPending } = useCreateFinancialEntry();
  const { data: financialCategories } = useFinancialCategories({});

  const categoriesFiltered =
    type == "RECEIVABLE"
      ? financialCategories?.filter((cat) => cat.type == CategoryType.INCOME)
      : financialCategories?.filter((cat) => cat.type == CategoryType.EXPENSE);

  const typeOption = [
    {
      id: "RECEIVABLE",
      label: "A receber",
    },
    {
      id: "PAYABLE",
      label: "A pagar",
    },
  ];

  const handleNext = async () => {
    if (current == 1) {
      if (api) {
        api.scrollNext();
      } else {
        alert("Por favor, preencha os campos obrigatórios!");
      }
    } else {
      const body: CreateFinancialEntryDTO = {
        amount: amount,
        dueDate: dueDate.toISOString().split("T")[0],
        origin: FinancialEntryOriginStatus.MANUAL,
        status: PaymentStatus.PENDING,
        type: type || "RECEIVABLE",
        description: description,
        categoryId: financialCategoryId,
      };

      const res = await createFinancialEntry(body);
      if (res) {
        enqueueSnackbar({
          message: "Conta criada com sucesso!",
          variant: "success",
        });

        handleClose();
      }
    }
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (current == 1) {
      setDisabled(type ? false : true);
    } else {
      setDisabled(amount && dueDate ? false : true);
    }
  }, [current, amount, dueDate, description, type]);

  console.log("isPending", isPending);

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="max-w-screen-sm max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar conta</DialogTitle>
          <DialogDescription>Preencha todos os campos necessarios para criar uma conta</DialogDescription>
        </DialogHeader>

        <div className="w-full relative h-[300px]">
          <div className="absolute w-full h-full">
            <Carousel
              setApi={setApi}
              opts={
                {
                  // watchDrag: false,
                }
              }
              className="w-full  m-auto h-full"
            >
              <CarouselContent className="h-full">
                <CarouselItem className="h-full">
                  <div className="w-full h-[300px] border p-2 flex flex-col justify-center">
                    <div className="mb-2">
                      <Label>Selecione o tipo de conta que deseja criar</Label>

                      <Select
                        value={type || ""}
                        onValueChange={(value) => {
                          setType(value as any);
                          setFinancialCategoryId(undefined);
                        }}
                      >
                        <SelectTrigger variant="filled">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>

                        <SelectContent>
                          {typeOption?.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="">
                      <Label>Categoria</Label>

                      <Select
                        value={financialCategoryId || ""}
                        onValueChange={(value) => {
                          setFinancialCategoryId(value);
                        }}
                      >
                        <SelectTrigger variant="filled">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>

                        <SelectContent>
                          {categoriesFiltered?.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem className="h-full">
                  <div className="w-full h-[300px] border p-2 flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="">
                        <Label>Valor da cobrança</Label>
                        <NumericFormat
                          customInput={Input}
                          name="amount"
                          placeholder="Digite o sobrenome"
                          variant="filled"
                          decimalSeparator=","
                          thousandSeparator="."
                          onValueChange={({ floatValue }) => setAmount(floatValue || 0)}
                          value={amount}
                        />
                      </div>
                      <div className="">
                        <Label>Data da cobrança</Label>
                        <DatePicker
                          placeholder="Data de vencimento"
                          initialValue={dueDate}
                          onChange={setDueDate as any}
                        />
                      </div>

                      <div className="col-span-2">
                        <Label>Descrição da conta</Label>
                        <Textarea
                          value={description}
                          className="bg-gray-200"
                          placeholder="Adicione uma descrição a essa conta."
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>
          </div>
        </div>
        <Button onClick={handleNext} disabled={disabled}>
          {current == 2 ? "Criar pagamento" : "Próxima etapa"}
        </Button>

        <div className="text-muted-foreground py-2 text-center text-sm">
          etapa {current} de {count}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EntryPaymentModal;
