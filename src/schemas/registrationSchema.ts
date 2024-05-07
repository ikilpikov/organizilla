import { z } from 'zod';

const usernameRegex = /^[a-zA-Z0-9_]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~]).{8,}$/;

export const schema = z
    .object({
        email: z
            .string()
            .min(1, 'Введите электронную почту')
            .email('Неверный формат электронной почты'),
        username: z
            .string()
            .min(1, 'Имя должно быть указано')
            .refine(value => usernameRegex.test(value), {
                message: 'Неверный формат имени пользователя',
            }),
        password: z
            .string()
            .min(8, 'Минимальный размер пароля 8 символов')
            .refine(value => passwordRegex.test(value), {
                message:
                    'Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву, одну цифру и один символ',
            }),
        confirmPassword: z.string().min(1, 'Повторите пароль'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type UserReg = z.infer<typeof schema>;
