"use client";

import { Dialog, DialogContent, DialogHeader } from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/Input";
import { Label } from "@/app/_components/ui/Label";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "@/app/_components/ui/Button";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/_components/ui/Select";
import {
  AmountType,
  CreateDistribution,
  PaymentBodyType,
  PaymentDataType,
  SplitTypeEnum,
} from "@/app/_services/finanances";
import { DatePicker } from "@/app/_components/ui/DatePicker";
import { UseCases } from "@/app/_hooks/cases";
import { NumericFormat } from "react-number-format";
import { useCreatePayment } from "@/app/_hooks/finances";
import { enqueueSnackbar } from "notistack";
import { LuCalendar, LuCheck, LuChevronRight, LuDollarSign, LuPlus, LuTrash2 } from "react-icons/lu";
import { numberFormat } from "@/app/_utils";
import { useBeneficiaries } from "@/app/_hooks/beneficiary";
import { BeneficiaryDataType, BeneficiaryTypeEnum } from "@/app/_services/beneficiary";
import { Switch } from "@/app/_components/ui/switch";

type ModalType = {
  handleClose(): void;
  editData: PaymentDataType | undefined;
  initialCaseId?: string;
};

const schema = Yup.object().shape({
  caseId: Yup.string().required("Processo é obrigatório"),
  amount: Yup.number().positive("Campo obrigatório"),
  dueDate: Yup.string().required("Data de vencimento é obrigatório"),
  status: Yup.string().required("Data de vencimento é obrigatório"),
});

