import Box from "@mui/material/Box";

interface CarouselDotButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

export function CarouselDotButton({
  children,
  onClick,
  active,
}: CarouselDotButtonProps) {
  return (
    <Box
      component="button"
      width={active ? 40 : 12}
      height={12}
      borderRadius={100}
      border="2px solid"
      // borderColor={active ? "primary" : "grey"}
      onClick={onClick}
      sx={{
        borderColor: active ? "primary.main" : "text.secondary",
        // bgcolor: "grey.300",
        transition: "width .3s ease-out",
      }}
    >
      {children}
    </Box>
  );
}
