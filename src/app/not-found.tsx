import Link from "next/link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function NotFound() {
  return (
    <Stack
      width={1}
      height="100vh"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        fontSize={120}
        lineHeight={1}
        mb={1}
      >
        404
      </Typography>
      <Typography
        fontSize={28}
        mb={0.5}
      >
        Cтраница не найдена
      </Typography>
      <Typography
        fontSize={18}
        mb={4}
      >
        Страница, к которой вы обратились, не существует.
      </Typography>
      <Button
        size="large"
        variant="outlined"
        component={Link}
        href="/"
        color="inherit"
      >
        Перейти на главную
      </Button>
    </Stack>
  );
}
