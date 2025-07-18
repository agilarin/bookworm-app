"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { SignUpSchema } from "@/schemas/auth";
import { SignUpFormFields } from "@/types";
import { PasswordField } from "../UI/PasswordField";
import { useAuth } from "@/hooks/useAuth";

export function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpSchema),
  });

  const { signUp, signUpThunk, error: authError, loading } = useAuth();

  const router = useRouter();

  const onSubmit = async (data: SignUpFormFields) => {
    const resultAction = await signUp(data);

    if (signUpThunk.fulfilled.match(resultAction)) {
      router.refresh();
    }
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
          Имя пользователя
        </Typography>
        <TextField
          {...register("username")}
          fullWidth
          variant="outlined"
          size="small"
          autoComplete="off"
          error={!!errors.username}
          helperText={errors.username?.message}
        />
      </Box>

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
      <Box component="label">
        <Typography
          fontSize={14}
          marginBottom={0.5}
        >
          Подтвердите пароль
        </Typography>

        <PasswordField
          {...register("confirmPassword")}
          fullWidth
          variant="outlined"
          size="small"
          autoComplete="off"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
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
        Зарегистрироваться
      </Button>
    </Box>
  );
}
