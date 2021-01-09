import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import SwitchApp from "./router";

import HistoryListener from "./history-listener";

const App = () => (
  <Router>
    <HistoryListener>
      <SwitchApp />
    </HistoryListener>
  </Router>
);

export default App;
