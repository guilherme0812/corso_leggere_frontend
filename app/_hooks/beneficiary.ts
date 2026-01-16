import { useQuery } from "@tanstack/react-query";
import { BeneficiaryDataType, getBeneficiariesClientSide } from "../_services/beneficiary";

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