function PaymentModal({ handleClose, initialCaseId }: ModalType) {
  const [step, setStep] = useState(1);

  const [splits, setSplits] = useState<CreateDistribution[]>([]);
  const [selectedAmountType, setSelectedAmountType] = useState(AmountType.PERCENTAGE);
  // const totalSplitsAmount = splits.reduce((total, split) => total + split.amount, 0);

  const { data: cases } = UseCases({});
  const { data: beneficiaries } = useBeneficiaries({ filters: {} });
  const { mutateAsync: createPayment } = useCreatePayment();

  const totalDistributed = splits.reduce((sum, s) => {
    if (selectedAmountType == AmountType.PERCENTAGE) {
      return sum + (s.percentage || 0);
    }

    return sum + (s.fixedAmount || 0);
  }, 0);

  async function handleSubmit(values: any) {
    try {
      const diffAmountToOffice =
        selectedAmountType == AmountType.PERCENTAGE ? 100 - totalDistributed : values.totalAMount - totalDistributed;

      const splitToOffice: CreateDistribution = {
        beneficiaryId: beneficiaries?.find((item) => item.type == BeneficiaryTypeEnum.OFFICE)?.id || "",
        fixedAmount: selectedAmountType == AmountType.FIXED ? diffAmountToOffice : 0,
        percentage: selectedAmountType == AmountType.PERCENTAGE ? diffAmountToOffice : 0,
        type: SplitTypeEnum.OFFICE,
      };

      const distributions = [
        ...splits.map((item) => ({
          beneficiaryId: item.beneficiaryId,
          fixedAmount: item.fixedAmount,
          percentage: item.percentage,
          type: item.type,
        })),
        splitToOffice,
      ];

      const payload: PaymentBodyType = {
        caseId: values.caseId,
        dueDate: values.dueDate.toISOString().split("T")[0],
        totalAmount: values.totalAmount,
        distributions,
      };

      if (values.hasInstallments) {
        payload.installments = {
          enabled: true,
          firstDueDate: values.dueDate.toISOString().split("T")[0],
          interval: values.interval || "MONTHLY",
          quantity: Number(values.installmentsQuantity),
        };
      }
      const res = await createPayment(payload);

      enqueueSnackbar({ message: "Pagamento criado com sucesso", variant: "success" });
      res && handleClose();
    } catch (error: any) {
      console.log(error);
    }
  }

  const installmentInterval = [
    {
      id: "MONTHLY",
      label: "Mensal",
    },
    {
      id: "BIWEEKLY",
      label: "A cada duas semanas",
    },
    {
      id: "WEEKLY",
      label: "Mensal",
    },
  ];

  const initialValues = {
    caseId: initialCaseId,
    totalAmount: 0,
    dueDate: undefined,
    status: "PENDING",
    method: undefined,
    hasInstallments: false,
    installmentsQuantity: 0,
    interval: "",
  };
  const availableAttornies =
    beneficiaries
      ?.filter((d) => d.type == BeneficiaryTypeEnum.ATTORNEY)
      .filter((l) => !splits.find((s) => s.beneficiaryId === l.id)) || [];

  const availableReferral =
    beneficiaries?.filter((d) => d.type == "REFERRAL").filter((l) => !splits.find((s) => s.beneficiaryId === l.id)) ||
    [];

  const addAttorneyToSplit = (beneficiary: BeneficiaryDataType) => {
    setSplits((prev) => [
      ...prev,
      {
        beneficiaryId: beneficiary.id,
        fixedAmount: 0,
        percentage: 0,
        type: SplitTypeEnum.ATTORNEY,
        beneficiary,
      },
    ]);
  };
  const addReferralToSplit = (beneficiary: BeneficiaryDataType) => {
    setSplits((prev) => [
      ...prev,
      {
        beneficiaryId: beneficiary.id,
        fixedAmount: 0,
        percentage: 0,
        type: SplitTypeEnum.REFERRAL,
        beneficiary,
      },
    ]);
  };

  const removeSplit = (id: string) => {
    setSplits(splits.filter((s) => s.beneficiaryId !== id));
  };

  const updateSplit = (id: string, field: any, value: number) => {
    setSplits(splits.map((s) => (s.beneficiaryId === id ? { ...s, [field]: value } : s)));
  };

  useEffect(() => {
    setSplits((prev) => prev.map((d) => ({ ...d, fixedAmount: 0, percentage: 0 })));
  }, [selectedAmountType]);

  console.log(splits);

  return (
    <Dialog open onOpenChange={handleClose}>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        {({ errors, touched, values, setFieldValue }) => {
          console.log(errors);
          return (
            <DialogContent className="max-w-screen-lg max-h-[95vh] overflow-y-auto grid grid-cols-12 p-0 border-none">
              <div className="col-span-4 bg-slate-800 text-white p-4">
                <DialogHeader className="mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <LuDollarSign className="text-white" size={24} />
                  </div>
                  <h2 className="text-xl font-bold text-white">Novo Pagamento</h2>
                  <p className="text-slate-300 text-sm mt-2">Configure o pagamento e distribua os valores</p>
                </DialogHeader>

                <div className="flex-1 space-y-4">
                  <div
                    className={`flex items-center gap-4 p-4 rounded-md transition-all cursor-pointer ${
                      step === 1 ? "bg-blue-500 shadow-lg shadow-blue-500/50" : "bg-slate-800 hover:bg-slate-700"
                    }`}
                    onClick={() => setStep(1)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        step === 1 ? "bg-white text-blue-500" : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      1
                    </div>
                    <div>
                      <div className="text-white font-medium">Informações</div>
                      <div className={`text-xs  ${step == 1 ? "text-white" : "text-slate-400"}`}>
                        Dados do pagamento
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-4 p-4 rounded-md transition-all cursor-pointer ${
                      step === 2 ? "bg-blue-500 shadow-lg shadow-blue-500/50" : "bg-slate-800 hover:bg-slate-700"
                    }`}
                    onClick={() => setStep(2)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        step === 2 ? "bg-white text-blue-500" : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      2
                    </div>
                    <div>
                      <div className="text-white font-medium">Divisão</div>
                      <div className={`text-xs  ${step == 2 ? "text-white" : "text-slate-400"}`}>
                        Distribuir valores
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-4 p-4 rounded-md transition-all cursor-pointer ${
                      step === 3 ? "bg-blue-500 shadow-lg shadow-blue-500/50" : "bg-slate-800 hover:bg-slate-700"
                    }`}
                    onClick={() => setStep(3)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        step === 3 ? "bg-white text-blue-500" : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      3
                    </div>
                    <div>
                      <div className="text-white font-medium">Revisão</div>
                      <div className={`text-xs  ${step == 3 ? "text-white" : "text-slate-400"}`}>Confirmar dados</div>
                    </div>
                  </div>
                </div>

                {/* Footer Sidebar */}
                <div className="mt-auto pt-6 border-t border-slate-700">
                  <div className="text-xs text-slate-300 mb-2">Valor Total</div>
                  <div className="text-3xl font-bold text-white flex items-center gap-2">
                    {numberFormat(values.totalAmount, "pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}{" "}
                    <span className="text-sm">
                      {values.hasInstallments && values.installmentsQuantity
                        ? `(${values.installmentsQuantity} parcelas)`
                        : null}
                    </span>
                  </div>
                </div>
              </div>

              <Form className="flex flex-col col-span-8 min-h-[60vh]">
                <div className="px-8 py-6 border-b border-gray-200 flex items-center justify-between bg-white">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {step === 1 && "Informações do Pagamento"}
                      {step === 2 && "Divisão entre Advogados"}
                      {step === 3 && "Revisão Final"}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {step === 1 && "Preencha os dados básicos da cobrança"}
                      {step === 2 && "Selecione os advogados e distribua os valores"}
                      {step === 3 && "Revise todas as informações antes de salvar"}
                    </p>
                  </div>
                  {/* <button className="p-2 hover:bg-gray-100 rounded-full transition-all">
                      <LuX size={24} className="text-gray-500" />
                    </button> */}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8">
                  {step === 1 && (
                    <div className="max-w-3xl mx-auto space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2">
                          <Label>Processo</Label>
                          <Select
                            value={values.caseId || ""}
                            onValueChange={(value) => {
                              setFieldValue("caseId", value);
                            }}
                          >
                            <SelectTrigger className="w-full px-8 py-6" variant="filled">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>

                            <SelectContent>
                              {!cases ? "Carregando..." : undefined}
                              {cases?.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                  {item.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {errors.caseId && <div className="text-red-500 text-sm">{errors.caseId}</div>}
                        </div>

                        <div>
                          <Label>Valor Total</Label>
                          <div className="relative">
                            <LuDollarSign className="absolute left-3 top-[0.85rem] text-gray-600" size={20} />
                            <NumericFormat
                              value={values.totalAmount}
                              className="px-8 py-6"
                              customInput={Input}
                              name="amount"
                              placeholder="Digite o sobrenome"
                              variant="filled"
                              decimalSeparator=","
                              thousandSeparator="."
                              onValueChange={({ floatValue }) => setFieldValue("totalAmount", floatValue)}
                            />
                          </div>
                          {errors.totalAmount && touched.totalAmount && (
                            <div className="text-red-500 text-sm">{errors.totalAmount}</div>
                          )}
                        </div>

                        <div className="col-span-1">
                          <Label>Parcelar pagamento</Label>
                          <div className="pt-3">
                            <Switch
                              checked={values.hasInstallments}
                              onCheckedChange={(v) => setFieldValue("hasInstallments", v)}
                            />
                          </div>
                        </div>

                        {values.hasInstallments ? (
                          <>
                            <div className="col-span-1">
                              <Label>Parcelar pagamento</Label>
                              <Select
                                value={values.installmentsQuantity.toString() || ""}
                                onValueChange={(value) => {
                                  setFieldValue("installmentsQuantity", value);
                                }}
                              >
                                <SelectTrigger className="w-full" variant="filled">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>

                                <SelectContent>
                                  {new Array(19).fill(0).map((opt, key) => (
                                    <SelectItem key={key} value={(key + 2).toString()}>
                                      {key + 2} parcelas -{" "}
                                      {numberFormat(values.totalAmount / (key + 2), "pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                      })}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="col-span-1">
                              <Label>Parcelas a cada</Label>
                              <Select
                                value={values.interval || ""}
                                onValueChange={(value) => {
                                  setFieldValue("interval", value);
                                }}
                              >
                                <SelectTrigger className="w-full" variant="filled">
                                  <SelectValue placeholder="Selecione" />
                                </SelectTrigger>

                                <SelectContent>
                                  {installmentInterval.map((opt, key) => (
                                    <SelectItem key={key} value={opt.id}>
                                      {opt.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        ) : null}

                        <div>
                          <Label>{values.hasInstallments ? "Primeiro vencimento" : "Data do vencimento"}</Label>
                          <div className="relative">
                            <LuCalendar className="absolute left-3 top-[0.85rem] text-gray-600" size={20} />
                            <DatePicker
                              placeholder="Data de vencimento"
                              onChange={(date) => setFieldValue("dueDate", date)}
                              buttonClassName={"px-8 py-6"}
                            />
                          </div>
                          {errors.dueDate && touched.dueDate && (
                            <div className="text-red-500 text-sm">{errors.dueDate}</div>
                          )}
                        </div>

                        {/* <div>
                          <Label>Status</Label>
                          <Select
                            value={values.status || ""}
                            onValueChange={(value) => {
                              setFieldValue("status", value);
                            }}
                          >
                            <SelectTrigger className="w-full px-8 py-6" variant="filled">
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>

                            <SelectContent>
                              {statusOptions?.map((item) => (
                                <SelectItem key={item.label} value={item.id}>
                                  {statusOptionsTranslate[item.id]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div> */}

                        {/* <div>
                          <Label>Método de Pagamento</Label>
                          <div className="relative">
                            <LuCreditCard className="absolute left-3 top-[0.85rem] text-gray-600" size={20} />
                            <Select
                              value={values.method || ""}
                              onValueChange={(value) => {
                                setFieldValue("method", value);
                              }}
                            >
                              <SelectTrigger variant="filled" className="px-8 py-6">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>

                              <SelectContent>
                                {paymentMethods?.map((item) => (
                                  <SelectItem key={item.id} value={item.id}>
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="max-w-4xl mx-auto">
                      {/* Toggle Tipo de Divisão */}
                      <div className="mb-8 flex items-center justify-center gap-4">
                        <button
                          type="button"
                          onClick={() => setSelectedAmountType(AmountType.PERCENTAGE)}
                          className={`px-8 py-4 rounded-md font-semibold transition-all ${
                            selectedAmountType === AmountType.PERCENTAGE
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/50 scale-105"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          📊 Divisão por Percentual
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedAmountType(AmountType.FIXED)}
                          className={`px-8 py-4 rounded-md font-semibold transition-all ${
                            selectedAmountType === AmountType.FIXED
                              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl shadow-blue-500/50 scale-105"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          💰 Divisão por Valor Fixo
                        </button>
                      </div>

                      {/* Advogados Selecionados */}
                      {splits?.filter((item) => item.type == SplitTypeEnum.ATTORNEY).length > 0 && (
                        <div className="mb-8 space-y-4">
                          <h4 className="text-lg font-bold text-gray-800 mb-4">Advogados Selecionados</h4>
                          {splits
                            ?.filter((item) => item.type == SplitTypeEnum.ATTORNEY)
                            .map((split, index) => (
                              <div
                                key={index}
                                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md p-5 border-2 border-blue-200"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="text-5xl">👨‍⚖️</div>
                                  <div className="flex-1">
                                    <div className="font-bold text-gray-900 text-lg">{split.beneficiary?.name}</div>
                                    <div className="text-sm text-gray-600">{split.beneficiary?.document}</div>
                                  </div>
                                  <div className="w-48">
                                    <div className="relative">
                                      <NumericFormat
                                        value={
                                          selectedAmountType == AmountType.PERCENTAGE
                                            ? split.percentage
                                            : split.fixedAmount
                                        }
                                        className="w-full pl-4 pr-12 py-3 bg-white border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-all text-lg font-bold"
                                        name="amount"
                                        placeholder="Digite o sobrenome"
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        onValueChange={({ floatValue }) =>
                                          updateSplit(
                                            split.beneficiaryId,
                                            selectedAmountType === AmountType.PERCENTAGE ? "percentage" : "fixedAmount",
                                            floatValue || 0,
                                          )
                                        }
                                        allowNegative={false}
                                      />

                                      <span className="absolute right-4 top-3.5 text-blue-600 font-bold">
                                        {selectedAmountType === AmountType.PERCENTAGE ? "%" : "R$"}
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => removeSplit(split.beneficiaryId as string)}
                                    className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
                                  >
                                    <LuTrash2 size={20} />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      {/* Advogados Disponíveis */}
                      {availableAttornies?.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-lg font-bold text-gray-800 mb-4">Adicionar Advogado</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {availableAttornies.map((lawyer) => (
                              <button
                                type="button"
                                key={lawyer.id}
                                onClick={() => addAttorneyToSplit(lawyer)}
                                className="bg-white border-2 border-gray-200 rounded-md p-5 hover:border-blue-500 hover:shadow-lg transition-all group"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="text-4xl">👨‍⚖️</div>
                                  <div className="flex-1 text-left">
                                    <div className="font-bold text-sm leading-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {lawyer.name}
                                    </div>
                                    <div className="text-sm text-gray-500">{lawyer.document}</div>
                                  </div>
                                  <LuPlus className="text-gray-400 group-hover:text-blue-500" size={24} />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* indicadores Selecionados */}
                      {splits?.filter((item) => item.type == SplitTypeEnum.REFERRAL).length > 0 && (
                        <div className="mb-8 space-y-4">
                          <h4 className="text-lg font-bold text-gray-800 mb-4">Indicadores Selecionados</h4>
                          {splits
                            ?.filter((item) => item.type == SplitTypeEnum.REFERRAL)
                            .map((split, index) => (
                              <div
                                key={index}
                                className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-md p-5 border-2 border-blue-200"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="text-5xl">👨‍⚖️</div>
                                  <div className="flex-1">
                                    <div className="font-bold text-gray-900 text-lg">{split.beneficiary?.name}</div>
                                    <div className="text-sm text-gray-600">{split.beneficiary?.document}</div>
                                  </div>
                                  <div className="w-48">
                                    <div className="relative">
                                      <NumericFormat
                                        value={
                                          selectedAmountType == AmountType.PERCENTAGE
                                            ? split.percentage
                                            : split.fixedAmount
                                        }
                                        className="w-full pl-4 pr-12 py-3 bg-white border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-all text-lg font-bold"
                                        name="amount"
                                        placeholder="Digite o sobrenome"
                                        decimalSeparator=","
                                        thousandSeparator="."
                                        onValueChange={({ floatValue }) =>
                                          updateSplit(
                                            split.beneficiaryId,
                                            selectedAmountType === AmountType.PERCENTAGE ? "percentage" : "fixedAmount",
                                            floatValue || 0,
                                          )
                                        }
                                        allowNegative={false}
                                      />

                                      <span className="absolute right-4 top-3.5 text-blue-600 font-bold">
                                        {selectedAmountType === AmountType.PERCENTAGE ? "%" : "R$"}
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => removeSplit(split.beneficiaryId as string)}
                                    className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all"
                                  >
                                    <LuTrash2 size={20} />
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      {/* referrer Disponíveis */}
                      {availableReferral?.length > 0 && (
                        <div className="mb-4" id="referrer">
                          <h4 className="text-lg font-bold text-gray-800 mb-4">Adicionar indicação</h4>
                          <div className="grid grid-cols-2 gap-4">
                            {availableReferral.map((lawyer) => (
                              <button
                                type="button"
                                key={`referrer-${lawyer.id}`}
                                onClick={() => addReferralToSplit(lawyer)}
                                className="bg-white border-2 border-gray-200 rounded-md p-5 hover:border-blue-500 hover:shadow-lg transition-all group"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="text-4xl">👨‍⚖️</div>
                                  <div className="flex-1 text-left">
                                    <div className="font-bold text-sm leading-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                                      {lawyer.name}
                                    </div>
                                    <div className="text-sm text-gray-500">{lawyer.document}</div>
                                  </div>
                                  <LuPlus className="text-gray-400 group-hover:text-blue-500" size={24} />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Validação */}
                      {/* {splits.length > 0 && (
                        <div
                          className={`mt-8 p-6 rounded-2xl border-2 ${
                            isValidDistribution ? "bg-green-50 border-green-300" : "bg-amber-50 border-amber-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isValidDistribution ? (
                              <LuCheck className="text-green-600" size={24} />
                            ) : (
                              <AlertCircle className="text-amber-600" size={24} />
                            )}
                            <div className="flex-1">
                              <div className="font-bold text-gray-900">
                                {divisionType === "percentage" ? "Percentual" : "Valor"} Distribuído:{" "}
                                <span className={isValidDistribution ? "text-green-600" : "text-amber-600"}>
                                  {divisionType === "percentage"
                                    ? `${totalDistributed}%`
                                    : `R$ ${totalDistributed.toFixed(2)}`}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600">
                                {isValidDistribution
                                  ? "✓ Distribuição correta!"
                                  : divisionType === "percentage"
                                  ? `Faltam ${100 - totalDistributed}% para distribuir`
                                  : `Faltam R$ ${(formData.amount - totalDistributed).toFixed(2)} para distribuir`}
                              </div>
                            </div>
                          </div>
                        </div>
                      )} */}
                    </div>
                  )}

                  {/* Step 3: Revisão */}
                  {step === 3 && (
                    <div className="max-w-3xl mx-auto space-y-6">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
                        <h4 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pagamento</h4>

                        <div className="space-y-4 text-sm">
                          <div className="flex justify-between items-center py-3 border-b border-blue-200">
                            <span className="text-gray-700 font-medium">Processo:</span>
                            <span className="text-gray-900 font-bold">
                              {cases?.find((item) => item.id == values.caseId)?.title}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-blue-200">
                            <span className="text-gray-700 font-medium">Valor Total:</span>
                            <span className="text-gray-900 font-bold text-sm">
                              {numberFormat(values.totalAmount, "pt-br", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-blue-200">
                            <span className="text-gray-700 font-medium">Data de Vencimento:</span>
                            <span className="text-gray-900 font-bold">
                              {new Date(values.dueDate || "").toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {splits.length > 0 && (
                        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                          <h4 className="text-xl font-bold text-gray-900 mb-6">Divisão de Valores</h4>
                          <div className="space-y-4">
                            {splits.map((split) => (
                              <div
                                key={split.beneficiaryId}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                              >
                                <div className="flex items-center gap-3">
                                  <>
                                    <div className="text-3xl">👩‍⚖️</div>

                                    <div>
                                      <div className="font-bold text-gray-900">
                                        {split.type == SplitTypeEnum.ATTORNEY ? "Dr." : ""} {split?.beneficiary?.name}{" "}
                                        {split.type == SplitTypeEnum.REFERRAL ? "(Indicação)" : ""}
                                      </div>
                                      <div className="text-sm text-gray-500">{split?.beneficiary?.document}</div>
                                    </div>
                                  </>
                                </div>
                                <div className="text-right">
                                  <div className=" font-bold text-blue-600">
                                    {selectedAmountType === AmountType.PERCENTAGE
                                      ? `${split.percentage}%`
                                      : `R$ ${(split.fixedAmount || 0).toFixed(2)}`}
                                  </div>
                                  {selectedAmountType === AmountType.PERCENTAGE && (
                                    <div className="text-sm text-gray-500">
                                      R$ {((values.totalAmount * (split?.percentage || 0)) / 100).toFixed(2)}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer com Ações */}
                <div className="px-8 py-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                  <Button
                    size="lg"
                    className="text-slate-600"
                    variant="ghost"
                    onClick={() => step > 1 && setStep(step - 1)}
                    type="button"
                  >
                    Cancelar
                  </Button>

                  <div className="flex gap-3">
                    <Button type="button" size="lg" variant="ghost" onClick={() => step > 1 && setStep(step - 1)}>
                      ← Voltar
                    </Button>
                    {step < 3 ? (
                      <Button
                        onClick={() => setStep(step + 1)}
                        // className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                        variant={"secondary"}
                        size={"lg"}
                        type="button"
                        disabled={values.caseId && values.dueDate && values.status && values.totalAmount ? false : true}
                      >
                        Próximo
                        <LuChevronRight size={20} />
                      </Button>
                    ) : (
                      <>
                        <Button
                          key={"bubmit"}
                          id="submitBtn"
                          size={"lg"}
                          className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                          disabled={Object.entries(errors).length ? true : false}
                          type="submit"
                        >
                          <LuCheck size={20} />
                          Salvar Pagamento
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Form>
            </DialogContent>
          );
        }}
      </Formik>
    </Dialog>
  );
}

export default PaymentModal;
