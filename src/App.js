import React from "react";
import { Container } from "@material-ui/core";

import { Bible } from "./components/Bible";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <Bible />
      </Container>
    </div>
  );
}

export default App;
