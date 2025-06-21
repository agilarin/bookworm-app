import { Box, CircularProgress } from "@mui/material";

export function FullPageLoader() {
  return (
    <Box
      height="calc(100vh - 64px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.paper"
    >
      <CircularProgress size={52} />
    </Box>
  );
}
