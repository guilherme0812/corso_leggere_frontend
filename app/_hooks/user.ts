import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUserDetailsClientSide,
  deleteUserDetailsClientSide,
  getUsersClientSide,
  updatePasswordClientSide,
  updateUserDetailsClientSide,
} from "../_services/users";
import { UserDataType } from "../_types/login";

const USERS_QUERY_KEY = "users";

type UseUsersProps = {
  initialData?: UserDataType[];
  enabled?: boolean;
  filters: { name?: string };
  preffix?: "/admin";
};

export function useUsers({ initialData, enabled = true, filters, preffix }: UseUsersProps) {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, filters],
    queryFn: () => getUsersClientSide({ name: filters?.name }, preffix),
    enabled,
    initialData,
    // staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

export function useUpdateUserDetails() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserDetailsClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEY],
        exact: false,
      });
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUserDetailsClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEY],
        exact: false,
      });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUserDetailsClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [USERS_QUERY_KEY],
        exact: false,
      });
    },
  });
}

export function useUpdateUserPassword() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePasswordClientSide,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [],
        exact: false,
      });
    },
  });
}
