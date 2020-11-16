import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/detail";
import "./styles/index.scss";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/detail" component={Detail} />
      </Switch>
    </HashRouter>
  );
};
export default App;
