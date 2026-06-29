import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#b96d26",
    },
    background: {
      default: "#f4f6f2",
      paper: "#ffffff",
    },
    text: {
      primary: "#1f2933",
      secondary: "#68726b",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
});

export default theme;
