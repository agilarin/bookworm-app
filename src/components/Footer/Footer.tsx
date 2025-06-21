import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export function Footer() {
  return (
    <Box
      bgcolor="grey.900"
      paddingY={2}
    >
      <Container>
        <Typography
          variant="h4"
          component="h2"
          color="white"
        >
          BookWorm
        </Typography>
      </Container>
    </Box>
  );
}
