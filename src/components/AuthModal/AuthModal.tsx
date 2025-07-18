"use client";

import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { SignUpForm } from "@/components/SignUpForm";
import { SignInForm } from "@/components/SignInForm";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { useAuth } from "@/hooks/useAuth";

export function AuthModal() {
  const { open, onClose } = useAuthModal();
  const [isSigninForm, setIsSigninForm] = useState(true);
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth && open) {
      onClose();
    }
  }, [isAuth, open, onClose]);

  return (
    <Dialog
      aria-hidden={open}
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: 1,
            maxWidth: 380,
          },
        },
      }}
    >
      <Stack
        paddingX={3}
        paddingTop={3}
        paddingBottom={2}
        gap={1}
      >
        <Typography
          component="p"
          variant="h5"
          fontWeight={500}
          mb={1}
        >
          {isSigninForm ? "Войти в аккаунт" : "Создать аккаунт"}
        </Typography>

        {isSigninForm ? <SignInForm /> : <SignUpForm />}

        <Button onClick={() => setIsSigninForm(!isSigninForm)}>
          {isSigninForm ? "Создать аккаунт" : "Уже есть аккаунт"}
        </Button>
      </Stack>
    </Dialog>
  );
}
