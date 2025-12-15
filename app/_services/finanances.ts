import { apiServerLeggere } from "./api";
import { ICase } from "./case";

export type MonthReport = {
  month: string;
  total_received: number;
  total_paid: number;
};

type GetMonthReportParams = {
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
  origin: string;
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
  category: Category;
  case: ICase;
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
  status: string;
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

export type FinancialEntryDataType = {
  id: string;
  type: "RECEIVABLE" | "PAYABLE";
  origin: string;
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

type SummaryDataType = {
  received: number;
  paid: number;
  receivable: number;
  payable: number;
  currencentBalance: number;
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
