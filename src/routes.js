import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import KnowledgeBase from "src/pages/KnowledgeBase";
import Statistics from "src/pages/Statistics";
import Search from "src/pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={["/", "/Search", "/:polifenol/:cancer"]}
          component={Search}
          exact
        />
        <Route path="/Knowledgebaseinfo" component={KnowledgeBase} />
        <Route path="/Statistics" component={Statistics} />
      </Switch>
    </BrowserRouter>
  );
}
