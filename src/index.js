import React from "react";
import Router from "src/routes";
import ReactDOM from "react-dom";
import { GlobalStyle, Typography } from "./config/styles";

import "fontsource-roboto";

const Main = () => (
  <>
    <GlobalStyle />
    <Typography />
    <Router />
  </>
);

ReactDOM.render(<Main />, document.getElementById("root"));
