import { axiosInstance } from "./instances";

export const sendConfirmationEmail = async (email: string) => {
  const response = await axiosInstance.post("/send-confirmation-email", {
    email,
  });
  return response;
};

export const confirmEmail = async (email: string) => {
  const response = await axiosInstance.post("/confirm-email", {});
  return response;
};
