import {
  createFinancialCategoriesClientSide,
  createPaymentClientSide,
  createTransactionsClientSide,
  FinancialCategoryDataType,
  FinancialCompanyReportDataType,
  GetAllPaymentDataType,
  GetAllPaymentsParams,
  GetCompanyReportParams,
  getFiancialCompanyReportClientSide,
  getFinancialCategoriesClientSide,
  getPaymentsClientSide,
  getTransactionsClientSide,
  GetTransactionsParams,
  payDistributionClientSide,
  payPaymentClientSide,
  payTransactionsClientSide,
  removeFinancialCategoriesClientSide,
  TransactionDataType,
  updateFinancialCategoriesClientSide,
} from "../_services/finanances";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PENDING_PAYMENTS_KEY } from "./attorney";

const PAYMENTS_QUERY_KEY = "payments";

type UsePaymentsProps = {
  filters: GetAllPaymentsParams;
  initialData?: GetAllPaymentDataType[];
  enabled?: boolean;
};

export function usePayments({ filters, initialData, enabled = true }: UsePaymentsProps) {
  return useQuery({
    queryKey: [PAYMENTS_QUERY_KEY, filters],
    queryFn: () => getPaymentsClientSide(filters),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function usePaymentInstallments({ filters, initialData, enabled = true }: UsePaymentsProps) {
  return useQuery({
    queryKey: ["PAYMENT_INSTALLMENTS_QUERY_KEY", filters],
    queryFn: () => getPaymentsClientSide(filters),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

// Transactions

const TRANSACTIONS_QUERY_KEY = "TRANSACTIONS";

type UseTransactionsProps = {
  filters: GetTransactionsParams;
  initialData?: TransactionDataType[];
  enabled?: boolean;
};

export function useTransactions({ filters, initialData, enabled = true }: UseTransactionsProps) {
  return useQuery({
    queryKey: [TRANSACTIONS_QUERY_KEY, filters],
    queryFn: () => getTransactionsClientSide(filters),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransactionsClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [TRANSACTIONS_QUERY_KEY],
        exact: false,
      });
    },
  });
}

export function usePayTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payTransactionsClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [TRANSACTIONS_QUERY_KEY],
        exact: false,
      });
    },
  });
}

// PAYMENT
export function useCreatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPaymentClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENTS_QUERY_KEY],
        exact: false,
      });
    },
  });
}

export function usePayPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payPaymentClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [PAYMENTS_QUERY_KEY],
        exact: false,
      });
    },
  });
}

const FINANCIAL_CATEGORIES_QUERY_KEY = "financial_categories";

type UseFinancialCategoriesProps = {
  initialData?: FinancialCategoryDataType[];
  enabled?: boolean;
};

export function useFinancialCategories({ initialData, enabled = true }: UseFinancialCategoriesProps) {
  return useQuery({
    queryKey: [FINANCIAL_CATEGORIES_QUERY_KEY],
    queryFn: () => getFinancialCategoriesClientSide(),
    enabled,
    initialData,
  });
}

export function useCreateFinancialCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFinancialCategoriesClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [FINANCIAL_CATEGORIES_QUERY_KEY],
      });
    },
  });
}

export function useUpdateFinancialCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFinancialCategoriesClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [FINANCIAL_CATEGORIES_QUERY_KEY],
      });
    },
  });
}

export function useRemoveFinancialCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFinancialCategoriesClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [FINANCIAL_CATEGORIES_QUERY_KEY],
      });
    },
  });
}

// Distributions

export function usePayDistribution() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payDistributionClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [PENDING_PAYMENTS_KEY],
      });
    },
  });
}

// COMPANY REPORT
const COMPANY_REPORT_QUERY_KEY = "financial_categories";

type UseFinancialComparyReportProps = {
  initialData?: FinancialCompanyReportDataType;
  enabled?: boolean;
  params: GetCompanyReportParams;
};

export function useFinancialCompanyReport({ initialData, params, enabled = true }: UseFinancialComparyReportProps) {
  return useQuery({
    queryKey: [COMPANY_REPORT_QUERY_KEY],
    queryFn: () => getFiancialCompanyReportClientSide(params),
    enabled,
    initialData,
  });
}
