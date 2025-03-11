import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

import { login } from "~/api/login";
import { useAuthContext } from "../useAuthContext";
import { IUser } from "~/utils/types";

export function useLogin() {
  const navigate = useNavigate();

  const { setUser } = useAuthContext();

  const { mutate, error } = useMutation({
    mutationKey: ["user"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);

      if (data) {
        const decodedUser = jwtDecode(data.token) as JwtPayload;

        const userData: IUser = {
          _id: String(decodedUser._id),
          username: String(decodedUser.username),
          email: String(decodedUser.email),
          createdAt: new Date(decodedUser.createdAt),
        };

        setUser(userData);
        navigate(`/${decodedUser.username}`);
      }
    },
  });

  return { mutate, error };
}
