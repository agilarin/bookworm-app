import Fab from "@mui/material/Fab";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";

interface CarouselPrevNextButtonProps {
  variant: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
  left?: string | number;
  right?: string | number;
}

export function CarouselPrevNextButton({
  variant,
  onClick,
  disabled,
  left = "auto",
  right = "auto",
}: CarouselPrevNextButtonProps) {
  if (disabled) return null;

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
        boxShadow: "rgba(0, 0, 0, .12) 0 2px 3px",
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
