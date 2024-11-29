import {
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";

export function CustomUseQuery<
  TData = unknown,
  TError = unknown,
  TQueryFnData = TData
>(
  queryKey: QueryKey,
  queryFn: () => Promise<TQueryFnData>,
  options?: UseQueryOptions<TQueryFnData, TError, TData>
): UseQueryResult<TData, TError> {
  const result = useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: queryFn,
    refetchOnWindowFocus: "always",
    staleTime: 0,
    ...options,
  });
  const notAuthorized = (result as any).data?.status == 401;

  if (notAuthorized) {
    enqueueSnackbar({
      variant: "error",
      message: "Sem permissão",
    });
    // router.push(
    //   process.env.NEXT_PUBLIC_SITE_CARBONFAIR ||
    //     "https://www.carbonfair.com.br/pt-br"
    // );
  }

  if (result.data) {
    return {
      ...result,
      data: (result as any).data?.data // Verify if is a Axios request
        ? (result as any).data?.data
        : result.data,
    };
  }

  return result;
}
