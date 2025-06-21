"use client";

import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface BurgerMenuMobileHeaderProps {
  onReturnBack?: () => void;
  onClose: () => void;
  title: string;
}

export function BurgerMenuMobileHeader({
  onReturnBack,
  onClose,
  title,
}: BurgerMenuMobileHeaderProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      boxShadow="rgba(0, 0, 0, 0.12) 0 1px 3px"
    >
      <ButtonBase
        onClick={onReturnBack}
        color="inherit"
      >
        <ArrowBackRoundedIcon
          fontSize="small"
          color="inherit"
        />
        <Typography
          component="span"
          fontSize={18}
          fontWeight={500}
          ml={1}
        >
          {title}
        </Typography>
      </ButtonBase>

      <IconButton
        size="small"
        color="inherit"
        onClick={onClose}
      >
        <CloseRoundedIcon
          sx={(theme) => ({ color: theme.palette.text.secondary })}
        />
      </IconButton>
    </Stack>
  );
}
