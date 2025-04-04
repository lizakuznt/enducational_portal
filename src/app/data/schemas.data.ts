import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "Обезательное поле к заполнению." })
  .email({ message: "Введите правильный адрес электронной почты." });

export const usernameSchema = z
  .string({
    message: "Обезательное поле к заполнению",
  })
  .min(1, { message: "Обезательное поле к заполнению." })
  .min(3, {
    message: "Имя должно содержать не менее 3-х символов.",
  });

export const passwordSchema = z
  .string()
  .min(1, { message: "Обезательное поле к заполнению." })
  .min(6, { message: "Пароль должен содержать не менее 6-и символов." });

export const loginFormSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const registerFormSchema = loginFormSchema
  .merge(
    z.object({
      email: z
        .string()
        .min(1, { message: "Обезательное поле к заполнению." })
        .email({ message: "Введите правильный адрес электронной почты." }),
      confirmPassword: passwordSchema,
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export const createProgramSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Обезательное поле к заполнению." })
    .min(6, { message: "Должно содержать не менее 6-и символов." }),
  description: z
    .string()
    .min(1, { message: "Обезательное поле к заполнению." })
    .min(6, { message: "Должно содержать не менее 6-и символов." }),
  level: z
    .string()
    .min(1, { message: "Обезательное поле к заполнению." })
    .min(3, { message: "Должно содержать не менее 3-х символов." }),
  status: z
    .string()
    .min(1, { message: "Обезательное поле к заполнению." })
    .min(3, { message: "Должно содержать не менее 3-х символов." }),
});

export const editProgramSchema = createProgramSchema;

export type TLoginForm = z.infer<typeof loginFormSchema>;
export type TLoginErrorForm = z.inferFormattedError<typeof loginFormSchema>;

export type TRegisterForm = z.infer<typeof registerFormSchema>;
export type TRegisterErrorForm = z.inferFormattedError<
  typeof registerFormSchema
>;

export type TCreateProgramFrom = z.infer<typeof createProgramSchema>;
export type TCreateProgramErrorFrom = z.inferFormattedError<
  typeof createProgramSchema
>;

export type TEditProgramFrom = z.infer<typeof editProgramSchema>;
export type TEditProgramErrorFrom = z.inferFormattedError<
  typeof editProgramSchema
>;
