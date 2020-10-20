import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CrossSearch from "src/pages/dashboard";
import PolyphenolSearch from "src/pages/PolyphenolSearch";
import CancerSearch from "src/pages/CancerSearch";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={CrossSearch} />
        <Route path="/PolyphenolSearch" exact component={PolyphenolSearch} />
        <Route path="/CancerSearch" exact component={CancerSearch} />
      </Switch>
    </BrowserRouter>
  );
}
