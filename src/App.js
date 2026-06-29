import "./App.css";

import { Link, Typography } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";

import { Bible } from "./components/full-bible/Bible";
import { DailyBible } from "./components/daily-reading/DailyBible";
import { Header } from "./layout/Header";
import React from "react";

function App() {
  const getYearsRange = (firstYear) => {
    const currentYear = new Date().getFullYear();

    return firstYear === currentYear ? firstYear : `${firstYear} - ${currentYear}`;
  };

  return (
    <div className="app-shell">
      <Header />
      <div className="app-main">
        <Routes>
          <Route path="/daily-reading" element={<DailyBible />} />
          <Route path="/bible" element={<Bible />} />
          <Route path="*" element={<Navigate to="/daily-reading" replace />} />
        </Routes>
      </div>

      <footer className="app-footer">
        <Typography variant="subtitle2">
          by:{" "}
          <Link href="https://github.com/AndreiLucaci" className="app-footer__link" color="inherit">
            AndreiLucaci
          </Link>
          , {getYearsRange(2020)}
        </Typography>

        <Typography variant="subtitle2">
          <Link href="https://scriptumdeus.com" className="app-footer__link" color="inherit">
            Scriptum Deus
          </Link>{" "}
          © All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}

export default App;
