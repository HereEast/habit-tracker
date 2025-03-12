import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

import { login } from "~/api/login";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      console.log("Success", data);

      if (data) {
        const decodedUser = jwtDecode(data.token) as JwtPayload;

        console.log("Decoded", decodedUser.username);
        navigate(`/${decodedUser.username}`);
      }
    },
  });

  return { mutate, error };
}
