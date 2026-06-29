import "./index.css";
import "fontsource-roboto";

import * as serviceWorker from "./serviceWorker";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV2";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { YouVersionProvider } from "@youversion/platform-react-ui";
import { createRoot } from "react-dom/client";
import ro from "date-fns/locale/ro";
import theme from "./theme/light-theme";

const root = createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ro}>
      <YouVersionProvider appKey={process.env.REACT_APP_YVP_APP_KEY} theme="light">
        <React.StrictMode>
          <HashRouter>
            <App />
          </HashRouter>
        </React.StrictMode>
      </YouVersionProvider>
    </LocalizationProvider>
  </ThemeProvider>,
);

serviceWorker.unregister();
