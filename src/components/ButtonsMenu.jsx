import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import { toggleDisplay, startNewGame } from "../redux/actions.js";
function ButtonsMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Fragment>
      <button
        id="newGame"
        className="button"
        onClick={() => {
          dispatch(startNewGame());
          setTimeout(() => {
            navigate("/game");
          }, 50);
        }}
      >
        Новая игра
      </button>
      <button
        id="loadGame"
        className="button"
        onClick={() => dispatch(toggleDisplay(true))}
      >
        Загрузить игру
      </button>
    </Fragment>
  );
}
export default ButtonsMenu;
