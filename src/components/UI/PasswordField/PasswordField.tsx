"use client";

import { useState } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import IconButton from "@mui/material/IconButton";

type PasswordFieldProps = Omit<TextFieldProps, "type">;

export function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMousePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      autoComplete="off"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMousePassword}
                onMouseUp={handleMousePassword}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}
