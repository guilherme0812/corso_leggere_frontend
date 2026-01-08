import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePasswordClientSide, updateUserDetailsClientSide } from "../_services/users";

const USERS_QUERY_KEY = "users";

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
