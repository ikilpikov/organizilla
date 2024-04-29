import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registration } from "../services/auth.service";
import { UserReg } from "../schemas/registrationSchema";
import { AxiosError } from "axios";
import { useRegisterErrorsStore, useEmailData } from "../store";
import useSendConfirmationEmail from "./useSendConfirmationEmail";
const useReg = () => {
  const navigator = useNavigate();
  const setError = useRegisterErrorsStore((state) => state.setError);
  const setEmail = useEmailData((state) => state.setEmail);
  const { mutate } = useSendConfirmationEmail();
  return useMutation({
    mutationFn: (data: UserReg) => registration(data),
    onSuccess: (_, variables) => {
      navigator("/registration/mail");
      setEmail(variables.email); //необходимо для повторной отправки
      mutate(variables.email);
    },
    onError: (error: AxiosError) => {
      console.log(error);

      setError(String(error.response?.data));
    },
  });
};
export default useReg;
