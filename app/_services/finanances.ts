import { apiLeggere, apiServerLeggere } from "./api";
import { ICase } from "./case";

export type MonthReport = {
  month: string;
  total_received: number;
  total_paid: number;
};

export type GetMonthReportParams = {
  startDate?: string | null;
  endDate?: string | null;
};
export const getMonthReports = async ({ startDate, endDate }: GetMonthReportParams) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<MonthReport[]>({
      url: `/financial/aggregatedByMonth`,
      method: "GET",
      params: {
        startDate,
        endDate,
      },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export type CashFlowDataType = {
  id: string;
  type: "RECEIVABLE" | "PAYABLE";
  origin: FinancialEntryOrigin;
  status: FinancialEntryStatus;
  method: PaymentMethod;
  amount: number;
  dueDate: string;
  paidAt: any;
  description: any;
  notes: any;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  caseId: string;
  paymentId: string;
  splitId: any;
  companyId: string;
  category?: FinancialCategoryDataType;
  case?: ICase;
  payment: Payment;
  split?: SplitDataType;
  projectedAmount: number;
};

export enum CategoryType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}
export type FinancialCategoryDataType = {
  id: string;
  name: string;
  type: CategoryType;
  parentId?: string;
  createdAt: string;
  updatedAt?: string;
};

export interface Payment {
  id: string;
  caseId: string;
  amount: number;
  dueDate: string;
  paidAt: any;
  status: PaymentStatus;
  method: PaymentMethod;
}

export const getCashFlow = async (params: GetMonthReportParams) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<CashFlowDataType[]>({
      url: `/financial/realizedFlow`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
export const getCashFlowClientSide = async (params: GetMonthReportParams) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<CashFlowDataType[]>({
      url: `/financial/realizedFlow`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
export const getProjectionFlow = async (params: GetMonthReportParams) => {
  try {
    const res = await apiServerLeggere<CashFlowDataType[]>({
      url: `/financial/projectedFlow`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
export const getProjectionFlowClientSide = async (params: GetMonthReportParams) => {
  try {
    const res = await apiLeggere<CashFlowDataType[]>({
      url: `/financial/projectedFlow`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

type GetPaymentsParams = {
  startDueDate?: string | null;
  endDueDate?: string | null;
  limit?: number;
};

type GetTransactionsParams = {
  limit?: number;
};

export enum PaymentMethod {
  PIX = "PIX",
  TRANSFER = "TRANSFER",
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  OTHER = "OTHER",
  DEPOSIT = "DEPOSIT",
  PAYOUT = "PAYOUT",
  REFUND = "REFUND",
  CHARGEBACK = "CHARGEBACK",
  INVOICE = "INVOICE",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  LATE = "LATE",
}

export enum FinancialEntryOrigin {
  PAYMENT = "PAYMENT",
  SPLIT = "SPLIT",
  MANUAL = "MANUAL",
  CASE = "CASE",
}
export enum FinancialEntryStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  PARTIAL = "PARTIAL",
  OVERDUE = "OVERDUE",
}

export type FinancialEntryDataType = {
  id: string;
  type: "RECEIVABLE" | "PAYABLE";
  origin: FinancialEntryOrigin;
  amount: number;
  dueDate: string;
  createdAt: string;
  paidAt: string;
  status: FinancialEntryStatus;
};

export enum TransactionTypeEnum {
  INCOME = "INCOME", // Entrada de dinheiro (cliente pagando)
  EXPENSE = "EXPENSE", // Saída de dinheiro (pagando advogado/indicação)
  TRANSFER = "TRANSFER", // Transferência interna
  REFUND = "REFUND", // Estorno
  ADJUSTMENT = "ADJUSTMENT", // Ajuste manual
}

export enum TransactionStatusEnum {
  PENDING = "PENDING", // Aguardando processamento
  COMPLETED = "COMPLETED", // Concluída
  FAILED = "FAILED", // Falhou
  CANCELLED = "CANCELLED", // Cancelada
  REVERSED = "REVERSED", // Estornada
}
export type TransactionDataType = {
  id: string;
  code: string;
  type: TransactionTypeEnum;
  status: TransactionStatusEnum;
  amount: number;
  fee: number;
  netAmount: number;
  method: string;
  transactionDate: string;
  effectiveDate: string;
  description: string;
  notes: null;
  receiptUrl: null;
  paymentId: string;
  distributionId: string;
  beneficiaryId: string;
  caseId: string;
  companyId: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export const getFinancialEntry = async (params: GetPaymentsParams) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<FinancialEntryDataType[]>({
      url: `/financial/payments`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const getTransactions = async (params: GetTransactionsParams) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<TransactionDataType[]>({
      url: `/financial/transactions`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export type CreateFinancialEntryDTO = {
  type: "RECEIVABLE" | "PAYABLE";
  status: FinancialEntryStatus;
  origin: FinancialEntryOrigin;
  amount: number;
  dueDate: string;
  categoryId?: string | undefined;
  description?: string;
  method?: PaymentMethod;
};

export const CreateFinancialEntryClientSide = async (body: CreateFinancialEntryDTO) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<FinancialEntryDataType>({
      url: `/financial/createEntryPayment`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export type PaymentDataType = Payment & {
  splits: SplitDataType[];
  case: {
    title: string;
    processNumber: string;
    lawyerFee: number;
    businessFee: number;
    indicatorFee: number;
    indicatorId: string;
    client: {
      firstName: string;
      lastName: string;
    };
  };
  entries: FinancialEntryDataType[];
};

export enum SplitType {
  OFFICE = "OFFICE",
  LAWYER = "LAWYER",
  INDICATOR = "INDICATOR",
}

export enum AmountType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}

export type SplitDataType = {
  id: string | number;
  paymentId: string;
  type: SplitType;
  amount: number;
  amountType: AmountType;
  lawyerId?: string; // login in Payment modal
  lawyer: any;
};

export const getFiancialSummary = async (params: GetPaymentsParams) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<SummaryDataType>({
      url: `/financial/summary`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export type GetAllPaymentsParams = {
  startDueDate?: string | null;
  endDueDate?: string | null;
  status?: PaymentStatus | null;
  caseId?: string | null;
  processNumber?: string | null;
};

type SummaryDataType = {
  received: number;
  paid: number;
  receivable: number;
  payable: number;
  currencentBalance: number;
};

export const getPayments = async (params: GetAllPaymentsParams) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<PaymentDataType[]>({
      url: `/financial/payments`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const getPaymentsClientSide = async (params: GetAllPaymentsParams) => {
  try {
    const res = await apiLeggere<PaymentDataType[]>({
      url: `/financial/payments`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export type PaymentBodyType = {
  caseId: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  method?: PaymentMethod;
  splits: Omit<SplitDataType, "id" | "paymentId">[];
};

export const createPaymentClientSide = async (body: PaymentBodyType) => {
  try {
    const res = await apiLeggere<PaymentDataType[]>({
      url: `/financial/createPayment`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const payPaymentClientSide = async (id: string) => {
  try {
    const res = await apiLeggere<PaymentDataType[]>({
      url: `/financial/payment/pay`,
      method: "POST",
      params: {
        id: id,
      },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
export const deletePaymentClientSide = async (id: string) => {
  try {
    const res = await apiLeggere({
      url: `/financial/payment/delete`,
      method: "DELETE",
      params: {
        id: id,
      },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("Error");
  }
};

export const payEntryClientSide = async (id: string) => {
  try {
    const res = await apiLeggere<PaymentDataType[]>({
      url: `/financial/payEntry`,
      method: "POST",
      params: {
        id: id,
      },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("Error");
  }
};
export const deleteEntryClientSide = async (id: string) => {
  try {
    const res = await apiLeggere<PaymentDataType[]>({
      url: `/financial/entryPayment`,
      method: "DELETE",
      params: {
        id: id,
      },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error("Error");
  }
};

export const getFinancialCategoriesClientSide = async () => {
  try {
    const res = await apiLeggere<FinancialCategoryDataType[]>({
      url: `/financial/categories`,
      method: "GET",
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const createFinancialCategoriesClientSide = async (body: Partial<FinancialCategoryDataType>) => {
  try {
    const res = await apiLeggere({
      url: `/financial/category`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const updateFinancialCategoriesClientSide = async (body: Partial<FinancialCategoryDataType>) => {
  try {
    const res = await apiLeggere({
      url: `/financial/category`,
      method: "PUT",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export const removeFinancialCategoriesClientSide = async (id: string) => {
  try {
    const res = await apiLeggere({
      url: `/financial/category`,
      method: "DELETE",
      params: { id },
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
