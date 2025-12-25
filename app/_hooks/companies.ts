import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateCompanyClientSide,
  deleteCompanyClientSide,
  getCompaniesClientSide,
  ICompany,
  updateCompanyClientSide,
} from "../_services/companies";

const COMPANIES_QUERY_KEY = "companies";

type UseCompaniesProps = {
  filters: any;
  initialData?: ICompany[];
  enabled?: boolean;
};

export function useCompanies({ filters, initialData, enabled = true }: UseCompaniesProps) {
  return useQuery({
    queryKey: [COMPANIES_QUERY_KEY, filters],
    queryFn: () => getCompaniesClientSide(filters),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateCompanyClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [COMPANIES_QUERY_KEY],
        exact: false,
      });
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [COMPANIES_QUERY_KEY],
        exact: false,
      });
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCompanyClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [COMPANIES_QUERY_KEY],
        exact: false,
      });
    },
  });
}
