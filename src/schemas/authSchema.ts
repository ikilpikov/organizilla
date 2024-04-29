import { z } from "zod";
export const schema = z.object({
  login: z.string().min(1, "Укажите имя или email"),
  password: z.string().min(8, "Минимальный размер пароля 8 символов"),
});

export type UserAuth = z.infer<typeof schema>;
