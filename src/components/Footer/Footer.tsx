import {Box, Container, Typography} from "@mui/material";


export function Footer() {
  return (
    <Box
      bgcolor={(theme) => theme.palette.grey[900]}
      paddingY={2}
    >
      <Container>
        <Typography variant="h4" component="h2" color="white">
          BookWorm
        </Typography>
      </Container>
    </Box>
  );
}