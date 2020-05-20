import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppWrapper from "./AppWrapper";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <AppWrapper>
        <Route path="/" exact component={Home} />
      </AppWrapper>
    </Router>
  );
}
