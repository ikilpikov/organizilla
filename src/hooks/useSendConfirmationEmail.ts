import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { sendConfirmationEmail } from "../services/mail.service";
import { AxiosError } from "axios";
const useSendConfirmationEmail = () => {
  const navigator = useNavigate();
  return useMutation({
    mutationFn: (email: string) => sendConfirmationEmail(email),
    onSuccess: () => {
      //navigator("/import");
    },
    onError: (error: AxiosError) => {
      console.log(error);
    },
  });
};
export default useSendConfirmationEmail;
