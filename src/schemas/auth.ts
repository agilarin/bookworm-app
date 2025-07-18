import * as z from "zod/v4";

export const EmailSchema = z.email("Некорректный email").trim();
export const PasswordSchema = z.string().trim();

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignUpSchema = z
  .object({
    username: z.string(),
    email: EmailSchema,
    password: PasswordSchema.min(8, "Пароль должен быть не менее 8 символов"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
