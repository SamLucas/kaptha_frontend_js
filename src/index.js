import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/dashboard";
import { GlobalStyle, Typography } from "./config/styles";

const Main = () => (
  <>
    <GlobalStyle />
    <Typography />
    <App />
  </>
);

ReactDOM.render(<Main />, document.getElementById("root"));
