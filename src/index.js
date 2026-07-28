import "./index.css";
import "fontsource-roboto";
import "./i18n";

import * as serviceWorker from "./serviceWorker";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV2";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { YouVersionProvider } from "@youversion/platform-react-ui";
import { createRoot } from "react-dom/client";
import de from "date-fns/locale/de";
import enUS from "date-fns/locale/en-US";
import es from "date-fns/locale/es";
import fr from "date-fns/locale/fr";
import it from "date-fns/locale/it";
import ro from "date-fns/locale/ro";
import theme from "./theme/light-theme";
import { useTranslation } from "react-i18next";

const root = createRoot(document.getElementById("root"));

const LocalizedApp = () => {
  const { i18n } = useTranslation();
  const locales = { de, en: enUS, es, fr, it, ro };
  const locale = locales[i18n.resolvedLanguage] || enUS;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <YouVersionProvider appKey={process.env.REACT_APP_YVP_APP_KEY} theme="light">
        <React.StrictMode>
          <HashRouter>
            <App />
          </HashRouter>
        </React.StrictMode>
      </YouVersionProvider>
    </LocalizationProvider>
  );
};

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <LocalizedApp />
  </ThemeProvider>,
);

serviceWorker.unregister();
