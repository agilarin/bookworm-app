import Link from "next/link";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export function EmptyCart() {
  return (
    <Container>
      <Box marginY={2}>
        <Paper elevation={0}>
          <Box
            paddingY={5}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              marginBottom={1}
              variant="h6"
              component="h1"
            >
              Корзина пуста
            </Typography>
            <Typography
              maxWidth={500}
              marginBottom={4}
              fontSize={15}
              textAlign="center"
              color="textSecondary"
            >
              Загляните на главную или в каталог и выбирите там товары, которые
              могут вам понравиться
            </Typography>

            <Button
              component={Link}
              href="/catalog/all"
              size="large"
              variant="contained"
              disableElevation
            >
              Перейти в католог
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
