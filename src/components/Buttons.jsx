import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
import { toggleDisplay, startNewGame } from "../redux/actions.js";
function Buttons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Fragment>
      <button
        id="newGame"
        className="button"
        onClick={() => {
          dispatch(startNewGame());
          navigate("/game", { replace: false });
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
export default Buttons;
