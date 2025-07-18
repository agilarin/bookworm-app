import { Box } from "@mui/material";
import { Loader } from "./Loader";

export function FullPageLoader() {
  return (
    <Box
      height="calc(100vh - 64px)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.paper"
    >
      <Loader />
    </Box>
  );
}
