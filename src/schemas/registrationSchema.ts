import { z } from 'zod';

//используем такой подход,так как нельзя хук тут вызывать

const usernameRegex = /^[a-zA-Z0-9_]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).{8,}$/;

export const schema = z
    .object({
        email: z
            .string()
            //использую такой подход,чтобы не устанавливать отдельную библиотеку,а просто в валидации
            //передавать ключи для локализации
            .min(1, 'registrationValidate.email.required')
            .email('registrationValidate.email.format'),
        username: z
            .string()
            .min(1, 'registrationValidate.username.required')
            .refine(value => usernameRegex.test(value), {
                message: 'registrationValidate.username.format',
            }),
        password: z
            .string()
            .min(8, 'registrationValidate.password.minSize')
            .refine(value => passwordRegex.test(value), {
                message: 'registrationValidate.password.validation',
            }),
        confirmPassword: z.string().min(1, 'registrationValidate.confirmPassword.required'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'registrationValidate.confirmPassword.match',
        path: ['confirmPassword'],
    });

export type UserReg = z.infer<typeof schema>;
