import {
  CashFlowDataType,
  createPaymentClientSide,
  GetAllPaymentsParams,
  getCashFlowClientSide,
  GetMonthReportParams,
  getPaymentsClientSide,
  getProjectionFlowClientSide,
  PaymentDataType,
  payPaymentClientSide,
} from "../_services/finanances";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const PAYMENTS_QUERY_KEY = "payments";

type UsePaymentsProps = {
  filters: GetAllPaymentsParams;
  initialData?: PaymentDataType[];
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

const PROJECTION_FLOW_QUERY_KEY = "projection";

export function useProjectionFLow({ filters, initialData, enabled = true }: UseCashFlowProps) {
  return useQuery({
    queryKey: [PROJECTION_FLOW_QUERY_KEY, filters],
    queryFn: () => getProjectionFlowClientSide(filters),
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
        queryKey: [PAYMENTS_QUERY_KEY, PROJECTION_FLOW_QUERY_KEY, CASH_FLOW_QUERY_KEY],
      });
    },
  });
}
