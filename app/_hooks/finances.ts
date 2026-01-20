import {
  CashFlowDataType,
  createFinancialCategoriesClientSide,
  createPaymentClientSide,
  FinancialCategoryDataType,
  GetAllPaymentDataType,
  GetAllPaymentsParams,
  getCashFlowClientSide,
  getFinancialCategoriesClientSide,
  GetMonthReportParams,
  getPaymentsClientSide,
  getTransactionsClientSide,
  GetTransactionsParams,
  payDistributionClientSide,
  payPaymentClientSide,
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

const CASH_FLOW_QUERY_KEY = "cash_flow";

type UseCashFlowProps = {
  filters: GetMonthReportParams;
  initialData?: CashFlowDataType[];
  enabled?: boolean;
};

export function useCashFLow({ filters, initialData, enabled = true }: UseCashFlowProps) {
  return useQuery({
    queryKey: [CASH_FLOW_QUERY_KEY, filters],
    queryFn: () => getCashFlowClientSide(filters),
    enabled,
    initialData,
  });
}

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
