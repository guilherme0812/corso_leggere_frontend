import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BeneficiaryDataType,
  createBeneficiatyClientSide,
  deleteBeneficiatyClientSide,
  getBeneficiariesClientSide,
  updateBeneficiatyClientSide,
} from "../_services/beneficiary";

const BENEFICIARIES_QUERY_KEY = "BENEFICIARIES_QUERY_KEY";

type UseBeneficiariesProps = {
  filters: any;
  initialData?: BeneficiaryDataType[];
  enabled?: boolean;
};

export function useBeneficiaries({ filters, initialData, enabled = true }: UseBeneficiariesProps) {
  return useQuery({
    queryKey: [BENEFICIARIES_QUERY_KEY, filters],
    queryFn: () => getBeneficiariesClientSide(filters),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useCreateBeneficiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBeneficiatyClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [BENEFICIARIES_QUERY_KEY],
      });
    },
  });
}

export function useUpdateBeneficiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBeneficiatyClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [BENEFICIARIES_QUERY_KEY],
      });
    },
  });
}

export function useDeleteBeneficiary() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBeneficiatyClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [BENEFICIARIES_QUERY_KEY],
      });
    },
  });
}
