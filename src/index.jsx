import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import store from "./redux/store";

const Root = () => (
  <Provider store={store}>
    <Router>
      <MainMenu path="/" />
      <Game path="/game" />
    </Router>
  </Provider>
);

render(<Root />, document.getElementById("root"));
