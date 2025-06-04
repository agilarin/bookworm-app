import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/styles/theme.ts";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
