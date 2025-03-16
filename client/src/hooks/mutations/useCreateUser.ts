import { useMutation } from "@tanstack/react-query";
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

import { createUser } from "~/api/users";

export function useCreateUser() {
  const { mutate, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: createUser,
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("token", data.token);
        const decodedUser = jwtDecode(data.token) as JwtPayload;

        window.location.replace(`/${decodedUser.username}`);
      }
    },
  });

  return { mutate, error };
}
