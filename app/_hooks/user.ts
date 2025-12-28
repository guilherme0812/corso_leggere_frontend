import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserDetailsClientSide } from "../_services/users";

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
