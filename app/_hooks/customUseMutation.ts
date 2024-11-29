import {
  // QueryClient,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { AxiosError, AxiosResponse } from "axios";
import { DefaultResponseType } from "@/app/_types";

export function CustomUseMutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
  // queryClient?: QueryClient
): UseMutationResult<TData, TError, TVariables, TContext> {
  const { onSuccess, onError, ...restOptions } = options;
  const result = useMutation<TData, TError, TVariables, TContext>({
    ...restOptions, // Spread options para incluir qualquer comportamento extra
    onSuccess(data, variables, context) {
      const res = data as AxiosResponse<DefaultResponseType>;
      res?.data?.message &&
        enqueueSnackbar(res?.data?.message, {
          variant: "success",
          autoHideDuration: 3000,
        });

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    onError(error, variables, context) {
      const res = error as AxiosError<DefaultResponseType | any>;
      enqueueSnackbar(
        res?.response?.data?.message || res?.response?.data?.error || "Erro interno, tente novamente mais tarde",
        {
          variant: "error",
          autoHideDuration: 3000,
        }
      );

      if (onError) {
        onError(error, variables, context);
      }
    },
  });

  return result;
}
