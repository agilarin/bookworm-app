import { z } from "zod/v4";
import { SignUpSchema, SignInSchema } from "@/schemas/auth";

export type SignUpFormFields = z.infer<typeof SignUpSchema>;
export type SignInFormFields = z.infer<typeof SignInSchema>;

export type UserType = {
  uid: string;
  email: string | null;
  username: string;
};
