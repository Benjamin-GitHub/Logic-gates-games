import React from "react";
import CircuitBuilder from "./components/CircuitBuilder";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Logic Gate Simulator
      </Typography>
      <CircuitBuilder />
    </Container>
  );
}

export default App;
