import { internalApiAxios } from "@/app/_services/api";
import { QueryKey, UseMutationOptions, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { CustomUseQuery } from "../customUseQuery";
import { CustomUseMutation } from "../customUseMutation";
import { AxiosResponse } from "axios";
import { DefaultResponseType } from "@/app/_types";

type ParamType = {
  url: string;
  [key: string]: unknown;
};

export interface CustomRequestParams<T> {
  params: ParamType;
  body?: T;
}

export const useCustomApi = <TData>(
  params: ParamType,
  queryKey?: string | string[],

  options?: Omit<UseQueryOptions<any>, "queryKey">
) => {
  const customQueryKey = queryKey ? (typeof queryKey == "object" ? queryKey : [queryKey]) : [params.url];
  return CustomUseQuery<TData>(
    customQueryKey,
    async () => {
      const response = await internalApiAxios({
        method: "GET",
        url: "/toDo",
        params: params,
      });

      return response as TData;
    },
    options as any
  );
};

export function useCustomRequest<T>(
  queryKey: QueryKey,
  method: "POST" | "PUT" | "DELETE",
  options?: UseMutationOptions<any, any, any, any>
) {
  const queryClient = useQueryClient();
  const result = CustomUseMutation<AxiosResponse<DefaultResponseType>, any, CustomRequestParams<T>>({
    mutationFn: async ({ params, body }: CustomRequestParams<T>) =>
      internalApiAxios({
        method: method,
        url: "/toDo",
        params: params,
        data: body,
      }),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKey,
        refetchType: "active",
      });
    },
    onError() {
      queryClient.invalidateQueries({
        queryKey: queryKey,
        refetchType: "active",
      });
    },

    ...options,
  });

  return result;
}

export function useAddFile<T>(queryKey: QueryKey, options?: UseMutationOptions<any, any, any, any>) {
  // const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient();
  const result = CustomUseMutation<AxiosResponse<DefaultResponseType>, any, CustomRequestParams<T>>({
    mutationFn: async ({ params, body }: CustomRequestParams<T>) =>
      internalApiAxios({
        method: "POST",
        url: "/toDo/formData",
        params: params,
        data: body,
      }),

    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: queryKey,
        refetchType: "active",
      });
    },
    onError() {
      queryClient.invalidateQueries({
        queryKey: queryKey,
        refetchType: "active",
      });
    },

    ...options,
  });

  return result;
}
