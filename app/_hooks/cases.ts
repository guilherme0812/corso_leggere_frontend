import { useQuery } from "@tanstack/react-query";
import {
  CaseTimeSerieDataType,
  CaseTimeSeriesPeriod,
  getCasesClientSide,
  getCasesTimeSeriesClientSide,
  ICase,
} from "../_services/case";

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

const CASE_TIME_SERIES_QUERY_KEY = "case_time_series";

type UseCaseTimeSeriesProps = {
  initialData?: CaseTimeSerieDataType[];
  enabled?: boolean;
  filters: { period: CaseTimeSeriesPeriod };
};

export function useCaseTimeSeries({ initialData, filters, enabled = true }: UseCaseTimeSeriesProps) {
  return useQuery({
    queryKey: [CASE_TIME_SERIES_QUERY_KEY, filters],
    queryFn: () => getCasesTimeSeriesClientSide(filters),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
