"use client";

import IconButton from "@mui/material/IconButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { useAuthModal } from "@/contexts/AuthModalContext";
import { useAuth } from "@/hooks/useAuth";

export function UserButton() {
  const { onToggle } = useAuthModal();
  const { isAuth, signOut } = useAuth();

  return (
    <>
      <IconButton
        size="medium"
        onClick={isAuth ? signOut : onToggle}
        sx={{
          bgcolor: "background.paper",
          color: "text.primary",
        }}
      >
        {isAuth ? <LogoutRoundedIcon /> : <AccountCircleOutlinedIcon />}
      </IconButton>
    </>
  );
}
