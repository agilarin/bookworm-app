import { createTheme } from "@mui/material/styles";
import { reset } from "./reset";
import { grey } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#631A4A",
    },
    secondary: {
      main: "#F2D1E2",
    },
    background: {
      default: grey[100],
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: { styleOverrides: reset },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableTouchRipple: true,
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "400",
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableTouchRipple: true,
        disableFocusRipple: true,
      },
    },
  },
});

theme.components = {
  ...(theme.components || {}),
  MuiContainer: {
    styleOverrides: {
      root: {
        ":not": {
          disableGutters: {
            [theme.breakpoints.up("sm")]: {
              paddingLeft: 16,
              paddingRight: 16,
            },
            [theme.breakpoints.up("md")]: {
              paddingLeft: 24,
              paddingRight: 24,
            },
          },
        },
      },
    },
  },
};
