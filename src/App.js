import React from "react";
import { Container, Typography, Link } from "@material-ui/core";

import { Bible } from "./components/bible/Bible";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Bible />
      </Container>
      <div style={{ marginTop: 50, marginBottom: 10 }}>
        <Typography variant="subtitle1">
          by:{" "}
          <Link
            href="https://github.com/AndreiLucaci"
            className="orange"
            color="#f1802d"
          >
            AndreiLucaci
          </Link>
          , © 2020 Andrei Lucaci, All rights reserved.
        </Typography>
      </div>
    </div>
  );
}

export default App;
