import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "jsonwebtoken";
import axios from "axios";

import { login } from "~/api/login";
import { createUser } from "~/api/users";

export function useCreateUser() {
  const { mutate, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: createUser,
  });

  return { mutate, error };
}

export function useLogin() {
  const navigate = useNavigate();

  const { mutate, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      if (data) {
        const decodedUser = jwtDecode(data.token) as JwtPayload;
        navigate(`/${decodedUser.username}`);
      }
    },
  });

  return { mutate, error };
}
