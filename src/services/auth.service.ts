import { UserReg } from "../schemas/registrationSchema";
import { UserAuth } from "../schemas/authSchema";
import { axiosInstance } from "./instances";

export const registration = async ({ username, email, password }: UserReg) => {
  const response = await axiosInstance.post("/register", {
    username,
    email,
    password,
  });
  return response;
};

export const authorizationByLogin = async ({ login, password }: UserAuth) => {
  const response = await axiosInstance.post("/login/username", {
    username: login,
    password,
  });
  return response;
};

export const authorizationByEmail = async ({ login, password }: UserAuth) => {
  const response = await axiosInstance.post("/login/email", {
    email: login,
    password,
  });
  return response;
};
