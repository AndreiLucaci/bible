import "./index.css";
import "fontsource-roboto";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { YouVersionProvider } from "@youversion/platform-react-ui";
import { createRoot } from "react-dom/client";
import theme from "./theme/light-theme";

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <YouVersionProvider appKey={"1OaqVtl7ROVDScZuNMv7yJ1pGnzalepAryAegAhfCDtFIYQr"} theme="light">
      <div className="App">
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </div>
    </YouVersionProvider>
  </ThemeProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
