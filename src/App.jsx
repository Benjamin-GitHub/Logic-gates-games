import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroPage from "./IntroPage";
import LogicGateApp from "./LogicGateApp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/app" element={<LogicGateApp />} />
      </Routes>
    </Router>
  );
};

export default App;
