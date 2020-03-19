import React from "react";
import ReactDOM from "react-dom";
import MainMenu from "./components/MainMenu.jsx";
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <MainMenu />
  </Provider>,
  document.getElementById("root")
);
