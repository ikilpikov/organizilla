import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  authorizationByEmail,
  authorizationByLogin,
} from "../services/auth.service";
import { UserAuth } from "../schemas/authSchema";
import { AxiosError } from "axios";
import { useRegisterErrorsStore } from "../store";

const useAuth = () => {
  const navigator = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const setError = useRegisterErrorsStore((state) => state.setError);
  return useMutation({
    mutationFn: (data: UserAuth) => {
      if (emailRegex.test(data.login)) return authorizationByEmail(data);
      return authorizationByLogin(data);
    },
    onSuccess: (response) => {
      //логика для рефреш и acess

      navigator("/");
    },
    onError: (error: AxiosError) => {
      if (error.response?.status == 400) setError("Неверный логин или пароль");
    },
  });
};
export default useAuth;
