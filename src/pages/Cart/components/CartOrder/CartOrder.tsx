import {Box, Paper, Button, Typography, Stack} from "@mui/material";


export function CartSidebar() {
  return (
    <Paper elevation={0}>
      <Box
        paddingTop={2}
        paddingBottom={1.5}
        paddingX={2}
      >
        <Stack
          spacing={1}
          marginBottom={2}
        >

        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Typography fontSize={14} fontWeight={500} color="textSecondary">
            Товары, 1 шт.
          </Typography>
          <Typography fontSize={14} fontWeight={500} color="textSecondary">
            1 061 ₽
          </Typography>
        </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="body1" fontSize={24} fontWeight={500}>
              Итого
            </Typography>
            <Typography variant="body1" fontSize={24} fontWeight={500}>
              1 061 ₽
            </Typography>
          </Stack>

        </Stack>

        <Button
          size="large"
          variant="contained"
          disableElevation
          fullWidth
        >
          Перейти к оформлению
        </Button>

      </Box>
    </Paper>
  );
}