import { useMutation } from "@tanstack/react-query";

import { createUser } from "~/api/users";

export function useCreateUser() {
  const { mutate, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: createUser,
  });

  return { mutate, error };
}
