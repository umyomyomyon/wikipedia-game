import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

// pages
import { Top } from "./pages/Top";

const App: React.FC = (): JSX.Element => {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route exact path="/">
            <Top />
          </Route>
          {/* <Route exact path="/results">
            <Results />
          </Route> */}
        </Switch>
      </Router>
    </RecoilRoot>
  );
};

export default App;
