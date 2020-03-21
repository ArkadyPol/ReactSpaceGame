import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import MainMenu from "./components/MainMenu.jsx";
import Game from "./components/Game.jsx";
import store from "./redux/store";

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <MainMenu path="/" />
      <Game path="/game" />
    </Router>
  </Provider>
);

render(<Root store={store} />, document.getElementById("root"));
