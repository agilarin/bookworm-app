"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { SignInSchema } from "@/schemas/auth";
import { SignInFormFields } from "@/types";
import { useAuth } from "@/hooks/useAuth";
import { PasswordField } from "../UI/PasswordField";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFields>({
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter();
  const { signIn, error: authError, loading } = useAuth();

  const onSubmit = async (data: SignInFormFields) => {
    await signIn(data).then(() => {
      router.refresh();
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      gap={1.5}
    >
      <Box component="label">
        <Typography
          fontSize={14}
          marginBottom={0.5}
        >
          Эл. почта
        </Typography>
        <TextField
          {...register("email")}
          fullWidth
          variant="outlined"
          size="small"
          autoComplete="off"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Box>
      <Box component="label">
        <Typography
          fontSize={14}
          marginBottom={0.5}
        >
          Пароль
        </Typography>

        <PasswordField
          {...register("password")}
          fullWidth
          variant="outlined"
          size="small"
          autoComplete="off"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Box>

      <div>
        {authError && (
          <Typography
            color="error"
            fontSize={13}
            marginTop={-1}
            marginBottom={1}
            role="alert"
          >
            {authError}
          </Typography>
        )}
      </div>

      <Button
        type="submit"
        variant="contained"
        disableElevation
        disabled={loading}
      >
        Войти
      </Button>
    </Box>
  );
}
