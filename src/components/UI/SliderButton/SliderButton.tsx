import Fab from "@mui/material/Fab";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

interface SliderButtonProps {
  variant: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  left?: string | number;
  right?: string | number;
}

export function SliderButton({
  variant,
  onClick,
  disabled,
  left = "auto",
  right = "auto",
}: SliderButtonProps) {
  if (disabled) return;

  return (
    <Fab
      onClick={onClick}
      color="inherit"
      size="small"
      sx={{
        position: "absolute",
        top: "50%",
        left,
        right,
        bgcolor: "white",
        transform: "translateY(-50%)",
      }}
    >
      {variant === "left" ? (
        <ArrowBackIosRoundedIcon fontSize="small" />
      ) : (
        <ArrowForwardIosRoundedIcon fontSize="small" />
      )}
    </Fab>
  );
}
