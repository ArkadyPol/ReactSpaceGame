import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "@reach/router";
//import { toggleDisplay, startNewGame } from "../redux/actions.js";
function ButtonsMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Fragment>
      <button
        id="saveGame"
        className="button"
        /*onClick={() => {
          dispatch(startNewGame());
          navigate("/game");
        }}*/
      >
        Сохранить игру
      </button>
      <button
        id="returnBack"
        className="button"
        /*onClick={() => dispatch(toggleDisplay(true))}*/
      >
        Вернуться в главное меню
      </button>
    </Fragment>
  );
}
export default ButtonsMenu;
