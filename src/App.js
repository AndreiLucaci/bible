import React from "react";
import { Typography, Link, Paper } from "@material-ui/core";

import { Bible } from "./components/bible/Bible";

import "./App.css";

function App() {
  return (
    <>
      <Bible />
      <Paper style={{ marginTop: 50, marginBottom: 10 }} elevation={0}>
        <Typography variant="subtitle1">
          by:{" "}
          <Link
            href="https://github.com/AndreiLucaci"
            className="orange"
            color="textSecondary"
          >
            AndreiLucaci
          </Link>
          , © 2020 Andrei Lucaci, All rights reserved.
        </Typography>
      </Paper>
    </>
  );
}

export default App;
