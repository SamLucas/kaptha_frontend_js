import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import KnowledgeBase from "src/pages/KnowledgeBase";
import Statistics from "src/pages/Statistics";
import Search from "src/pages/Search";
import Architecture from "src/pages/Architecture";
import Contactus from "src/pages/Contactus";
import Resources from "src/pages/Resources";
import Help from "src/pages/Help";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={["/", "/Search", "/:tp/:polifenol/:cancergene"]}
          component={Search}
          exact
        />
        <Route path="/Knowledgebaseinfo" component={KnowledgeBase} />
        <Route path="/Statistics" component={Statistics} />
        <Route path="/Architecture" component={Architecture} />
        <Route path="/Resources" component={Resources} />
        <Route path="/Contactus" component={Contactus} />
        <Route path="/Help" component={Help} />
      </Switch>
    </BrowserRouter>
  );
}
