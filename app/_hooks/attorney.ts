import { useQuery } from "@tanstack/react-query";
import { getAttorneysClientSide, IAttorney } from "../_services/attorney";

const ATTORNIES_QUERY_KEY = "Attornies";

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
