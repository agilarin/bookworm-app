import { Stack, Typography, TypographyProps } from "@mui/material";

type CartOrderRowVariant = "default" | "total";

const props: { [key in CartOrderRowVariant]: TypographyProps } = {
  default: {
    fontSize: 14,
    fontWeight: 500,
    color: "textSecondary",
  },
  total: {
    fontSize: 24,
    fontWeight: 500,
  },
};

interface CartOrderRowProps {
  variant?: "default" | "total";
  name: string;
  value: string;
}

export function CartOrderRow({
  variant = "default",
  name,
  value,
}: CartOrderRowProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
    >
      <Typography {...props[variant]}>{name}</Typography>
      <Typography {...props[variant]}>{value}</Typography>
    </Stack>
  );
}
