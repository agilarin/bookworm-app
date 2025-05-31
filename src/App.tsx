import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/styles/theme.ts";
// import { grey } from "@mui/material/colors";
// import {global} from "@/styles/global.ts";

// const inputGlobalStyles = (
//   <GlobalStyles
//     styles={{
//       body: {
//         // [theme.breakpoints.up("md")]: {
//         // background: grey[100],
//         // }
//         // : theme.palette.primary.main
//       },
//     }}
//   />
// );

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* {inputGlobalStyles} */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
