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
