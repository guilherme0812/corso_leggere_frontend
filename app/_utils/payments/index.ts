import { PaymentMethod } from "@/app/_services/finanances";

export const translatePaymentMethod = {
  [PaymentMethod.PIX]: "PIX",
  [PaymentMethod.BANK_TRANSFER]: "Depósito",
  [PaymentMethod.CASH]: "Dinheiro",
  [PaymentMethod.CREDIT_CARD]: "Cartão de crédito",
  [PaymentMethod.DEBIT_CARD]: "Cartão de débito",
  [PaymentMethod.CHECK]: "Cheque",
  [PaymentMethod.BANK_SLIP]: "Boleto",
  [PaymentMethod.OTHER]: "Outro",
};

export const paymentMethods = Object.entries(translatePaymentMethod).map(([key, value]) => ({
  id: key,
  lable: value,
}));
