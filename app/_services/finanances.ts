import { apiLeggere, apiServerLeggere } from "./api";
import { BeneficiaryDataType, BeneficiaryTypeEnum } from "./beneficiary";
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

export enum CategoryType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}

export type GetTransactionsParams = {
  limit?: number;
};

export enum PaymentMethod {
  PIX = "PIX",
  BANK_TRANSFER = "TRANSFER",
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  CHECK = "CHECK",
  BANK_SLIP = "BANK_SLIP",
  OTHER = "OTHER",
}

// Transaction
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
  method: PaymentMethod;
  transactionDate: string;
  effectiveDate: string;
  description: string;
  notes: null;
  receiptUrl: null;
  paymentId: string;
  distributionId: string;
  beneficiaryId: string;
  caseId: string;
  case?: {
    title: string;
  };
  beneficiary?: {
    name: string;
  };
};

export type CreateTransactionDTO = {
  type: "INCOME" | "EXPENSE";
  amount: number;
  method: string;
  description: string;
  dueDate: string;
  categoryId: null | string;
  beneficiaryId: string;
};

export type PayTransactionDTO = {
  transactionId: string;
  amount: number;
  transactionDate: string;
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

export const getTransactionsClientSide = async (params: GetTransactionsParams) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<TransactionDataType[]>({
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

export const createTransactionsClientSide = async (body: CreateTransactionDTO) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<any>({
      url: `/financial/create-transaction`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error();
  }
};

export const payTransactionsClientSide = async (body: PayTransactionDTO) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiLeggere<any>({
      url: `/financial/transaction/pay`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
    throw new Error();
  }
};

// PAYMENTS
export enum PaymentStatus {
  PENDING = "PENDING", // Aguardando pagamento
  PARTIAL = "PARTIAL", // Parcialmente pago
  PAID = "PAID", // Completamente pago
  CANCELLED = "CANCELLED", // Cancelado
  REFUNDED = "REFUNDED", // Estornado
}

export type PaymentDataType = {
  id: string;
  code: string;
  description: any;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  issueDate: string;
  dueDate: string;
  status: PaymentStatus;
  caseId: string;
  installmentTotal: number | null;
  installmentNumber: number | null;
  parentPaymentId: string | null;
  companyId: string;
  createdAt: string;
  updatedAt: string;
};

export type GetAllPaymentDataType = PaymentDataType & {
  transactions: TransactionDataType[];
  case: ICase;
  distributions: DistributionDataType[];
};

export type PaymentBodyType = {
  caseId: string;
  dueDate: string;
  totalAmount: number;
  distributions: CreateDistribution[];
  installments?: {
    enabled: true;
    quantity: number;
    interval: "MONTHLY" | "BIWEEKLY" | "WEEKLY"; // MONTHLY, BIWEEKLY, WEEKLY
    firstDueDate: string; // Opcional, usa dueDate se não informado
  };
};

export type PayPaymentDataType = {
  paymentId: string;
  amount: number;
  method: string;
  transactionDate: string;
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
    throw new Error("Error");
    console.log(error);
  }
};

export const payPaymentClientSide = async (body: PayPaymentDataType) => {
  try {
    const res = await apiLeggere<PaymentDataType[]>({
      url: `/financial/payment/pay`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
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
    const res = await apiLeggere<GetAllPaymentDataType[]>({
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

// Distribution
export enum SplitTypeEnum {
  ATTORNEY = "ATTORNEY_FEE", // Honorários do advogado
  REFERRAL = "REFERRAL_FEE", // Comissão de indicação
  OFFICE = "OFFICE_FEE", // Taxa do escritório
  PARTNER = "PARTNER_FEE", // Taxa de parceiro
  EXPENSE = "EXPENSE", // Despesa/custo
}

export type DistributionDataType = {
  id: string;
  paymentId: string;
  beneficiaryId: string;
  type: SplitTypeEnum;
  percentage: number;
  fixedAmount: number;
  calculatedAmount: number;
  dueDate: string;
  isPaid: boolean;
  paidAt: string | null;
  paidAmount: number;
  caseId: string;
  beneficiary?: { name: string };
};

export type CreateDistribution = {
  beneficiaryId: string;
  type: SplitTypeEnum;
  fixedAmount: number;
  percentage: number;
  beneficiary?: BeneficiaryDataType;
};

export type PayDistributionBody = {
  distributionId: string;
  amount: number;
  method: string;
  transactionDate: string;
};

export const payDistributionClientSide = async (body: PayDistributionBody) => {
  try {
    const res = await apiLeggere<any>({
      url: `/financial/distribution/pay`,
      method: "POST",
      data: body,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};

export enum AmountType {
  FIXED = "FIXED",
  PERCENTAGE = "PERCENTAGE",
}

export type SplitDataType = {
  id: string | number;
  paymentId: string;
  type: SplitTypeEnum;
  amount: number;
  amountType: AmountType;
  lawyerId?: string; // login in Payment modal
  lawyer: any;
};

export type GetAllPaymentsParams = {
  startDueDate?: string | null;
  endDueDate?: string | null;
  status?: PaymentStatus | null;
  caseId?: string | null;
  processNumber?: string | null;
  parentPaymentId?: string;
};

// Categories
export type FinancialCategoryDataType = {
  id: string;
  name: string;
  type: CategoryType;
  parentId?: string;
  createdAt: string;
  updatedAt?: string;
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

// FINANCIAL COMPANY REPORT
export type GetCompanyReportParams = {
  startDate: string;
  endDate: string;
};

export type FinancialCompanyReportDataType = {
  period: {
    startDate: string;
    endDate: string;
  };
  summary: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
    currentBalance: number;
  };
  incomeByCase: {
    caseId: string;
    caseName: string;
    totalAmount: number;
  }[];
  expenseByBeneficiary: {
    beneficiary: {
      id: string;
      name: string;
      document: string;
      type: BeneficiaryTypeEnum;
    };
    totalAmount: number;
  }[];
};

export const getFiancialCompanyReportClientSide = async (params: GetCompanyReportParams) => {
  try {
    const res = await apiLeggere<FinancialCompanyReportDataType>({
      url: `/financial/company-report`,
      method: "GET",
      params,
    });

    const { data } = res;

    return data || [];
  } catch (error: any) {
    console.log(error);
  }
};
