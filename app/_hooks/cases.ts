import { useQuery } from "@tanstack/react-query";
import { getCasesClientSide, ICase } from "../_services/case";

const CASES_QUERY_KEY = "cases";

type UseCasesProps = {
  initialData?: ICase[];
  enabled?: boolean;
};

export function UseCases({ initialData, enabled = true }: UseCasesProps) {
  return useQuery({
    queryKey: [CASES_QUERY_KEY],
    queryFn: () => getCasesClientSide(),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

