import { create } from "zustand";

interface IRegisterErrors {
  error: string;
  setError: (error: string) => void;
}

export const useRegisterErrorsStore = create<IRegisterErrors>((set) => ({
  error: "",
  setError: (error: string) => {
    set(() => ({ error: error }));
  },
}));

interface IEmailData {
  email: string;
  emailCode: boolean;
  setEmail: (email: string) => void;
  setEmailCode: (isNotEmpty: boolean) => void;
}

export const useEmailData = create<IEmailData>((set) => ({
  email: "",
  emailCode: false,
  setEmailCode: (isNotEmpty: boolean) => {
    set(() => ({ emailCode: isNotEmpty }));
  },
  setEmail: (email: string) => {
    set(() => ({ email: email }));
  },
}));
