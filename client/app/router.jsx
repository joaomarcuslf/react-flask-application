import React from "react";

import { Switch, Route } from "react-router-dom";

import Home from "./pages/home";

const App = () => (
  <>
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>

      <Route
        component={({ location }) => (
          <h3>
            Rota não encontrada
{' '}
<code>{location.pathname}</code>
          </h3>
        )}
      />
    </Switch>
  </>
);

export default App;
