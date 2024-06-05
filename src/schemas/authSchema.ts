import { z } from 'zod';

export const schema = z.object({
    login: z.string().min(1, 'authValidate.login'),
    password: z.string().min(8, 'authValidate.password'),
});

export type IUserAuth = z.infer<typeof schema>;
