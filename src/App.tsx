import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Top } from "./components/Top";
import { Game } from "./components/Game";

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Top />
        </Route>
        <Route exact path="/main">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
