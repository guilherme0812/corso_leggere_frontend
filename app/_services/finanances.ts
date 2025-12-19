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
  origin: FinancialEntryOriginStatus;
  status: string;
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
  category?: Category;
  case?: ICase;
  payment: Payment;
  split: any;
  projectedAmount: number;
};

export interface Category {
  id: string;
  name: string;
  type: string;
  parentId: any;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  caseId: string;
  amount: number;
  dueDate: string;
  paidAt: any;
  status: PaymentStatus;
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

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  LATE = "LATE",
}

export enum FinancialEntryOriginStatus {
  PAYMENT = "PAYMENT",
  SPLIT = "SPLIT",
  MANUAL = "MANUAL",
  CASE = "CASE",
}

export type FinancialEntryDataType = {
  id: string;
  type: "RECEIVABLE" | "PAYABLE";
  origin: FinancialEntryOriginStatus;
  amount: number;
  dueDate: string;
  createdAt: string;
  paidAt: string;
  status: PaymentStatus;
};

export const getFinancialEntry = async (params: GetPaymentsParams) => {
  try {
    // const prefix = _prefix != undefined ? _prefix : await getPrefix();
    const res = await apiServerLeggere<FinancialEntryDataType[]>({
      url: `/financial`,
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
  status: PaymentStatus;
  origin: FinancialEntryOriginStatus;
  amount: number;
  dueDate: string;
  categoryId?: string | undefined;
  description?: string;
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

export type SplitDataType = {
  id: string;
  paymentId: string;
  type: SplitType;
  amount: number;
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
      url: `/financial/payPayment`,
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
