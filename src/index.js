import React from "react";
import ReactDOM from "react-dom";
import StateProvider from "./redux/store";
import App from "./App";

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById("root")
);
