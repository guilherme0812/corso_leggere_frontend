import { useQuery } from "@tanstack/react-query";
import {
  AttorneyPendingPaymentDataType,
  getAttorneyPendingPaymentsClientSide,
  getAttorneyReceivedByCaseClientSide,
  getAttorneysClientSide,
  getAttorneyTotalReceivedClientSide,
  IAttorney,
  ReceivedByCaseDataType,
} from "../_services/attorney";

const ATTORNIES_QUERY_KEY = "Attornies";
const RECEIVED_BY_CASE_KEY = "received_by_case";
const TOATAL_RECEIVED_KEY = "total_receivd";
export const PENDING_PAYMENTS_KEY = "attorney-pending-peyments";

type UseAttorneisProps = {
  filters: any;
  initialData?: IAttorney[];
  enabled?: boolean;
};

export function useAttornies({ initialData, enabled = true }: UseAttorneisProps) {
  return useQuery({
    queryKey: [ATTORNIES_QUERY_KEY],
    queryFn: () => getAttorneysClientSide({ name: undefined }),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

type UseAttorneyReceivedByCaseProps = {
  filters: { attorneyId: string };
  initialData?: ReceivedByCaseDataType[];
  enabled?: boolean;
};

export function useAttorneyReceivedByCase({ initialData, filters, enabled = true }: UseAttorneyReceivedByCaseProps) {
  return useQuery({
    queryKey: [RECEIVED_BY_CASE_KEY, filters],
    queryFn: () => getAttorneyReceivedByCaseClientSide(filters),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

type UseAttorneyTotalReceivedProps = {
  filters: { attorneyId: string };
  initialData?: { total: number };
  enabled?: boolean;
};
export function useAttorneyTotalReceived({ filters, enabled = true }: UseAttorneyTotalReceivedProps) {
  return useQuery({
    queryKey: [TOATAL_RECEIVED_KEY, filters],
    queryFn: () => getAttorneyTotalReceivedClientSide(filters),
    enabled,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

type UseAttorneyPendingPaymentsProps = {
  filters: { attorneyId: string };
  initialData?: AttorneyPendingPaymentDataType[];
  enabled?: boolean;
};
export function useAttorneyPendingPayments({ initialData, filters, enabled = true }: UseAttorneyPendingPaymentsProps) {
  return useQuery({
    queryKey: [PENDING_PAYMENTS_KEY, filters],
    queryFn: () => getAttorneyPendingPaymentsClientSide(filters),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
