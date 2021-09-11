import React from "react";
import { Typography, Link, Paper } from "@material-ui/core";

import { Bible } from "./components/bible/Bible";

import "./App.css";

function App() {
  const getYearsRange = (year) => {
    const yearNow = new Date().getFullYear();
    const years = [...new Set([year, yearNow])];

    if (years.length === 1) return years[0];
    else return years[0] + " - " + years[years.length - 1];
  };
  return (
    <>
      <div style={{ marginBottom: "100px" }}>
        <Bible />
      </div>
      <Paper className="footer-down" elevation={0}>
        <div style={{ width: "240px", marginLeft: -35 }}>
          <Typography variant="subtitle2">
            by:{" "}
            <Link
              href="https://github.com/AndreiLucaci"
              className="orange"
              color="textSecondary"
            >
              AndreiLucaci
            </Link>
            , {getYearsRange(2020)}
            <Link
              href="https://scriptumdeus.com"
              className="orange"
              color="textSecondary"
            >
              {" "}
              Scriptum Deus{" "}
            </Link>
            © All rights reserved.
          </Typography>
        </div>
      </Paper>
    </>
  );
}

export default App;
